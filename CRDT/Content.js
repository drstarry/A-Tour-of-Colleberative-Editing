'use strict';

import Chr from './Chr';
import Insert from './Insert';
import Delete from './Delete';
import Text from './Text';

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
      const chr = new Chr(this.user, ch, this.id);
      const preChrId = this.text.add(loc, new Chr(this.user, ch, this.id));
      this.id = this.text.cnt();
      return new Insert(preChrId, chr);
    }

    if (type === 'del') {
      return new Delete(this.text.remove(loc));
    }
  }

  // apply an inter-replica insert
  applyInsert(ins) {
    this.text.addAfter(ins.preChrId, ins.chr);
    this.id = this.text.cnt();
  }

  // apply an inter-replica Delete
  applyDelete(del) {
    this.text.removeAt(del.chrId);
  }

  len() {
    return this.text.len();
  }

  toString() {
    return this.text.toString();
  }
}
