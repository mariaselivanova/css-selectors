import HeaderView from '../../utils/code-editor-view/header-view/header-view';
import './css-header.css';

export default class CssHeader extends HeaderView {
  constructor() {
    super('css-editor', 'CSS Editor', 'style.css', 'css-header');
  }
}
