import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import Input from '../../css-view/input/input';
import Levels from '../levels';
import './help-btn.css';
import ButtonView from '../../utils/button-view';
import { highlightCssCode } from '../../utils/highlightUtils';
import CodeHighlighter from '../../css-view/code-highlighter/code-highlighter';

hljs.registerLanguage('css', css);

export default class HelpBtn extends ButtonView {
  private input: Input;

  private levels: Levels;

  private codeHighlighter: CodeHighlighter;

  constructor(levels: Levels, input: Input, codeHighlighter: CodeHighlighter) {
    super(['help-btn']);
    this.setTextContent('help');
    this.setButtonType('button');
    this.levels = levels;
    this.input = input;
    this.element?.addEventListener('click', () => this.handleHelpBtn());
    this.codeHighlighter = codeHighlighter;
  }

  private handleHelpBtn(): void {
    this.levels.setHelpedStatus();
    const answers = this.levels.getCorrectAnswers();
    const input = this.input.getElement();
    if (input instanceof HTMLInputElement) {
      let i = 0;
      input.value = '';
      this.codeHighlighter.setTextContent('');
      const interval = setInterval(() => {
        input.value += answers[0][i];
        this.codeHighlighter.getElement().textContent += answers[0][i];
        highlightCssCode(this.codeHighlighter.getElement().textContent);
        i += 1;
        if (i === answers[0].length) {
          clearInterval(interval);
        }
      }, 150);
    }
  }
}
