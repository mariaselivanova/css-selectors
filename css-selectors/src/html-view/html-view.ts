import { Level } from '../utils/types';
import View from '../utils/view';
import './html-view.css';

export default class HtmlView extends View {
  constructor() {
    super('section', ['html-view']);
  }

  public updateContent(level: number, levelsArr: Level[]):void {
    this.removeContent();
    const chosenLevel = levelsArr.find((item) => item.number === level);
    const el = document.createElement('p');
    if (chosenLevel) {
      el.textContent = chosenLevel.html;
    }
    this.element?.append(el);
  }
}
