import View from './view';

export default class InputView extends View {
  public element: HTMLInputElement | undefined;

  constructor(classes: string[]) {
    super('input', classes);
    this.setInputType('text');
  }

  public setInputType(type: string): void {
    if (this.element) {
      this.element.type = type;
    }
  }

  public clearInput(): void {
    if (this.element) {
      this.element.value = '';
    }
  }
}
