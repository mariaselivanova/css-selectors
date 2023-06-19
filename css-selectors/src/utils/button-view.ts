import View from './view';
import { ButtonTypes } from './types';

export default class ButtonView extends View {
  public element: HTMLButtonElement | undefined;

  constructor(classes: string[]) {
    super('button', classes);
  }

  public setButtonType(type: ButtonTypes): void {
    if (this.element) {
      this.element.type = type;
    }
  }
}
