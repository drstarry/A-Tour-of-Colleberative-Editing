export default class Chr {
  readonly user: number;
  readonly ch: string;
  readonly id: number;
  del: boolean;

  constructor(user: number, ch: string, id: number) {
    this.user = user;
    this.ch = ch;
    this.del = false;
    this.id = id;
  }

  lessThan(obj: Chr): boolean {
    return this.id < obj.id || (this.id === obj.id && this.user < obj.user);
  }

  getChrId(): string {
    return `${this.user} ${this.id}`;
  }
}
