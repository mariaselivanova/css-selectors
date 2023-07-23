import Pagination from '../pagination/pagination';
import api from '../utils/api';
import { CarResponse, GeneratedCar } from '../utils/types';
import View from '../utils/view';
import CarCounter from './car-counter';
import CarView from './car-view/car-view';
import './garage.css';

const ITEMS_PER_PAGE = 7;

export default class Garage extends View {
  public currentPage: number;

  public totalPages: number;

  private counter: CarCounter;

  public currentCarElements: { [id: number]: HTMLElement };

  private pagination: Pagination;

  constructor(counter: CarCounter) {
    super('div', ['garage']);
    this.currentPage = 1;
    this.totalPages = 1;
    this.counter = counter;
    this.currentCarElements = {};
    this.pagination = new Pagination();
    this.pagination.current.setTextContent(`page #${this.currentPage}`);
    this.pagination.createPagination();
    this.pagination.next.getElement().addEventListener('click', () => this.loadNextPage());
    this.pagination.prev.getElement().addEventListener('click', () => this.loadPrevPage());
    document.addEventListener('carsUpdated', () => this.reloadPage());
    this.displayCurrentCars();
  }

  private displayCurrentCars(): void {
    this.getCars(this.currentPage);
  }

  private getCars(page: number): Promise<number> {
    this.currentCarElements = {};
    const raceBtn = document.querySelector('.race');
    raceBtn?.classList.remove('disabled');
    return api
      .getAllCars(page, ITEMS_PER_PAGE)
      .then((carData: CarResponse[]) => {
        this.totalPages = Math.ceil(parseInt(api.headers['X-Total-Count'], 10) / ITEMS_PER_PAGE);
        this.counter.getCarCount(parseInt(api.headers['X-Total-Count'], 10));
        this.addElements([this.pagination.getElement()]);
        carData.forEach((car) => {
          const carView = new CarView(car.id, car.name, car.color);
          this.currentCarElements[car.id] = carView.getElement();
          this.addElements([carView.getElement()]);
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
      this.removeContent();
      this.currentPage += 1;
      this.getCars(this.currentPage);
      this.pagination.current.setTextContent(`page #${this.currentPage}`);
    }
  }

  private loadPrevPage(): void {
    if (this.currentPage > 1) {
      this.removeContent();
      this.currentPage -= 1;
      this.getCars(this.currentPage);
      this.pagination.current.setTextContent(`page #${this.currentPage}`);
    }
  }

  public static addGeneratedCars(cars: GeneratedCar[]): void {
    cars.forEach((car) => {
      api.createCar(car.name, car.color)
        .catch((err) => console.log(err));
    });
    document.dispatchEvent(new Event('carsUpdated'));
  }

  public reloadPage(): void {
    this.removeContent();
    this.getCars(this.currentPage).then((carsOnCurrentPage) => {
      if (carsOnCurrentPage === 0 && this.currentPage > 1) {
        this.currentPage -= 1;
        this.pagination.current.setTextContent(`page #${this.currentPage}`);
        this.getCars(this.currentPage);
      }
    });
  }
}
