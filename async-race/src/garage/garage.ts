import View from '../utils/view';
import api from '../utils/api';
import { CarResponse } from '../utils/types';
import CarView from './car-view/car-view';

export default class Garage extends View {
  constructor() {
    super('div', ['garage']);
    this.getCars();
  }

  private getCars(): void {
    api.getAllCars()
      .then((carData: CarResponse[]) => {
        carData.forEach((car) => {
          const carView = new CarView(car.id, car.name, car.color);
          this.addElements([carView.getElement()]);
        });
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  }
}
