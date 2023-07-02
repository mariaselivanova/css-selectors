import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import Levels from '../../levels/levels';
import InputView from '../../utils/input-view';
import './input.css';
import CodeHighlighter from '../code-highlighter/code-highlighter';

hljs.registerLanguage('css', css);
const MAX_INPUT_LENGTH = '30';

export default class Input extends InputView {
  public levels: Levels;

  public codeHighlighter: CodeHighlighter;

  constructor(levels: Levels, codeHighlighter: CodeHighlighter) {
    super(['input', 'blink']);
    this.setInputType('text');
    this.setPlaceholder('Type in CSS selector');
    this.levels = levels;
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
    const correctItems = this.levels.getSelectedElements(this.levels.getCorrectAnswer());
    const inputValue = this.element?.value;

    if (inputValue) {
      if (!Input.isValidSelector(inputValue)) {
        this.levels.handleWrongAnswer();
        return;
      }

      const selectedItems = this.levels.getSelectedElements(inputValue);
      const correctArr = Array.from(correctItems).map((item) => item.outerHTML);
      const selectedArr = Array.from(selectedItems).map((item) => item.outerHTML);

      if (correctArr.join('') === selectedArr.join('')) {
        this.levels.handleCorrectAnswer();
      } else {
        this.levels.handleWrongAnswer();
      }
    }
  }

  private handleKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.handleInput();
    }
  }
}
