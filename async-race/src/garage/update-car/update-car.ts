import ButtonView from '../../utils/button-view';
import View from '../../utils/view';
import ColorInput from '../inputs/color-input';
import NameInput from '../inputs/name-input';
import './update-car.css';

export default class UpdateCar extends View {
  private nameInput: NameInput;

  private colorInput: ColorInput;

  private updateButton: ButtonView;

  constructor() {
    super('div', ['update-car']);
    this.nameInput = new NameInput();
    this.colorInput = new ColorInput();
    this.updateButton = new ButtonView(['create-btn'], 'button');
    this.updateButton.setTextContent('update');
    this.addElements([
      this.nameInput.getElement(),
      this.colorInput.getElement(),
      this.updateButton.getElement(),
    ]);
  }
}
