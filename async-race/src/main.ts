import CarCounter from './garage/car-counter';
import CreateCar from './garage/create-car/create-car';
import Garage from './garage/garage';
import GenerateCarsBtn from './garage/generate-cars/generate-cars-btn';
import Pagination from './garage/pagination/pagination';
import RaceBtn from './garage/race/race';
import ResetAllBtn from './garage/reset-all/reset-all';
import UpdateCar from './garage/update-car/update-car';
import View from './utils/view';

export default class Main extends View {
  constructor() {
    super('main', ['main']);
    const carCounter = new CarCounter();
    const garage = new Garage();
    const createCar = new CreateCar(carCounter);
    const updateCar = new UpdateCar();
    const pagination = new Pagination(garage, carCounter);
    const generateCars = new GenerateCarsBtn();
    const resetAllBtn = new ResetAllBtn(pagination);
    const raceBtn = new RaceBtn();
    const btnWrapper = new View('div', ['btn-wrapper']);
    btnWrapper.getElement().append(
      generateCars.getElement(),
      resetAllBtn.getElement(),
      raceBtn.getElement(),
    );
    this.addElements([
      createCar.getElement(),
      updateCar.getElement(),
      btnWrapper.getElement(),
      carCounter.getElement(),
      pagination.getElement(),
      garage.getElement()]);
  }
}
