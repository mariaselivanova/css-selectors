import ButtonView from '../../utils/button-view';
import Garage from '../garage';
import { carBrands, carModels } from './cars';
import './generate-cars.css';

export default class GenerateCarsBtn extends ButtonView {
  constructor() {
    super(['generate-cars'], 'button');
    this.setTextContent('generate cars');
    this.element?.addEventListener('click', () => Garage.addGeneratedCars(GenerateCarsBtn.createCars(carBrands, carModels)));
  }

  private static createCars(brands: string[], models: string[]): { name: string; color: string }[] {
    const res = [];
    for (let i = 0; i < 100; i += 1) {
      const randomBrand = brands[Math.floor(Math.random() * brands.length)];
      const randomModel = models[Math.floor(Math.random() * models.length)];
      const name = `${randomBrand} ${randomModel}`;
      const color = GenerateCarsBtn.getRandomColor();
      res.push({ name, color });
    }
    return res;
  }

  private static getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
