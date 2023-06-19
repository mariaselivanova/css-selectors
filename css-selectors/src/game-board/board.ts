import './board.css';
import { Level } from '../utils/types';
import View from '../utils/view';

export default class BoardView extends View {
  constructor() {
    super('section', ['game-board']);
  }

  public setContent(level: number, levelsArr: Level[]): void {
    while (this.element.firstChild) {
      this.element.firstChild.remove();
    }
    const chosenLevel = levelsArr.find((item) => item.number === level);
    const el = document.createElement('p');
    if (chosenLevel) {
      el.textContent = chosenLevel.task;
    }
    this.element.append(el);
  }
}
