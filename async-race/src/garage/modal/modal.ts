import View from '../../utils/view';
import './modal.css';

export default class Modal extends View {
  constructor(text: string) {
    super('div', ['modal']);
    this.init(text);
  }

  private init(text: string): void {
    const textEl = new View('p', ['modal-text']);
    textEl.setTextContent(text);
    this.addElements([textEl.getElement()]);
  }
}
