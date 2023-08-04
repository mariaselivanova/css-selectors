import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import './code-highlighter.css';
import View from '../../utils/view';
import { ElementTag } from '../../utils/types';

hljs.registerLanguage('css', css);

export default class CodeHighlighter extends View {
  constructor() {
    super(ElementTag.CODE, ['css-code-highlighter']);
  }

  public highlightCssCode(cssCode: string | null): void {
    if (this.element && cssCode) {
      this.element.innerHTML = hljs.highlight(cssCode, { language: 'css' }).value;
    }
  }
}
