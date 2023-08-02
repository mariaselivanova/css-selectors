import ButtonView from '../../utils/button-view';
import Garage from '../garage';
import { carBrands, carModels } from './cars';

export default class GenerateCarsBtn extends ButtonView {
  constructor() {
    super(['generate-cars'], 'button');
    this.setTextContent('generate cars');
    this.element?.addEventListener('click', () => Garage.createGeneratedCars(GenerateCarsBtn.generateCars(carBrands, carModels)));
  }

  private static generateCars(
    brands: string[],
    models: string[],
  ): { name: string; color: string }[] {
    const res = [];
    for (let i = 0; i < 100; i += 1) {
      const randomBrand = brands[this.getRandomIndex(brands.length)];
      const randomModel = models[this.getRandomIndex(models.length)];
      const name = `${randomBrand} ${randomModel}`;
      const color = this.getRandomColor();
      res.push({ name, color });
    }
    return res;
  }

  private static getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[this.getRandomIndex(16)];
    }
    return color;
  }

  private static getRandomIndex(length: number): number {
    return Math.floor(Math.random() * length);
  }
}
