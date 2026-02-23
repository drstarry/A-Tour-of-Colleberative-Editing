import Chr from './Chr';

class Node {
  val: Chr;
  next: Node | null;

  constructor(chr: Chr) {
    this.val = chr;
    this.next = null;
  }
}

export default class Text {
  private head: Node;
  private tail: Node;
  private count: number;
  private length: number;

  constructor() {
    this.head = new Node(new Chr(-1, '\0', 0));
    this.tail = new Node(new Chr(-1, '\0', 0));
    this.count = 0;
    this.length = 0;
    this.head.next = this.tail;
  }

  len(): number {
    return this.length;
  }

  cnt(): number {
    return this.count;
  }

  add(loc: number, chr: Chr): string {
    const node = new Node(chr);

    let idx = 0;
    let cur = this.head;
    while (idx < loc || cur.val.del) {
      if (!cur.val.del) {
        idx++;
      }
      cur = cur.next!;
    }

    node.next = cur.next;
    cur.next = node;

    this.count++;
    this.length++;

    return cur.val.getChrId();
  }

  remove(loc: number): string {
    let idx = -1;
    let cur = this.head;
    while (idx < loc || cur.val.del) {
      if (!cur.val.del) {
        idx++;
      }
      cur = cur.next!;
    }

    if (!cur.val.del) {
      cur.val.del = true;
      this.length--;
    }

    return cur.val.getChrId();
  }

  addAfter(preChrId: string, chr: Chr): void {
    const node = new Node(chr);

    let cur = this.head;
    while (cur.next !== this.tail && cur.val.getChrId() !== preChrId) {
      cur = cur.next!;
    }

    while (cur.next !== this.tail && node.val.lessThan(cur.next!.val)) {
      cur = cur.next!;
    }

    node.next = cur.next;
    cur.next = node;

    this.count++;
    this.length++;
  }

  removeAt(chrId: string): void {
    let cur: Node = this.head;
    while (cur !== this.tail && cur.val.getChrId() !== chrId) {
      cur = cur.next!;
    }

    if (cur === this.tail) {
      return;
    }

    if (cur.val.getChrId() === chrId && !cur.val.del) {
      cur.val.del = true;
      this.length--;
    }
  }

  toString(): string {
    let cur = this.head.next;
    let str = '';
    while (cur !== this.tail) {
      if (!cur!.val.del) {
        str += cur!.val.ch;
      }
      cur = cur!.next;
    }
    return str;
  }

  debug(): string {
    let cur = this.head.next;
    let str = '';
    while (cur !== this.tail) {
      if (cur!.val.del) {
        str += ' ';
      } else {
        str += cur!.val.ch;
      }
      cur = cur!.next;
    }
    return str;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }
}
