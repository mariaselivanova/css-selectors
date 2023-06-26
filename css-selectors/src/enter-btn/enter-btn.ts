import Input from '../css-view/input/input';
import ButtonView from '../utils/button-view';
import './enter-btn.css';

export default class EnterBtn extends ButtonView {
  private input: Input;

  constructor(input: Input) {
    super(['enter-btn']);
    this.setTextContent('enter');
    this.setButtonType('button');
    this.input = input;
    this.element?.addEventListener('click', () => this.handleEnterBtn());
  }

  private handleEnterBtn():void {
    this.input.handleInput();
  }
}
