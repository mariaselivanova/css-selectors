import View from './view';

export default class InputView extends View {
  public element: HTMLInputElement | undefined;

  constructor(classes: string[], inputType: string) {
    super('input', classes);
    this.setInputType(inputType);
  }

  public setInputType(type: string): void {
    if (this.element) {
      this.element.type = type;
    }
  }

  public getValue(): string {
    return this.element?.value || '';
  }

  public setValue(value: string): void {
    if (this.element) {
      this.element.value = value;
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
