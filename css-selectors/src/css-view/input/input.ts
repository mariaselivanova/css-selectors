import Levels from '../../levels/levels';
import InputView from '../../utils/input-view';
import './input.css';
import { setCorrectAnswerAnimation, setWrongAnswerAnimation } from '../../utils/animationUtils';

export default class Input extends InputView {
  private levels: Levels;

  constructor(levels: Levels) {
    super(['input', 'blink']);
    this.setInputType('text');
    this.setPlaceholder('Type in css selector');
    this.levels = levels;
    this.element?.setAttribute('maxlength', '40');
    this.element?.addEventListener('keyup', (e) => this.handleKeyUp(e));
    this.element?.addEventListener('input', () => {
      this.element?.classList.remove('blink');
      if (!this.element?.value) {
        this.element?.classList.add('blink');
      }
    });
  }

  public clearInput(): void {
    if (this.element) {
      this.element.value = '';
      this.element.classList.add('blink');
    }
  }

  public handleInput(): void {
    const answers = this.levels.getCorrectAnswers();
    if (answers.some((answer) => answer === this.element?.value)) {
      setCorrectAnswerAnimation();
      setTimeout(() => {
        this.levels.checkHelp();
        this.levels.changeLevelStatus();
        this.levels.goToNextLevel();
      }, 1000);
    } else {
      setWrongAnswerAnimation();
      this.clearInput();
    }
  }

  private handleKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.handleInput();
    }
  }
}
