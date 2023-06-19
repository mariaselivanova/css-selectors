import Input from '../input/input';
import Levels from '../levels/levels';
import View from '../utils/view';
import { levelsArray } from '../utils/levelsArray';
import './help-btn.css';

export default class HelpBtn extends View {
  private input: Input;

  private levels: Levels;

  constructor(levels: Levels, input: Input) {
    super('button', ['help-btn']);
    this.setTextContent('HELP');
    this.levels = levels;
    this.input = input;
    this.element.addEventListener('click', () => this.handleHelpBtn());
  }

  private handleHelpBtn(): void {
    const currentLevelElement = this.levels.getSelectedLevelElement();
    if (currentLevelElement) {
      currentLevelElement.setAttribute('data-help', 'true');
    }
    const levelObject = levelsArray.find((item) => item.number === this.levels.getSelectedLevel());
    if (levelObject) {
      const { answer } = levelObject;
      const input = this.input.getElement();
      if (input instanceof HTMLInputElement) {
        input.value = answer;
      }
    }
  }
}
