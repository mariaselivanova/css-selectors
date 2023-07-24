import Counter from './counter/counter';
import CreateCar from './garage/create-car/create-car';
import Garage from './garage/garage';
import GenerateCarsBtn from './garage/generate-cars/generate-cars-btn';
import RaceBtn from './garage/race/race';
import ResetAllBtn from './garage/reset-all/reset-all';
import UpdateCar from './garage/update-car/update-car';
import Pagination from './pagination/pagination';
import View from './utils/view';

export default class Main extends View {
  constructor() {
    super('main', ['main']);
    const carCounter = new Counter('car-counter', 'garage');
    const pagination = new Pagination();
    const garage = new Garage(carCounter, pagination);
    const createCar = new CreateCar();
    const updateCar = new UpdateCar();
    const generateCars = new GenerateCarsBtn();
    const resetAllBtn = new ResetAllBtn(garage);
    const raceBtn = new RaceBtn(garage);
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
