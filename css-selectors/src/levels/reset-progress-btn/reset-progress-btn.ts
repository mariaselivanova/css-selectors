import './reset-progress-btn.css';
import ButtonView from '../../utils/button-view';

export default class ResetBtn extends ButtonView {
  constructor(callback: () => void) {
    super(['reset-btn']);
    this.setButtonType('reset');
    this.element?.addEventListener('click', callback);
    this.setTextContent('reset progress');
  }
}
