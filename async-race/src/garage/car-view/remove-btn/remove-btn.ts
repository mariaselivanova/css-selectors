import ButtonView from '../../../utils/button-view';
import api from '../../../utils/api';
import CarCounter from '../../car-counter';

export default class RemoveBtn extends ButtonView {
  private counter: CarCounter;

  constructor(id: number, element: HTMLElement, counter: CarCounter) {
    super(['remove-btn'], 'button');
    this.setTextContent('remove');
    this.element?.addEventListener('click', () => this.deleteCar(id, element));
    this.counter = counter;
  }

  private deleteCar(id: number, element: HTMLElement):void {
    api.removeCar(id)
      .then(() => {
        element.remove();
        console.log(`the car №${id} was removed`);
        this.counter.updateCarCount(-1);
        document.dispatchEvent(new Event('carDeleted'));
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
