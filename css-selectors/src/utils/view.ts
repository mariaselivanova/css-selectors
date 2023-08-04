import { ElementTag } from './types';

export default class View {
  public element: HTMLElement | undefined;

  private tag: ElementTag;

  constructor(tag: ElementTag, classes: string[]) {
    this.element = View.createElement(tag);
    this.addClasses(classes);
    this.tag = tag;
  }

  private static createElement(tag: ElementTag): HTMLElement {
    return document.createElement(tag);
  }

  private addClasses(classes: string[]): void {
    if (this.element) {
      this.element.classList.add(...classes);
    }
  }

  public setTextContent(text: string): void {
    if (this.element) {
      this.element.textContent = text;
    }
  }

  public getElement(): HTMLElement {
    return this.element || document.createElement(this.tag);
  }

  public addElements(children: HTMLElement[]): void {
    children.forEach((child) => this.element?.append(child));
  }

  public removeContent(): void {
    while (this.element?.firstChild) {
      this.element.firstChild.remove();
    }
  }
}
