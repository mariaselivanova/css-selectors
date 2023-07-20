import ButtonView from '../../../utils/button-view';

export default class SelectBtn extends ButtonView {
  constructor(
    id: number,
    color: string,
    name: string,
    element: HTMLElement,
  ) {
    super(['select-btn'], 'button');
    this.setTextContent('select');
    this.element?.addEventListener('click', () => SelectBtn.setSelectedCar(id, color, name, element));
  }

  private static setSelectedCar(
    id: number,
    color: string,
    name: string,
    element: HTMLElement,
  ):void {
    document.dispatchEvent(new CustomEvent('setSelectedElement', {
      detail: {
        id, color, name, element,
      },
    }));
  }
}
