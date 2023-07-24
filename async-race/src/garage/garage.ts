import Counter from '../counter/counter';
import Pagination from '../pagination/pagination';
import api from '../utils/api';
import { CarResponse, GeneratedCar } from '../utils/types';
import View from '../utils/view';
import CarView from './car-view/car-view';
import './garage.css';

const ITEMS_PER_PAGE = 7;

export default class Garage extends View {
  public currentPage: number;

  public totalPages: number;

  private counter: Counter;

  public currentCarElements: { [id: number]: HTMLElement };

  private pagination: Pagination;

  constructor(counter: Counter, pagination: Pagination) {
    super('div', ['garage']);
    this.currentPage = 1;
    this.totalPages = 1;
    this.counter = counter;
    this.currentCarElements = {};
    this.pagination = pagination;
    this.init();
  }

  private async init(): Promise<void> {
    this.pagination.current.setTextContent(`page #${this.currentPage}`);
    this.pagination.createPagination();
    this.pagination.next.getElement().addEventListener('click', () => this.loadNextPage());
    this.pagination.prev.getElement().addEventListener('click', () => this.loadPrevPage());
    document.addEventListener('carsUpdated', () => this.reloadPage());
    this.pagination.checkPage(this.currentPage, this.totalPages);
    await this.getCars(this.currentPage);
  }

  private async getCars(page: number): Promise<void> {
    this.currentCarElements = {};
    try {
      const carData: CarResponse[] = await api.getAllCars(page, ITEMS_PER_PAGE);
      const totalCarAmount = parseInt(api.headers['X-Total-Count'], 10);
      this.totalPages = Math.ceil(totalCarAmount / ITEMS_PER_PAGE);
      this.counter.getCount(totalCarAmount);

      const carElements: HTMLElement[] = carData.map((car) => {
        const carView = new CarView(car.id, car.name, car.color);
        this.currentCarElements[car.id] = carView.getElement();
        return carView.getElement();
      });
      this.addElements(carElements);
      this.pagination.checkPage(this.currentPage, this.totalPages);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  }

  private async loadNextPage(): Promise<void> {
    if (this.currentPage < this.totalPages) {
      this.removeContent();
      this.currentPage += 1;
      await this.getCars(this.currentPage);
      this.pagination.current.setTextContent(`page #${this.currentPage}`);
      this.pagination.prev.getElement().classList.remove('disabled');
      this.pagination.next.getElement().classList.toggle('disabled', this.currentPage === this.totalPages);
    }
  }

  private async loadPrevPage(): Promise<void> {
    if (this.currentPage > 1) {
      this.removeContent();
      this.currentPage -= 1;
      await this.getCars(this.currentPage);
      this.pagination.current.setTextContent(`page #${this.currentPage}`);
      this.pagination.next.getElement().classList.remove('disabled');
      this.pagination.prev.getElement().classList.toggle('disabled', this.currentPage === 1);
    }
  }

  public static async createGeneratedCars(cars: GeneratedCar[]): Promise<void> {
    try {
      await Promise.all(cars.map((car) => api.createCar(car.name, car.color)));
      document.dispatchEvent(new Event('carsUpdated'));
    } catch (err) {
      console.error('Error creating cars:', err);
    }
  }

  public async reloadPage(): Promise<void> {
    this.removeContent();
    await this.getCars(this.currentPage);
    if (Object.keys(this.currentCarElements).length === 0 && this.currentPage > 1) {
      this.currentPage -= 1;
      this.pagination.current.setTextContent(`page #${this.currentPage}`);
      await this.getCars(this.currentPage);
    }
  }
}
