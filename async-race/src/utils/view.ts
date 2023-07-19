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
      if (this.element) {
        this.element.classList.add(className);
      }
    });
  }

  public setTextContent(text: string):void {
    if (this.element) {
      this.element.textContent = text;
    }
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public addElements(children: HTMLElement[]):void {
    children.forEach((child) => this.element?.append(child));
  }

  public removeContent(): void {
    while (this.element?.firstChild) {
      this.element.firstChild.remove();
    }
  }
}
