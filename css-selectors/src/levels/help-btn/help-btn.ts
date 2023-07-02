import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import Input from '../../css-view/input/input';
import './help-btn.css';
import ButtonView from '../../utils/button-view';

hljs.registerLanguage('css', css);

export default class HelpBtn extends ButtonView {
  private input: Input;

  constructor(input: Input) {
    super(['help-btn']);
    this.setTextContent('help');
    this.setButtonType('button');
    this.input = input;
    this.element?.addEventListener('click', () => this.handleHelpBtn());
  }

  private handleHelpBtn(): void {
    const { levels, codeHighlighter } = this.input;
    levels.setHelpedStatus();
    const answer = levels.getCorrectAnswer();
    const input = this.input.getElement();
    if (input instanceof HTMLInputElement) {
      let i = 0;
      input.value = '';
      codeHighlighter.setTextContent('');
      const interval = setInterval(() => {
        input.value += answer[i];
        codeHighlighter.getElement().textContent += answer[i];
        codeHighlighter.highlightCssCode(codeHighlighter.getElement().textContent);
        i += 1;
        if (i === answer.length) {
          clearInterval(interval);
        }
      }, 150);
    }
  }
}
