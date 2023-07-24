import api from '../../../utils/api';
import ButtonView from '../../../utils/button-view';

export default class SelectBtn extends ButtonView {
  constructor(id: number) {
    super(['select-btn'], 'button');
    this.setTextContent('select');
    this.element?.addEventListener('click', () => SelectBtn.setSelectedCar(id));
  }

  private static async setSelectedCar(id: number): Promise<void> {
    try {
      const carData = await api.getCar(id);
      console.log(`The car №${id} was updated`);
      document.dispatchEvent(new CustomEvent('carSelected', {
        detail: {
          id,
          color: carData.color,
          name: carData.name,
        },
      }));
    } catch (err) {
      console.error('Error selecting car:', err);
    }
  }
}
