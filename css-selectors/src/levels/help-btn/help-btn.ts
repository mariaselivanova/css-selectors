import Input from '../../css-view/input/input';
import Levels from '../levels';
import './help-btn.css';
import ButtonView from '../../utils/button-view';

export default class HelpBtn extends ButtonView {
  private input: Input;

  private levels: Levels;

  constructor(levels: Levels, input: Input) {
    super(['help-btn']);
    this.setTextContent('help');
    this.setButtonType('button');
    this.levels = levels;
    this.input = input;
    this.element?.addEventListener('click', () => this.handleHelpBtn());
  }

  private handleHelpBtn(): void {
    const highlighter = document.querySelector('.css-code');
    this.levels.setHelpedStatus();
    const answers = this.levels.getCorrectAnswers();
    const input = this.input.getElement();
    if (input instanceof HTMLInputElement && highlighter instanceof HTMLElement) {
      let i = 0;
      input.value = '';
      highlighter.textContent = '';
      const interval = setInterval(() => {
        input.value += answers[0][i];
        highlighter.textContent += answers[0][i];
        i += 1;
        if (i === answers[0].length) {
          clearInterval(interval);
        }
      }, 150);
    }
  }
}
