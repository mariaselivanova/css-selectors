import ButtonView from '../../../utils/button-view';
import api from '../../../utils/api';

export default class RemoveBtn extends ButtonView {
  constructor(id: number) {
    super(['remove-btn'], 'button');
    this.setTextContent('remove');
    this.element?.addEventListener('click', () => RemoveBtn.deleteCar(id));
  }

  private static deleteCar(id: number):void {
    api.removeCar(id)
      .then(() => {
        console.log(`the car №${id} was removed`);
        document.dispatchEvent(new Event('carsUpdated'));
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
