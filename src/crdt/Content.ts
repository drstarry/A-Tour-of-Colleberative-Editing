import Chr from './Chr';
import Insert from './Insert';
import Delete from './Delete';
import Text from './Text';

export default class Content {
  readonly user: number;
  private id: number;
  private text: Text;

  constructor(user: number) {
    this.user = user;
    this.id = 0;
    this.text = new Text();
  }

  apply(loc: number, type: 'ins' | 'del', ch: string): Insert | Delete {
    if (type === 'ins') {
      const chr = new Chr(this.user, ch, this.id);
      const preChrId = this.text.add(loc, new Chr(this.user, ch, this.id));
      this.id = this.text.cnt();
      return new Insert(preChrId, chr);
    }

    return new Delete(this.text.remove(loc));
  }

  applyInsert(ins: Insert): void {
    this.text.addAfter(ins.preChrId, ins.chr);
    this.id = this.text.cnt();
  }

  applyDelete(del: Delete): void {
    this.text.removeAt(del.chrId);
  }

  len(): number {
    return this.text.len();
  }

  toString(): string {
    return this.text.toString();
  }
}
