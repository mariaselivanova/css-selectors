import View from '../utils/view';

export default class CarCounter extends View {
  private count: number;

  constructor() {
    super('p', ['car-counter']);
    this.count = 0;
    this.setTextContent(`Garage ${this.count}`);
  }

  public updateCarCount(num: number): void {
    this.count += num;
    this.setTextContent(`Garage (${this.count})`);
  }
}
