import { ElementTag } from '../../types';
import View from '../../view';
import './header-view.css';

export default class HeaderView extends View {
  constructor(
    editorClass: string,
    editorContent: string,
    pathContent: string,
    className: string,
  ) {
    super(ElementTag.DIV, ['header', className]);
    const editor = new View(ElementTag.PARAGRAPH, [editorClass]);
    const path = new View(ElementTag.PARAGRAPH, ['path']);
    editor.setTextContent(editorContent);
    path.setTextContent(pathContent);
    this.addElements([editor.getElement(), path.getElement()]);
  }
}
