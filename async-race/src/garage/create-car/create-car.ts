import api from '../../utils/api';
import ButtonView from '../../utils/button-view';
import View from '../../utils/view';
import CarCounter from '../car-counter';
import ColorInput from '../inputs/color-input';
import NameInput from '../inputs/name-input';
import './create-car.css';

export default class CreateCar extends View {
  private nameInput: NameInput;

  private colorInput: ColorInput;

  private createButton: ButtonView;

  private counter: CarCounter;

  constructor(counter: CarCounter) {
    super('div', ['create-car']);
    this.nameInput = new NameInput();
    this.colorInput = new ColorInput();
    this.createButton = new ButtonView(['create-btn'], 'button');
    this.createButton.setTextContent('create');
    this.createButton.getElement().addEventListener('click', () => this.createCar());
    this.counter = counter;
    this.addElements([
      this.nameInput.getElement(),
      this.colorInput.getElement(),
      this.createButton.getElement()]);
  }

  private createCar(): void {
    api.createCar(this.nameInput.getValue(), this.colorInput.getValue())
      .then(() => {
        this.counter.updateCarCount(1);
        document.dispatchEvent(new Event('carAdded'));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.nameInput.clearInput();
        this.colorInput.clearInput();
      });
  }
}
