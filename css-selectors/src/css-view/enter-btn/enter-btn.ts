import ButtonView from '../../utils/button-view';
import './enter-btn.css';

export default class EnterBtn extends ButtonView {
  constructor(callback: () => void) {
    super(['enter-btn']);
    this.setTextContent('enter');
    this.setButtonType('button');
    this.element?.addEventListener('click', callback);
  }
}
