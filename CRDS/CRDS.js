'use strict';

import {Map, List} from 'immutable';

class Chr {
  constructor(user, loc, chr) {
    this.user = user;
    this.loc = loc;
    this.chr = chr;
  }

  toString() {
    return `(${this.user}, ${this.loc}, ${this.chr})`;
  }
}
