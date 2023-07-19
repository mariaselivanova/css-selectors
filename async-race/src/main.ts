import CreateCar from './garage/create-car/create-car';
import Garage from './garage/garage';
import View from './utils/view';
import Winners from './winners/winners';

export default class Main extends View {
  private garage: Garage;

  private createCar: CreateCar;

  private winners: Winners;

  constructor() {
    super('main', ['main']);
    this.garage = new Garage();
    this.createCar = new CreateCar(this.garage);
    this.winners = new Winners();
    this.addElements([this.createCar.getElement(), this.garage.getElement()]);
  }

  public toGarage(): void {
    this.removeContent();
    this.addElements([this.createCar.getElement(), this.garage.getElement()]);
  }

  public toWinners(): void {
    this.removeContent();
    this.addElements([this.winners.getElement()]);
  }
}
