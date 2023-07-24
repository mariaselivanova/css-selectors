import Counter from '../counter/counter';
import Pagination from '../pagination/pagination';
import api from '../utils/api';
import createSvg from '../utils/create-svg';
import { CarResponse, SortOptions, SortOrder } from '../utils/types';
import View from '../utils/view';
import './winners.css';

const ITEMS_PER_PAGE = 10;

export default class Winners extends View {
  public currentPage: number;

  public totalPages: number;

  private winnerCounter: Counter;

  private table: HTMLTableElement;

  private areWinsSorted: SortOrder | undefined;

  private isTimeSorted: SortOrder | undefined;

  private pagination: Pagination;

  constructor() {
    super('div', ['winners']);
    this.currentPage = 1;
    this.totalPages = 1;
    this.winnerCounter = new Counter('winner-counter', 'winners');
    this.pagination = new Pagination();
    this.table = document.createElement('table');
    this.init();
  }

  private init(): void {
    this.pagination.current.setTextContent(`page #${this.currentPage}`);
    this.pagination.createPagination();
    this.pagination.next.getElement().addEventListener('click', () => this.loadNextPage());
    this.pagination.prev.getElement().addEventListener('click', () => this.loadPrevPage());
    this.checkPage();
    this.addElements([
      this.winnerCounter.getElement(),
      this.pagination.getElement(),
      this.table,
    ]);
  }

  private checkPage(): void {
    if (this.currentPage === 1) {
      this.pagination.prev.getElement().classList.add('disabled');
    }
  }

  private createTableHeader(winsHeader = 'Wins', timeHeader = 'Best time(s)'): void {
    const headerRow = this.table.insertRow();
    const headers = ['Number', 'Car', 'Name', winsHeader, timeHeader];
    headers.forEach((header) => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
      if (header.includes('Wins')) {
        th.classList.add('th-wins');
        th.addEventListener('click', () => this.sortWins());
      }
      if (header.includes('time')) {
        th.classList.add('th-time');
        th.addEventListener('click', () => this.sortTime());
      }
    });
  }

  public async createTable(
    sortOptions?: SortOptions,
    sortOrder?: SortOrder,
    winsHeader = 'Wins',
    timeHeader = 'Best time(s)',
  ): Promise<void> {
    const winners = await api.getWinners(this.currentPage, ITEMS_PER_PAGE, sortOptions, sortOrder);
    const totalWinnerCount = parseInt(api.headers['X-Total-Count'], 10);
    this.totalPages = Math.ceil(totalWinnerCount / ITEMS_PER_PAGE);
    this.winnerCounter.getCount(totalWinnerCount);
    this.table.innerHTML = '';
    this.createTableHeader(winsHeader, timeHeader);
    winners.forEach(async (winner, index) => {
      const row = this.table.insertRow();
      const { id, wins, time } = winner;

      const carData = await Winners.getCarData(id);

      const number = row.insertCell();
      const rowNumber = index + 1 + (this.currentPage - 1) * ITEMS_PER_PAGE;
      number.textContent = rowNumber.toString();

      const picCell = row.insertCell();
      const svg = createSvg(carData.color);
      picCell.innerHTML = svg;

      const nameCell = row.insertCell();
      nameCell.textContent = carData.name;

      const winsCell = row.insertCell();
      winsCell.textContent = wins.toString();

      const timeCell = row.insertCell();
      timeCell.textContent = time.toString();
    });
    this.addElements([this.table]);
  }

  private static async getCarData(id: number): Promise<CarResponse> {
    const carData = await api.getCar(id);
    return carData;
  }

  private async sortTime(): Promise<void> {
    this.isTimeSorted = this.isTimeSorted === SortOrder.asc ? SortOrder.desc : SortOrder.asc;
    this.createTable(
      SortOptions.time,
      this.isTimeSorted,
      undefined,
      `Best time(s) ${this.isTimeSorted === SortOrder.asc ? '↑' : '↓'}`,
    );
  }

  private async sortWins(): Promise<void> {
    this.areWinsSorted = this.areWinsSorted === SortOrder.asc ? SortOrder.desc : SortOrder.asc;
    this.createTable(
      SortOptions.wins,
      this.areWinsSorted,
      `Wins ${this.areWinsSorted === SortOrder.asc ? '↑' : '↓'}`,
      undefined,
    );
  }

  private async loadNextPage(): Promise<void> {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      await this.createTable();
      this.pagination.current.setTextContent(`page #${this.currentPage}`);
      this.pagination.prev.getElement().classList.remove('disabled');
      if (this.currentPage === this.totalPages) {
        this.pagination.next.getElement().classList.add('disabled');
      }
    }
  }

  private async loadPrevPage(): Promise<void> {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      await this.createTable();
      this.pagination.current.setTextContent(`page #${this.currentPage}`);
      this.pagination.next.getElement().classList.remove('disabled');
      if (this.currentPage === 1) {
        this.pagination.prev.getElement().classList.add('disabled');
      }
    }
  }
}
