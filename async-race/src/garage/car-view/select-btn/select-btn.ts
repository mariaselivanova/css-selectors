import api from '../../../utils/api';
import ButtonView from '../../../utils/button-view';

export default class SelectBtn extends ButtonView {
  constructor(id: number) {
    super(['select-btn'], 'button');
    this.setTextContent('select');
    this.element?.addEventListener('click', () => SelectBtn.setSelectedCar(id));
  }

  private static setSelectedCar(id: number):void {
    api.getCar(id)
      .then((carData) => {
        document.dispatchEvent(new CustomEvent('setSelectedElement', {
          detail: {
            id, color: carData.color, name: carData.name,
          },
        }));
      })
      .catch((err) => console.log(err));
  }
}
