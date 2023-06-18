export default class View {
  public element: HTMLElement;

  constructor(tag: string, classes: string[]) {
    this.element = View.createElement(tag);
    this.addClasses(classes);
  }

  private static createElement(tag: string): HTMLElement {
    return document.createElement(tag);
  }

  private addClasses(classes: string[]): void {
    classes.forEach((className) => {
      this.element.classList.add(className);
    });
  }

  public setTextContent(text: string):void {
    this.element.textContent = text;
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
