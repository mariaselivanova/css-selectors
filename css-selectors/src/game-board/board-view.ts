import './board.css';
import { Level } from '../utils/types';

export default class BoardView {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('section');
    this.addClasses(['game-board']);
  }

  private addClasses(classes: string[]): void {
    classes.forEach((className) => {
      this.element.classList.add(className);
    });
  }

  public setContent(level: number, arr: Level[]): void {
    while (this.element.firstChild) {
      this.element.firstChild.remove();
    }
    const obj = arr.find((item) => item.number === level);
    const el = document.createElement('p');
    if (obj) {
      el.textContent = obj.task;
    }
    this.element.append(el);
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
