export default class View {
  public element: HTMLElement;

  constructor(tag: string, classes: string[]) {
    this.element = View.createElement(tag);
    this.addClasses(classes);
  }

  private static createElement(tag: string): HTMLElement {
    const el = document.createElement(tag);
    return el;
  }

  private addClasses(classes: string[]): void {
    classes.forEach((className) => {
      this.element.classList.add(className);
    });
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
