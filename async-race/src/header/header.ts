import Main from '../main';
import ButtonView from '../utils/button-view';
import View from '../utils/view';
import Winners from '../winners/winners';
import './header.css';

export default class Header extends View {
  private main: Main;

  private winners: Winners;

  private toGarageBtn: ButtonView;

  private toWinnerBtn: ButtonView;

  constructor(main: Main) {
    super('header', ['header']);
    this.toGarageBtn = new ButtonView(['to-garage-btn', 'inactive'], 'button');
    this.toWinnerBtn = new ButtonView(['to-winners-btn'], 'button');
    this.toGarageBtn.setTextContent('to garage');
    this.toWinnerBtn.setTextContent('to winners');
    this.main = main;
    this.winners = new Winners();
    this.toGarageBtn.getElement().addEventListener('click', () => this.showGarage());
    this.toWinnerBtn.getElement().addEventListener('click', () => this.showWinners());
    this.addElements([this.toGarageBtn.getElement(), this.toWinnerBtn.getElement()]);
  }

  private async showWinners(): Promise<void> {
    this.main.getElement().classList.add('hidden');
    document.body.append(this.winners.getElement());
    this.toWinnerBtn.getElement().classList.add('inactive');
    this.toGarageBtn.getElement().classList.remove('inactive');
    await this.winners.createTable();
  }

  private showGarage(): void {
    this.main.getElement().classList.remove('hidden');
    this.winners.getElement().remove();
    this.toGarageBtn.getElement().classList.add('inactive');
    this.toWinnerBtn.getElement().classList.remove('inactive');
  }
}
