import View from '../utils/view';
import api from '../utils/api';
import { CarResponse, GeneratedCar } from '../utils/types';
import CarView from './car-view/car-view';
import './garage.css';
import CarCounter from './car-counter';

export default class Garage extends View {
  private counter: CarCounter;

  constructor(counter: CarCounter) {
    super('div', ['garage']);
    this.getCars();
    this.counter = counter;
  }

  private getCars(): void {
    api.getAllCars(1, 9)
      .then((carData: CarResponse[]) => {
        const carAmount = +api.headers['X-Total-Count'];
        this.counter.updateCarCount(carAmount);
        carData.forEach((car) => {
          const carView = new CarView(car.id, car.name, car.color, this.counter);
          this.addElements([carView.getElement()]);
        });
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  }

  public addGeneratedCars(cars: GeneratedCar[]): void {
    cars.forEach((car) => {
      api.createCar(car.name, car.color)
        .then((carData) => {
          const { name, color, id } = carData;
          const newCar = new CarView(id, name, color, this.counter);
          this.addElements([newCar.getElement()]);
          this.counter.updateCarCount(1);
        })
        .catch((err) => console.log(err));
    });
  }
}
