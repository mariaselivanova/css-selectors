import View from '../utils/view';

export default class Counter extends View {
  public count: number;

  private counterType: string;

  constructor(className: string, counterType: string) {
    super('p', [className]);
    this.count = 0;
    this.counterType = counterType;
  }

  public getCount(num: number): void {
    this.count = num;
    this.setTextContent(`${this.counterType}: ${this.count}`);
  }
}
