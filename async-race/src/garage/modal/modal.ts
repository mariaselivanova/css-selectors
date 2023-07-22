import ButtonView from '../../utils/button-view';
import View from '../../utils/view';
import './modal.css';

export default class Modal extends View {
  constructor(carName: string, time: number) {
    super('div', ['modal']);
    const nameText = new View('p', ['modal-text']);
    nameText.setTextContent(`${carName} won!`);
    const timeText = new View('p', ['modal-text']);
    timeText.setTextContent(`Result: ${time.toFixed(2)}s`);
    const modalBtn = new ButtonView(['modal-button'], 'button');
    modalBtn.getElement().addEventListener('click', () => this.getElement().remove());
    modalBtn.setTextContent('x');
    this.addElements([nameText.getElement(), timeText.getElement(), modalBtn.getElement()]);
  }
}
