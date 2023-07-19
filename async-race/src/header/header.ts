import Main from '../main';
import ButtonView from '../utils/button-view';
import View from '../utils/view';
import './header.css';

export default class Header extends View {
  constructor(main: Main) {
    super('header', ['header']);
    const toGarageBtn = new ButtonView(['to-garage-btn'], 'button');
    const toWinnerBtn = new ButtonView(['to-winners-btn'], 'button');
    toGarageBtn.setTextContent('to garage');
    toWinnerBtn.setTextContent('to winners');
    toGarageBtn.getElement().addEventListener('click', () => main.toGarage());
    toWinnerBtn.getElement().addEventListener('click', () => main.toWinners());
    this.addElements([toGarageBtn.getElement(), toWinnerBtn.getElement()]);
  }
}
