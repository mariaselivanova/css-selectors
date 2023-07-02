import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import './code-highlighter.css';
import View from '../../utils/view';

hljs.registerLanguage('css', css);

export default class CodeHighlighter extends View {
  constructor() {
    super('code', ['css-code-highlighter']);
  }

  public highlightCssCode(cssCode: string | null): void {
    if (this.element && cssCode) {
      this.element.innerHTML = hljs.highlight(cssCode, { language: 'css' }).value;
    }
  }
}
