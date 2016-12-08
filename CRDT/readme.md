# A list-based CmRDT

## Overview
This is the model for demo. It's quite simple and straightforward in both intuition and implementation.

## Design
### Chr
This is a character unit.
```
chr: a character
del: a flag to show whether it's deleted
id: a number to mark the order when it created
user: user who created it
```
Note that `id` is not unique inside a replica, an unique identifier for a chr object should be `id` with `user`.

`user` here is replica instead of end user.

### Text
This is the text object for the document, which is a linked-list of `Chr`. Each `Content` should have only one `Text`.
Head and tail nodes are dummy.

### Content
This is the content object of a `Content` object. Except a `Text` object inside, it contains meta data like owner(replica who owns this current `Content`) and an increasing `id` for `Chr` object.

### Commutative
Each replica should have deterministic result given different order of operations.
I enforce this by giving a rule for insertion.
eg.
Initial state:
```
A    a1: e -> a2: a -> a3: t  => eat
B    a1: e -> a2: a -> a3: t  => eat
```

A inserts `l` after `a2`:
```
A    a1: e -> a2: a -> a4: l -> a3: t  => ealt
```

B inserts `p` after `a2`:
```
B    a1: e -> a2: a -> b4: p -> a3: t  => eapt
```

A receives B's operation
```
A    a1: e -> a2: a -> b4: p -> a4: l -> a3: t  => eaplt
```

B receives A's operation
```
original
A    a1: e -> a2: a -> b4: p -> a3: t  => eapt
```
Rule: *when ids equal, bigger user wins (b > a => b4 > a4)*

`b4 > a4` and we skip greater items, thus
```
B    a1: e -> a2: a -> b4: p -> a4: l -> a3: t  => eaplt
```

A and B have same behaviors even they apply two operations in different orders.

This is a simple rule, people will define their own.

### Idempotent
If replicas are deleting the same character, the result will only be reflected once, because each character is unique.

## Issues
The model is a very naive approach and suffers from many issues.

### Slow
`O(n)` for both insertion and deletion, it's way too slow.

An alternative way to design is to build a x-nary searched tree and could make real number id, eg, insert an character between `1` and `2` will end up with id `1.3`. Then we can always keep the order.

### GC
Deletion is marking a flag instead actual deleted. As data  will grow unbounded, we need to garbage collect from time to time.

## Test
Test cases are in `test.js`, please run the tests by
`../node_modules/.bin/mocha --compilers js:babel-core/register`
in `CRDT` folder.

## Reference
[1] [H.-G. Roh, M. Jeon, J.-S. Kim, and J. Lee, “Replicated abstract data types: Building blocks for collaborative applications,” Journal of Parallel and Distributed Computing, vol. 71, no. 3, pp. 354–368, 2011.](http://dl.acm.org/citation.cfm?id=1931272)

[2] [https://arxiv.org/pdf/1608.03960v1.pdf](https://arxiv.org/pdf/1608.03960v1.pdf)
