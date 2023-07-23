import Pagination from '../pagination/pagination';
import api from '../utils/api';
import { CarResponse, SortOptions, SortOrder } from '../utils/types';
import View from '../utils/view';
import WinnerCounter from './winner-counter';
import './winners.css';

const ITEMS_PER_PAGE = 10;

export default class Winners extends View {
  public currentPage: number;

  public totalPages: number;

  private winnerCounter: WinnerCounter;

  private table: HTMLTableElement;

  private areWinsSorted: string | null;

  private isTimeSorted: string | null;

  private pagination: Pagination;

  constructor() {
    super('div', ['winners']);
    this.currentPage = 1;
    this.totalPages = 1;
    this.winnerCounter = new WinnerCounter();
    this.pagination = new Pagination();
    this.pagination.current.setTextContent(`page #${this.currentPage}`);
    this.pagination.createPagination();
    this.addElements([
      this.winnerCounter.getElement(),
      this.pagination.getElement(),
    ]);
    this.table = document.createElement('table');
    this.pagination.next.getElement().addEventListener('click', () => this.loadNextPage());
    this.pagination.prev.getElement().addEventListener('click', () => this.loadPrevPage());
    this.areWinsSorted = null;
    this.isTimeSorted = null;
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
    sortOptions: SortOptions | undefined = undefined,
    sortOrder: SortOrder | undefined = undefined,
    winsHeader: string | undefined = undefined,
    timeHeader: string | undefined = undefined,
  ): Promise<void> {
    const winners = await api.getWinners(this.currentPage, ITEMS_PER_PAGE, sortOptions, sortOrder);
    this.totalPages = Math.ceil(parseInt(api.headers['X-Total-Count'], 10) / ITEMS_PER_PAGE);
    this.winnerCounter.getCount(Math.ceil(parseInt(api.headers['X-Total-Count'], 10)));
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
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
      <path d="M171.3 96H224v96H111.3l30.4-75.9C146.5 104 158.2 96 171.3 96zM272 192V96h81.2c9.7
      0 18.9 4.4 25 12l67.2 84H272zm256.2 1L428.2 68c-18.2-22.8-45.8-36-75-36H171.3c-39.3 0-74.6
      23.9-89.1 60.3L40.6 196.4C16.8 205.8 0 228.9 0 256V368c0 17.7 14.3 32 32 32H65.3c7.6 45.4
      47.1 80 94.7 80s87.1-34.6 94.7-80H385.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H608c17.7
      0 32-14.3 32-32V320c0-65.2-48.8-119-111.8-127zM434.7 368a48 48 0 1 1 90.5 32 48 48 0 1 1
      -90.5-32zM160 336a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" fill=${carData.color} />
      </svg>`;
      picCell.innerHTML = svg;

      const nameCell = row.insertCell();
      nameCell.textContent = carData.name;

      const winsCell = row.insertCell();
      winsCell.textContent = wins.toString();

      const timeCell = row.insertCell();
      timeCell.textContent = time.toFixed(2).toString();
    });
    this.addElements([this.table]);
  }

  private static async getCarData(id: number): Promise<CarResponse> {
    const car = await api.getCar(id);
    return car;
  }

  private async sortTime(): Promise<void> {
    let order: SortOrder | undefined;
    let header;
    this.areWinsSorted = null;
    if (!this.isTimeSorted || this.isTimeSorted === 'ASC') {
      order = SortOrder.desc;
      header = 'Best time(s) ↓';
      this.isTimeSorted = 'DESC';
    } else {
      order = SortOrder.asc;
      header = 'Best time(s) ↑';
      this.isTimeSorted = 'ASC';
    }
    this.createTable(SortOptions.time, order, undefined, header);
  }

  private async sortWins(): Promise<void> {
    let order: SortOrder | undefined;
    let header;
    this.isTimeSorted = null;
    if (!this.areWinsSorted || this.areWinsSorted === 'ASC') {
      order = SortOrder.desc;
      header = 'Wins ↓';
      this.areWinsSorted = 'DESC';
    } else {
      order = SortOrder.asc;
      header = 'Wins ↑';
      this.areWinsSorted = 'ASC';
    }
    this.createTable(SortOptions.wins, order, header, undefined);
  }

  private async loadNextPage(): Promise<void> {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      await this.createTable();
      this.pagination.current.setTextContent(`page #${this.currentPage}`);
    }
  }

  private async loadPrevPage(): Promise<void> {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      await this.createTable();
      this.pagination.current.setTextContent(`page #${this.currentPage}`);
    }
  }
}
