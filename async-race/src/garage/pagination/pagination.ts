import api from '../../utils/api';
import ButtonView from '../../utils/button-view';
import { CarResponse, GeneratedCar } from '../../utils/types';
import View from '../../utils/view';
import CarCounter from '../car-counter';
import CarView from '../car-view/car-view';
import Garage from '../garage';

const ITEMS_PER_PAGE = 7;

export default class Pagination extends View {
  public currentPage: number;

  public totalPages: number;

  private garage: Garage;

  private counter: CarCounter;

  private current: View;

  constructor(garage: Garage, counter: CarCounter) {
    super('nav', ['pagination']);
    this.currentPage = 1;
    this.totalPages = 1;
    this.garage = garage;
    this.counter = counter;
    const prev = new ButtonView(['prev'], 'button');
    const next = new ButtonView(['next'], 'button');
    this.current = new View('p', ['current-page']);
    this.current.setTextContent(`page #${this.currentPage}`);
    prev.setTextContent('PREV');
    next.setTextContent('NEXT');
    this.addElements([prev.getElement(), next.getElement(), this.current.getElement()]);
    next.getElement().addEventListener('click', () => this.loadNextPage());
    prev.getElement().addEventListener('click', () => this.loadPrevPage());
    document.addEventListener('carsUpdated', () => this.reloadPage());
    this.displayCurrentCars();
  }

  private displayCurrentCars(): void {
    this.getCars(this.currentPage);
  }

  private getCars(page: number): Promise<number> {
    return api
      .getAllCars(page, ITEMS_PER_PAGE)
      .then((carData: CarResponse[]) => {
        this.totalPages = Math.ceil(parseInt(api.headers['X-Total-Count'], 10) / ITEMS_PER_PAGE);
        this.counter.getCarCount(parseInt(api.headers['X-Total-Count'], 10));
        carData.forEach((car) => {
          const carView = new CarView(car.id, car.name, car.color);
          this.garage.addElements([carView.getElement()]);
        });
        return carData.length;
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
        return 0;
      });
  }

  private loadNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.garage.removeContent();
      this.currentPage += 1;
      this.getCars(this.currentPage);
      this.current.setTextContent(`page #${this.currentPage}`);
    }
  }

  private loadPrevPage(): void {
    if (this.currentPage > 1) {
      this.garage.removeContent();
      this.currentPage -= 1;
      this.getCars(this.currentPage);
      this.current.setTextContent(`page #${this.currentPage}`);
    }
  }

  public static addGeneratedCars(cars: GeneratedCar[]): void {
    cars.forEach((car) => {
      api.createCar(car.name, car.color)
        .catch((err) => console.log(err));
    });
    document.dispatchEvent(new Event('carAdded'));
  }

  private reloadPage(): void {
    this.garage.removeContent();
    this.getCars(this.currentPage).then((carsOnCurrentPage) => {
      if (carsOnCurrentPage === 0 && this.currentPage > 1) {
        this.currentPage -= 1;
        this.current.setTextContent(`page #${this.currentPage}`);
        this.getCars(this.currentPage);
      }
    });
  }
}
