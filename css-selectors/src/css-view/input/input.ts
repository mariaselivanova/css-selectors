import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import Levels from '../../levels/levels';
import InputView from '../../utils/input-view';
import './input.css';
import { setCorrectAnswerAnimation, setWrongAnswerAnimation } from '../../utils/animationUtils';
import CodeHighlighter from '../code-highlighter/code-highlighter';
import Markup from '../../html-view/markup';

hljs.registerLanguage('css', css);
const MAX_INPUT_LENGTH = '25';

export default class Input extends InputView {
  private levels: Levels;

  private markup: Markup;

  private codeHighlighter: CodeHighlighter;

  constructor(levels: Levels, codeHighlighter: CodeHighlighter, markup: Markup) {
    super(['input', 'blink']);
    this.setInputType('text');
    this.setPlaceholder('Type in CSS selector');
    this.levels = levels;
    this.markup = markup;
    this.element?.setAttribute('maxlength', MAX_INPUT_LENGTH);
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

  private static isValidSelector(selector: string): boolean {
    try {
      document.querySelector(selector);
      return true;
    } catch (error) {
      return false;
    }
  }

  public handleInput(): void {
    const correctItems = this.markup.getElement().querySelectorAll(this.levels.getCorrectAnswer());
    const inputValue = this.element?.value;

    if (inputValue) {
      if (!Input.isValidSelector(inputValue)) {
        this.handleWrongAnswer();
        return;
      }

      const selectedItems = this.markup.getElement().querySelectorAll(inputValue);
      const correctArr = Array.from(correctItems).map((item) => item.outerHTML);
      const selectedArr = Array.from(selectedItems).map((item) => item.outerHTML);

      if (correctArr.join('') === selectedArr.join('')) {
        setCorrectAnswerAnimation();
        setTimeout(() => {
          this.levels.checkHelp();
          this.levels.changeLevelStatus();
          this.levels.goToNextLevel();
        }, 1000);
      } else {
        this.handleWrongAnswer();
      }
    }
  }

  private handleWrongAnswer():void {
    setWrongAnswerAnimation();
    this.clearInput();
  }

  private handleKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.handleInput();
    }
  }
}
