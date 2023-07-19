import ButtonView from '../../../utils/button-view';
import api from '../../../utils/api';

export default class RemoveBtn extends ButtonView {
  constructor(id: number, element: HTMLElement) {
    super(['remove-btn'], 'button');
    this.setTextContent('remove');
    this.element?.addEventListener('click', () => RemoveBtn.deleteCar(id, element));
  }

  private static deleteCar(id: number, element: HTMLElement):void {
    api.removeCar(id)
      .then(() => {
        element.remove();
        console.log(`the car №${id} was removed`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
