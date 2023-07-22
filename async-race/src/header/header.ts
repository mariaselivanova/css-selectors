import Main from '../main';
import api from '../utils/api';
import ButtonView from '../utils/button-view';
import View from '../utils/view';
import Winners from '../winners/winners';
import './header.css';

export default class Header extends View {
  private main: Main;

  private winners: Winners;

  private toGarageBtn: ButtonView;

  private toWinnerBtn: ButtonView;

  constructor(main: Main, winners: Winners) {
    super('header', ['header']);
    this.toGarageBtn = new ButtonView(['to-garage-btn', 'inactive'], 'button');
    this.toWinnerBtn = new ButtonView(['to-winners-btn'], 'button');
    this.toGarageBtn.setTextContent('to garage');
    this.toWinnerBtn.setTextContent('to winners');
    this.main = main;
    this.winners = winners;
    this.toGarageBtn.getElement().addEventListener('click', () => this.showGarage());
    this.toWinnerBtn.getElement().addEventListener('click', () => this.showWinners());
    this.addElements([this.toGarageBtn.getElement(), this.toWinnerBtn.getElement()]);
  }

  private async showWinners(): Promise<void> {
    this.main.getElement().classList.add('hidden');
    this.winners.getElement().classList.add('winners-visible');
    this.toWinnerBtn.getElement().classList.add('inactive');
    this.toGarageBtn.getElement().classList.remove('inactive');
    try {
      const winners = await api.getWinners();
      this.winners.displayWinners(winners);
    } catch (err) {
      console.log(err);
    }
  }

  private showGarage(): void {
    this.main.getElement().classList.remove('hidden');
    this.winners.getElement().classList.remove('winners-visible');
    this.toGarageBtn.getElement().classList.add('inactive');
    this.toWinnerBtn.getElement().classList.remove('inactive');
  }
}
