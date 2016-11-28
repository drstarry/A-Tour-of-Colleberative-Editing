'use strict';

import Chr from './Chr';

class Node {
  constructor(chr) {
    this.val = chr;
    this.next = null;
  }
}

// A linked-list CRDT text obj
export default class Text {
  constructor() {
    this.head = new Node(new Chr(-1, -1, -1));
    this.tail = new Node(new Chr(-1, -1, -1));
    this.count = 0; // actual count
    this.length = 0;
    this.head.next = this.tail;
  }

  len() {
    return this.length;
  }

  //[inside replica] add a node at location `loc`
  // `loc` should alwayws be valid because it only triggered when there is a change in editor
  add(loc, chr) {
    // Create a new Node
    let node = new Node(chr);

    let idx = 0;
    let cur = this.head;
    while (idx < loc) {
      if (!cur.val.del) {
        idx++;
      }

      cur = cur.next;
    }

    // insert a node
    node.next = cur.next;
    cur.next = node;

    this.count++;
    this.length++;

    // generate `preChrId` for other replica
    return cur.val.getChrId();
  }

  // [inside replica] remove at location `loc`
  // `loc` should alwayws be valid because it only triggered when there is a change in editor
  remove(loc) {
    let idx = -1;
    let cur = this.head;
    while (idx < loc) {
      if (!cur.val.del) {
        idx++;
      }

      cur = cur.next;
    }

    // remove the location by setting the flag
    cur.val.del = true;

    this.length--;
  }

  // [outside replica] remove a chr
  addAfter(preChrId, chr) {
    // Create a new Node
    let node = new Node(chr);

    let cur = this.head;
    while (cur.val.getChrId() !== preChrId) {
      cur = cur.next;
    }

    // skip the larger ids
    while (cur.next !== this.tail && node.val.lessThan(cur.next.val)) {
      cur = cur.next;
    }

    // insert a node
    node.next = cur.next;
    cur.next = node;

    this.count++;
    this.length++;
  }

  // [outside replica]remove a node with `chrId`
  removeAt(chrId) {
    let cur = this.head;
    while (cur !== this.tail && cur.val.getChrId() !== chrId) {
      cur = cur.next;
    }

    if (cur === this.tail) {
      // this Chr hasn't been synced in this replica
      return;
    }

    // remove the location by setting the flag
    cur.val.del = true;

    this.length--;
  }

  // get all non-delete charactors together
  toString() {
    let cur = this.head.next;
    let str = '';
    while (cur !== this.tail) {
      if (!cur.val.del) {
        str += cur.val.ch;
      }

      cur = cur.next;
    }

    return str;
  }

  isEmpty() {
    return this.length === 0;
  }
}
