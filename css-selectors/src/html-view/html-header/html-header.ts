import HeaderView from '../../utils/code-editor-view/header-view/header-view';
import './html-header.css';

export default class HtmlHeader extends HeaderView {
  constructor() {
    super('html-editor', 'HTML Viewer', 'index.html');
    this.element?.classList.add('html-header');
  }
}
