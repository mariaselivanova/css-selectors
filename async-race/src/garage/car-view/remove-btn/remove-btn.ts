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
      console.log(`The car №${id} was removed`);
      document.dispatchEvent(new Event('carsUpdated'));
      await api.deleteWinner(id);
    } catch {
      console.log('no such car');
    }
  }
}
