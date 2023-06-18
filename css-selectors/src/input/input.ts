import LevelsView from '../levels/levels-view';
import { levelsArray } from '../utils/levelsArray';
import View from '../utils/view';

export default class Input extends View {
  private levelsView: LevelsView;

  constructor(levelsView: LevelsView) {
    super('input', ['input']);
    if (this.element instanceof HTMLInputElement) {
      this.element.type = 'text';
    }
    this.levelsView = levelsView;
    this.setListener();
  }

  private setListener(): void {
    this.element.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const currentLevel = this.levelsView.getSelectedLevel();
        const obj = levelsArray.find((item) => item.number === currentLevel);
        if (this.element instanceof HTMLInputElement) {
          if (obj?.answer === this.element.value) {
            console.log('hooray');
          } else {
            console.log('oooops');
          }
        }
      }
    });
  }
}
