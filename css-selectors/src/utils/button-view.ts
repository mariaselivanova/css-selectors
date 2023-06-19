import View from './view';
import { ButtonTypes } from './types';

export default class ButtonView extends View {
  constructor(classes: string[]) {
    super('button', classes);
  }

  public setButtonType(type: ButtonTypes): void {
    if (this.element instanceof HTMLButtonElement) {
      this.element.type = type;
    }
  }
}
