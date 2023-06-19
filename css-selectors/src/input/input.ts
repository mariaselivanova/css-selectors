import Levels from '../levels/levels';
import { levelsArray } from '../utils/levelsArray';
import View from '../utils/view';
import './input.css';

export default class Input extends View {
  private levels: Levels;

  constructor(levels: Levels) {
    super('input', ['input']);
    if (this.element instanceof HTMLInputElement) {
      this.element.type = 'text';
    }
    this.levels = levels;
    this.element.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  public clearInput(): void {
    if (this.element instanceof HTMLInputElement) {
      this.element.value = '';
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const currentLevel = this.levels.getSelectedLevel();
      const obj = levelsArray.find((item) => item.number === currentLevel);
      if (this.element instanceof HTMLInputElement) {
        if (obj?.answer === this.element.value) {
          this.levels.changeLevelStatus();
          this.levels.goToNextLevel();
          this.clearInput();
        } else {
          console.log('oooops');
          this.clearInput();
        }
      }
    }
  }
}
