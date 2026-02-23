import type Chr from './Chr';

export default class Insert {
  readonly preChrId: string;
  readonly chr: Chr;

  constructor(preChrId: string, chr: Chr) {
    this.preChrId = preChrId;
    this.chr = chr;
  }
}
