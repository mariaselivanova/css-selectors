import api from '../../utils/api';
import ButtonView from '../../utils/button-view';
import Garage from '../garage';
import Modal from '../modal/modal';

export default class RaceBtn extends ButtonView {
  private garage: Garage;

  constructor(garage: Garage) {
    super(['race'], 'button');
    this.setTextContent('race');
    this.element?.addEventListener('click', () => this.raceAllCars());
    this.garage = garage;
  }

  private static async raceOneCar(carId: number, carElement: HTMLElement):
  Promise<{ carId: number, animationDuration: number, carName: string }> {
    const startBtn = carElement.querySelector('.engine-start');
    const stopBtn = carElement.querySelector('.reset-btn');
    const svg = carElement?.querySelector('svg');
    const carName = carElement.querySelector('.car-name')?.textContent;

    try {
      const engineData = await api.handleEngine(carId, 'started');
      const animationDuration = engineData.distance / engineData.velocity / 1000;
      if (svg) {
        svg.style.animation = `carAnimation ${animationDuration}s linear forwards`;
      }
      stopBtn?.classList.remove('disabled');
      startBtn?.classList.add('disabled');
      await api.handleEngine(carId, 'drive');
      return { carId, animationDuration, carName: carName || '' };
    } catch {
      if (svg) {
        svg.style.animationPlayState = 'paused';
      }
      throw new Error();
    }
  }

  private async raceAllCars(): Promise<void> {
    const carEntries = Object.entries(this.garage.currentCarElements);
    const drivePromises = carEntries.map(
      ([carId, carElement]) => RaceBtn.raceOneCar(+carId, carElement),
    );
    const winner = await Promise.any(drivePromises);
    if (winner) {
      const modal = new Modal(winner?.carName, winner?.animationDuration);
      document.body.append(modal.getElement());
      const winnerTime = +winner.animationDuration.toFixed(2);
      try {
        const findWinner = await api.getWinner(winner.carId);
        const currentTime = findWinner.time;
        const currentWins = findWinner.wins;
        let newTime;
        if (currentTime > winnerTime) {
          newTime = winnerTime;
        } else {
          newTime = currentTime;
        }
        const newWins = currentWins + 1;
        await api.updateWinner(winner.carId, newWins, newTime);
      } catch {
        api.createWinner(winner.carId, 1, winnerTime);
      }
    }
  }
}
