'use strict';

import Text from './Text';
import Insert from './Insert';
import Delete from './Delete';

// editor content per user
export default class Content {
  constructor(user) {
    this.user = user;
    this.id = 0; // current available id for each Chr obj
    this.text = new Text();
  }

  // apply an inner-replica operation
  apply(loc, type, ch) {
    if (type === 'ins') {
      let chr = new Chr(this.user, ch, this.id);
      this.text.add(loc, chr);
      this.id = this.text.len();
    } else {
      this.text.remove(loc);
    }
  }

  // apply an inter-replica insert
  insert(ins) {
    this.text.addAfter(ins.preChrId, ins.chr);
    this.id = this.text.length();
  }

  // apply an inter-replica Delete
  delete(del) {
    this.text.removeAt(del.chrId);
  }

  toString() {
    return this.text.toString();
  }
}
