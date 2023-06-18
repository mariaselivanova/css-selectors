import LevelsView from '../levels/levels-view';
import { levelsArray } from '../utils/levelsArray';

export default class Input {
  private element: HTMLInputElement;

  private levelsView: LevelsView;

  constructor(levelsView: LevelsView) {
    this.element = document.createElement('input');
    if (this.element) {
      this.element.type = 'text';
    }
    this.levelsView = levelsView;
    this.setListener();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private setListener(): void {
    this.element.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const currentLevel = this.levelsView.getSelectedLevel();
        const obj = levelsArray.find((item) => item.number === currentLevel);
        if (obj?.answer === this.element.value) {
          console.log('hooray');
        } else {
          console.log('oooops');
        }
      }
    });
  }
}
