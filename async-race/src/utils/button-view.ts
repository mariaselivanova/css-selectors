import View from './view';
import { ButtonTypes } from './types';

export default class ButtonView extends View {
  public element: HTMLButtonElement | undefined;

  constructor(classes: string[], type: ButtonTypes) {
    super('button', classes);
    this.setButtonType(type);
  }

  public setButtonType(type: ButtonTypes): void {
    if (this.element) {
      this.element.type = type;
    }
  }
}
