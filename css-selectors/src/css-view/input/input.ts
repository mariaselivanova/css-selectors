import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import Levels from '../../levels/levels';
import InputView from '../../utils/input-view';
import './input.css';
import { setCorrectAnswerAnimation, setWrongAnswerAnimation } from '../../utils/animationUtils';
import CodeHighlighter from '../code-highlighter/code-highlighter';

hljs.registerLanguage('css', css);

export default class Input extends InputView {
  private levels: Levels;

  private codeHighlighter: CodeHighlighter;

  constructor(levels: Levels, codeHighlighter: CodeHighlighter) {
    super(['input', 'blink']);
    this.setInputType('text');
    this.setPlaceholder('Type in CSS selector');
    this.levels = levels;
    this.element?.setAttribute('maxlength', '40');
    this.element?.addEventListener('keyup', (e) => this.handleKeyUp(e));
    this.element?.addEventListener('input', () => {
      this.highlightCssCode();
    });
    this.codeHighlighter = codeHighlighter;
  }

  private highlightCssCode(): void {
    const cssCode = this.element?.value;
    if (typeof cssCode === 'string') {
      this.codeHighlighter.getElement().innerText = cssCode;
      this.codeHighlighter.getElement().classList.add('hljs', 'css');
      hljs.highlightElement(this.codeHighlighter.getElement());
    }
  }

  public clearInput(): void {
    if (this.element) {
      this.codeHighlighter.setTextContent('');
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
