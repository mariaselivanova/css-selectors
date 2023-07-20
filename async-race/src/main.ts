import CarCounter from './garage/car-counter';
import CreateCar from './garage/create-car/create-car';
import Garage from './garage/garage';
import GenerateCarsBtn from './garage/generate-cars/generate-cars-btn';
import UpdateCar from './garage/update-car/update-car';
import View from './utils/view';
import Winners from './winners/winners';

export default class Main extends View {
  private garage: Garage;

  private createCar: CreateCar;

  private winners: Winners;

  private updateCar: UpdateCar;

  private carCounter: CarCounter;

  private generateCars: GenerateCarsBtn;

  constructor() {
    super('main', ['main']);
    this.carCounter = new CarCounter();
    this.garage = new Garage(this.carCounter);
    this.createCar = new CreateCar(this.garage, this.carCounter);
    this.updateCar = new UpdateCar();
    this.winners = new Winners();
    this.generateCars = new GenerateCarsBtn(this.garage);
    this.addElements([
      this.createCar.getElement(),
      this.updateCar.getElement(),
      this.generateCars.getElement(),
      this.carCounter.getElement(),
      this.garage.getElement()]);
  }

  public toGarage(): void {
    this.removeContent();
    this.addElements([
      this.createCar.getElement(),
      this.updateCar.getElement(),
      this.generateCars.getElement(),
      this.carCounter.getElement(),
      this.garage.getElement()]);
  }

  public toWinners(): void {
    this.removeContent();
    this.addElements([this.winners.getElement()]);
  }
}
