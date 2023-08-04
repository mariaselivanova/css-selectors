import './css-view.css';
import View from '../utils/view';
import { ElementTag } from '../utils/types';

export default class CssView extends View {
  constructor() {
    super(ElementTag.SECTION, ['css-view']);
    const comment = new View(ElementTag.DIV, ['css-comment']);
    comment.getElement().innerHTML = `{
      <br>
      /* Styles would go here. */
     <br>
    }`;
    this.addElements([comment.getElement()]);
  }
}
