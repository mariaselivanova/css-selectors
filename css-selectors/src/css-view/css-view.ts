import './css-view.css';
import View from '../utils/view';

export default class CssView extends View {
  constructor() {
    super('section', ['css-view']);
    const comment = new View('div', ['css-comment']);
    comment.getElement().innerHTML = `{
      <br>
      /* Styles would go here. */
     <br>
    }`;
    this.addElements([comment.getElement()]);
  }
}
