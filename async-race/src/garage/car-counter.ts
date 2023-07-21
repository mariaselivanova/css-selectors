import View from '../utils/view';

export default class CarCounter extends View {
  public count: number;

  constructor() {
    super('p', ['car-counter']);
    this.count = 0;
  }

  public getCarCount(num: number): void {
    this.count = num;
    this.setTextContent(`garage: ${this.count} ${this.count === 1 ? 'car' : 'cars'}`);
  }
}
