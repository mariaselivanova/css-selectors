import ButtonView from '../../../utils/button-view';
import api from '../../../utils/api';

export default class RemoveBtn extends ButtonView {
  constructor(id: number) {
    super(['remove-btn'], 'button');
    this.setTextContent('remove');
    this.element?.addEventListener('click', () => RemoveBtn.deleteCar(id));
  }

  private static async deleteCar(id: number): Promise<void> {
    try {
      await api.removeCar(id);
      await api.deleteWinner(id);
      console.log(`the car №${id} was removed`);
      document.dispatchEvent(new Event('carsUpdated'));
    } catch (err) {
      console.log(err);
    }
  }
}
