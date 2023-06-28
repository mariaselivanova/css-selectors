import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import Levels from '../../levels/levels';
import InputView from '../../utils/input-view';
import './input.css';
import { setCorrectAnswerAnimation, setWrongAnswerAnimation } from '../../utils/animationUtils';

hljs.registerLanguage('css', css);

export default class Input extends InputView {
  private levels: Levels;

  constructor(levels: Levels) {
    super(['input', 'blink']);
    this.setInputType('text');
    this.setPlaceholder('Type in CSS selector');
    this.levels = levels;
    this.element?.setAttribute('maxlength', '40');
    this.element?.addEventListener('keyup', (e) => this.handleKeyUp(e));
    this.element?.addEventListener('input', () => {
      this.highlightCssCode();
    });
  }

  private highlightCssCode(): void {
    const cssCode = this.element?.value;
    const highlighter = document.querySelector('.css-code');
    if (highlighter instanceof HTMLElement && typeof cssCode === 'string') {
      highlighter.innerText = cssCode;
      highlighter.classList.add('hljs', 'css');
      hljs.highlightElement(highlighter);
    }
  }

  public clearInput(): void {
    const highlighter = document.querySelector('.css-code');
    if (this.element && highlighter instanceof HTMLElement) {
      highlighter.innerText = '';
      this.element.value = '';
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
