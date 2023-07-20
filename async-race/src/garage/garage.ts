import View from '../utils/view';
import api from '../utils/api';
import { CarResponse } from '../utils/types';
import CarView from './car-view/car-view';
import './garage.css';

export default class Garage extends View {
  private totalCarCount: number;

  private title: View;

  private carElements: HTMLElement[];

  constructor() {
    super('div', ['garage']);
    this.totalCarCount = 0;
    this.title = new View('p', ['garage-title']);
    this.addElements([this.title.getElement()]);
    this.getCars();
    this.carElements = [];
  }

  public updateCarCount(num: number):void {
    this.totalCarCount += num;
    this.title.setTextContent(`Garage (${this.totalCarCount})`);
  }

  private getCars(): void {
    api.getAllCars(1, 9)
      .then((carData: CarResponse[]) => {
        this.totalCarCount = +api.headers['X-Total-Count'];
        this.title.setTextContent(`Garage (${this.totalCarCount})`);
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
