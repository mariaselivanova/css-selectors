import Levels from '../levels/levels';
import InputView from '../utils/input-view';
import { levelsArray } from '../utils/levelsArray';
import './input.css';

export default class Input extends InputView {
  private levels: Levels;

  constructor(levels: Levels) {
    super(['input']);
    this.setInputType('text');
    this.levels = levels;
    this.element?.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  public clearInput(): void {
    if (this.element) {
      this.element.value = '';
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const currentLevel = this.levels.getSelectedLevel();
      const currentLevelElement = this.levels.getSelectedLevelElement();
      const obj = levelsArray.find((item) => item.number === currentLevel);
      if (obj?.answer === this.element?.value) {
        this.levels.changeLevelStatus();
        this.levels.goToNextLevel();
        if (currentLevelElement) {
          const helpAttributeValue = currentLevelElement.getAttribute('data-help');
          if (helpAttributeValue === 'true') {
            currentLevelElement.classList.add('solved-with-help');
          }
        }
      } else {
        console.log('oooops');
        this.clearInput();
      }
    }
  }
}
