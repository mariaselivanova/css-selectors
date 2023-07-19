import CreateCar from './garage/create-car/create-car';
import Garage from './garage/garage';

export default class App {
  public static start():void {
    const garage = new Garage();
    const createCar = new CreateCar(garage);
    document.body.append(createCar.getElement(), garage.getElement());
  }
}
