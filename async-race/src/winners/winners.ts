import api from '../utils/api';
import { CarResponse, WinnerResponse } from '../utils/types';
import View from '../utils/view';
import './winners.css';

export default class Winners extends View {
  constructor() {
    super('div', ['winners']);
  }

  private static async getCarData(id: number): Promise<CarResponse> {
    const car = await api.getCar(id);
    return car;
  }

  public displayWinners(winners: WinnerResponse[]): void {
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    const headers = ['Number', 'Car', 'Name', 'Wins', 'Best time(s)'];
    headers.forEach((header) => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    winners.forEach(async (winner, index) => {
      const row = table.insertRow();
      const { id, wins, time } = winner;

      const carData = await Winners.getCarData(id);

      const number = row.insertCell();
      number.textContent = (index + 1).toString();

      const picCell = row.insertCell();
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
      <path d="M171.3 96H224v96H111.3l30.4-75.9C146.5 104 158.2 96 171.3 96zM272 192V96h81.2c9.7 0 18.9 4.4 25 12l67.2 84H272zm256.2 1L428.2 68c-18.2-22.8-45.8-36-75-36H171.3c-39.3 0-74.6 23.9-89.1 60.3L40.6 196.4C16.8 205.8 0 228.9 0 256V368c0 17.7 14.3 32 32 32H65.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H385.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H608c17.7 0 32-14.3 32-32V320c0-65.2-48.8-119-111.8-127zM434.7 368a48 48 0 1 1 90.5 32 48 48 0 1 1 -90.5-32zM160 336a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" fill=${carData.color} />
      </svg>`;
      picCell.innerHTML = svg;

      const nameCell = row.insertCell();
      nameCell.textContent = carData.name;

      const winsCell = row.insertCell();
      winsCell.textContent = wins.toString();

      const timeCell = row.insertCell();
      timeCell.textContent = time.toFixed(2).toString();
    });
    this.removeContent();
    this.addElements([table]);
  }
}
