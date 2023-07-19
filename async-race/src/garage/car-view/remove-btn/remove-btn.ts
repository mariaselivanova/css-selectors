import ButtonView from '../../../utils/button-view';
import api from '../../../utils/api';

export default class RemoveBtn extends ButtonView {
  private carCounterCallback: (num: number) => void;

  constructor(id: number, element: HTMLElement, carCounterCallback: (num: number) => void) {
    super(['remove-btn'], 'button');
    this.setTextContent('remove');
    this.element?.addEventListener('click', () => this.deleteCar(id, element));
    this.carCounterCallback = carCounterCallback;
  }

  private deleteCar(id: number, element: HTMLElement):void {
    api.removeCar(id)
      .then(() => {
        element.remove();
        this.carCounterCallback(-1);
        console.log(`the car №${id} was removed`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
