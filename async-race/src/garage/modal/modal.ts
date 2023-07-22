import ButtonView from '../../utils/button-view';
import View from '../../utils/view';
import './modal.css';

export default class Modal extends View {
  constructor(carName: string, time: number) {
    super('div', ['modal']);
    const modalText = new View('p', ['modal-text']);
    modalText.setTextContent(`${carName} won! ${Math.round(time)}s`);
    const modalBtn = new ButtonView(['modal-button'], 'button');
    modalBtn.getElement().addEventListener('click', () => this.getElement().remove());
    modalBtn.setTextContent('x');
    this.addElements([modalText.getElement(), modalBtn.getElement()]);
  }
}
