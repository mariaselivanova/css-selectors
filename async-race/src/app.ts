import CarView from './garage/car-view';
import Garage from './garage/garage';

export default class App {
  public static start():void {
    const garage = new Garage();
    document.body.append(garage.getElement());
  }
}
