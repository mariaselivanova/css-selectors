import Input from '../input/input';
import Levels from '../levels/levels';
import { levelsArray } from '../utils/levelsArray';
import './help-btn.css';
import ButtonView from '../utils/button-view';

export default class HelpBtn extends ButtonView {
  private input: Input;

  private levels: Levels;

  constructor(levels: Levels, input: Input) {
    super(['help-btn']);
    this.setTextContent('HELP');
    this.setButtonType('button');
    this.levels = levels;
    this.input = input;
    this.element?.addEventListener('click', () => this.handleHelpBtn());
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
        let i = 0;
        const interval = setInterval(() => {
          input.value += answer[i];
          i += 1;
          if (i === answer.length) {
            clearInterval(interval);
          }
        }, 150);
      }
    }
  }
}
