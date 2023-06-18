import './levels.css';
import { levelsArray } from '../utils/levelsArray';
import { Level } from '../utils/types';

export default class LevelsView {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('section');
    this.addClasses(['levels-table']);
    this.addInnerHtml(levelsArray);
  }

  private addClasses(classes: string[]): void {
    classes.forEach((className) => {
      this.element.classList.add(className);
    });
  }

  private addInnerHtml(array: Level[]):void {
    array.forEach((obj: Level) => {
      const link = document.createElement('a');
      link.classList.add('level-link');
      link.textContent = `${obj.number} level`;
      this.element.append(link);
    });
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
