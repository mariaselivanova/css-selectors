import View from '../../view';
import './header-view.css';

export default class HeaderView extends View {
  constructor(
    editorClass: string,
    editorContent: string,
    pathContent: string,
    className: string,
  ) {
    super('div', ['header', className]);
    const editor = new View('p', [editorClass]);
    const path = new View('p', ['path']);
    editor.setTextContent(editorContent);
    path.setTextContent(pathContent);
    this.addElements([editor.getElement(), path.getElement()]);
  }
}