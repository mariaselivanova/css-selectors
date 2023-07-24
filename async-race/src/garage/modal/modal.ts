import ButtonView from '../../utils/button-view';
import View from '../../utils/view';
import './modal.css';

export default class Modal extends View {
  constructor(carName: string, time: number) {
    super('div', ['modal']);
    this.init(carName, time);
  }

  private init(carName: string, time: number): void {
    const nameText = new View('p', ['modal-text']);
    const timeText = new View('p', ['modal-text']);
    const modalBtn = new ButtonView(['modal-button'], 'button');
    nameText.setTextContent(`${carName} won!`);
    timeText.setTextContent(`Result: ${time.toFixed(2)}s`);
    modalBtn.setTextContent('x');
    modalBtn.getElement().addEventListener('click', () => this.getElement().remove());
    this.addElements([nameText.getElement(), timeText.getElement(), modalBtn.getElement()]);
  }
}
