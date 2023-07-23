import View from '../utils/view';

export default class WinnerCounter extends View {
  public count: number;

  constructor() {
    super('p', ['winner-counter']);
    this.count = 0;
  }

  public getWinnerCount(num: number): void {
    this.count = num;
    this.setTextContent(`winners: ${this.count}`);
  }
}
