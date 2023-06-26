import './css-header.css';
import View from '../../utils/view';

export default class CssHeader extends View {
  constructor() {
    super('div', ['css-header']);
    const cssEditor = new View('p', ['css-editor']);
    const cssPath = new View('p', ['css-path']);
    cssEditor.setTextContent('CSS Editor');
    cssPath.setTextContent('style.css');
    this.addElements([cssEditor.getElement(), cssPath.getElement()]);
  }
}
