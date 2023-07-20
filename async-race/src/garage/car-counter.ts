import View from '../utils/view';

export default class CarCounter extends View {
  private count: number;

  constructor() {
    super('p', ['car-counter']);
    this.count = 0;
  }
}
