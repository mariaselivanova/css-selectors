import api from '../../utils/api';
import ButtonView from '../../utils/button-view';
import InputView from '../../utils/input-view';
import { SelectedCar } from '../../utils/types';
import View from '../../utils/view';
import Modal from '../modal/modal';
import './update-car.css';

export default class UpdateCar extends View {
  private nameInput: InputView;

  private colorInput: InputView;

  private updateButton: ButtonView;

  private selectedId: number | null;

  constructor() {
    super('div', ['update-car']);
    this.selectedId = null;
    this.nameInput = new InputView(['name-input'], 'text');
    this.colorInput = new InputView(['color-input'], 'color');
    this.updateButton = new ButtonView(['update-btn'], 'button');
    this.init();
  }

  private init(): void {
    this.updateButton.setTextContent('update');
    this.addElements([
      this.nameInput.getElement(),
      this.colorInput.getElement(),
      this.updateButton.getElement(),
    ]);
    document.addEventListener('carSelected', (event) => this.handleSelect((event as CustomEvent).detail));
    this.updateButton.getElement().addEventListener('click', () => this.updateCar(this.selectedId));
  }

  private handleSelect(data: SelectedCar): void {
    const { id, name, color } = data;
    this.selectedId = id;
    this.nameInput.setValue(name);
    this.colorInput.setValue(color);
  }

  private updateCar(id: number | null): void {
    if (!this.selectedId) {
      console.log('Select the car!');
      return;
    }
    if (!this.nameInput.getValue()) {
      const modal = new Modal('Please name your car!');
      document.body.append(modal.getElement());
      setTimeout(() => {
        modal.getElement().remove();
      }, 1500);
      return;
    }
    if (id) {
      api.updateCar(id, this.nameInput.getValue(), this.colorInput.getValue())
        .then(() => {
          document.dispatchEvent(new Event('carsUpdated'));
          console.log(`The car №${id} was updated`);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.nameInput.clearInput();
          this.colorInput.clearInput();
          this.selectedId = null;
        });
    }
  }
}