import api from '../../utils/api';
import ButtonView from '../../utils/button-view';
import View from '../../utils/view';
import CarView from '../car-view/car-view';
import Garage from '../garage';
import ColorInput from '../inputs/color-input';
import NameInput from '../inputs/name-input';
import './create-car.css';

export default class CreateCar extends View {
  private nameInput: NameInput;

  private colorInput: ColorInput;

  private createButton: ButtonView;

  private garage: Garage;

  constructor(garage: Garage) {
    super('div', ['create-car']);
    this.nameInput = new NameInput();
    this.colorInput = new ColorInput();
    this.createButton = new ButtonView(['create-btn'], 'button');
    this.createButton.setTextContent('create');
    this.createButton.getElement().addEventListener('click', () => this.createCar());
    this.garage = garage;
    this.addElements([
      this.nameInput.getElement(),
      this.colorInput.getElement(),
      this.createButton.getElement()]);
  }

  private createCar(): void {
    api.createCar(this.nameInput.getValue(), this.colorInput.getValue())
      .then((carData) => {
        const { name, color, id } = carData;
        const newCar = new CarView(id, name, color);
        this.garage.addElements([newCar.getElement()]);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.nameInput.clearInput();
        this.colorInput.clearInput();
      });
  }
}
