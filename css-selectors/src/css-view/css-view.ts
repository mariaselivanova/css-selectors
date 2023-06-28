import './css-view.css';
import View from '../utils/view';

export default class CssView extends View {
  constructor() {
    super('section', ['css-view']);
    const cssHighlighter = new View('code', ['css-code']);
    const comment = new View('div', ['css-comment']);
    comment.getElement().innerHTML = `{
      <br>
      /* Styles would go here. */
     <br>
    }`;
    this.addElements([cssHighlighter.getElement(), comment.getElement()]);
  }
}
