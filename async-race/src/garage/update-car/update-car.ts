import api from '../../utils/api';
import ButtonView from '../../utils/button-view';
import { SelectedCar } from '../../utils/types';
import View from '../../utils/view';
import ColorInput from '../inputs/color-input';
import NameInput from '../inputs/name-input';
import './update-car.css';

export default class UpdateCar extends View {
  private nameInput: NameInput;

  private colorInput: ColorInput;

  private updateButton: ButtonView;

  private selectedCar: HTMLElement | undefined;

  private selectedId: number | null;

  constructor() {
    super('div', ['update-car']);
    this.selectedCar = undefined;
    this.selectedId = null;
    this.nameInput = new NameInput();
    this.colorInput = new ColorInput();
    this.updateButton = new ButtonView(['create-btn'], 'button');
    this.updateButton.setTextContent('update');
    this.addElements([
      this.nameInput.getElement(),
      this.colorInput.getElement(),
      this.updateButton.getElement(),
    ]);
    document.addEventListener('setSelectedElement', (event) => this.handleSelect((event as CustomEvent).detail));
    this.updateButton.getElement().addEventListener('click', () => this.updateCar(this.selectedId));
  }

  private handleSelect(data: SelectedCar): void {
    const {
      element, id, name, color,
    } = data;
    this.selectedCar = element;
    this.selectedId = id;
    this.nameInput.setValue(name);
    this.colorInput.setValue(color);
  }

  private updateCar(id: number | null): void {
    if (!this.selectedCar) {
      console.log('Select the car!');
      return;
    }
    if (id) {
      api.updateCar(id, this.nameInput.getValue(), this.colorInput.getValue())
        .then((data) => {
          const { name, color } = data;
          if (this.selectedCar) {
            const carNameElement = this.selectedCar.querySelector('.car-name');
            if (carNameElement) {
              carNameElement.textContent = name;
            }
            const carSvgElement = this.selectedCar.querySelector('path');
            if (carSvgElement) {
              carSvgElement.setAttribute('fill', color);
            }
          }
          console.log(`Car with ID ${id} updated: name = ${name}, color = ${color}`);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.nameInput.clearInput();
          this.colorInput.clearInput();
          this.selectedCar = undefined;
          this.selectedId = null;
        });
    }
  }
}
