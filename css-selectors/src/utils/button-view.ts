import View from './view';
import { ButtonTypes, ElementTag } from './types';

export default class ButtonView extends View {
  public element: HTMLButtonElement | undefined;

  constructor(classes: string[]) {
    super(ElementTag.BUTTON, classes);
  }

  public setButtonType(type: ButtonTypes): void {
    if (this.element) {
      this.element.type = type;
    }
  }
}
