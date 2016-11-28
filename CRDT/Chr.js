'use strict';

// A charactor, the minimum unit of a CRDT doc
export default class Chr {
  constructor(user, ch, id) {
    this.user = user;
    this.ch = ch;
    this.del = false;
    this.id = id;
  }

  // x < y iff  x.id <= y.id
  lessThan(obj) {
    return this.id <= obj.id;
  }

  // this is the unique id for each charactor among all replicas
  getChrId() {
    return String(this.user) + String(this.id);
  }

}
