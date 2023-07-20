import View from '../utils/view';
import api from '../utils/api';
import { CarResponse } from '../utils/types';
import CarView from './car-view/car-view';
import './garage.css';

export default class Garage extends View {
  private carElements: HTMLElement[];

  constructor() {
    super('div', ['garage']);
    this.getCars();
    this.carElements = [];
  }

  private getCars(): void {
    api.getAllCars(1, 9)
      .then((carData: CarResponse[]) => {
        const carAmount = +api.headers['X-Total-Count'];
        carData.forEach((car) => {
          const carView = new CarView(car.id, car.name, car.color);
          this.addElements([carView.getElement()]);
          this.carElements.push(carView.getElement());
        });
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  }
}
