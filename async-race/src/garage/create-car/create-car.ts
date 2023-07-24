import api from '../../utils/api';
import ButtonView from '../../utils/button-view';
import InputView from '../../utils/input-view';
import View from '../../utils/view';
import './create-car.css';

export default class CreateCar extends View {
  private nameInput: InputView;

  private colorInput: InputView;

  private createButton: ButtonView;

  constructor() {
    super('div', ['create-car']);
    this.nameInput = new InputView(['name-input'], 'text');
    this.colorInput = new InputView(['color-input'], 'color');
    this.createButton = new ButtonView(['create-btn'], 'button');
    this.init();
  }

  private init(): void {
    this.createButton.setTextContent('create');
    this.createButton.getElement().addEventListener('click', () => this.createCar());
    this.addElements([
      this.nameInput.getElement(),
      this.colorInput.getElement(),
      this.createButton.getElement()]);
  }

  private createCar(): void {
    api.createCar(this.nameInput.getValue(), this.colorInput.getValue())
      .then(() => {
        document.dispatchEvent(new Event('carsUpdated'));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.nameInput.clearInput();
        this.colorInput.clearInput();
      });
  }
}
