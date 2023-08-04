import { ElementTag } from './types';
import View from './view';

export default class InputView extends View {
  public element: HTMLInputElement | undefined;

  constructor(classes: string[]) {
    super(ElementTag.INPUT, classes);
    this.setInputType('text');
  }

  public setInputType(type: string): void {
    if (this.element) {
      this.element.type = type;
    }
  }

  public setPlaceholder(text: string): void {
    if (this.element) {
      this.element.placeholder = text;
    }
  }

  public clearInput(): void {
    if (this.element) {
      this.element.value = '';
    }
  }
}
