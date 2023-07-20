import CarCounter from './garage/car-counter';
import CreateCar from './garage/create-car/create-car';
import Garage from './garage/garage';
import GenerateCarsBtn from './garage/generate-cars/generate-cars-btn';
import Pagination from './garage/pagination/pagination';
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

  private pagination: Pagination;

  constructor() {
    super('main', ['main']);
    this.carCounter = new CarCounter();
    this.garage = new Garage();
    this.createCar = new CreateCar(this.carCounter);
    this.updateCar = new UpdateCar();
    this.winners = new Winners();
    this.pagination = new Pagination(this.garage, this.carCounter);
    this.generateCars = new GenerateCarsBtn(this.pagination);
    this.addElements([
      this.createCar.getElement(),
      this.updateCar.getElement(),
      this.generateCars.getElement(),
      this.carCounter.getElement(),
      this.pagination.getElement(),
      this.garage.getElement()]);
  }

  public toGarage(): void {
    this.removeContent();
    this.addElements([
      this.createCar.getElement(),
      this.updateCar.getElement(),
      this.generateCars.getElement(),
      this.carCounter.getElement(),
      this.pagination.getElement(),
      this.garage.getElement()]);
  }

  public toWinners(): void {
    this.removeContent();
    this.addElements([this.winners.getElement()]);
  }
}
