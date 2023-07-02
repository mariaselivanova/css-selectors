import { Level } from '../utils/types';
import View from '../utils/view';

export default class Markup extends View {
  constructor() {
    super('div', ['sea']);
  }

  public updateContent(chosenLevelObj: Level): void {
    if (this.element) {
      this.element.innerHTML = chosenLevelObj.markup;
    }
  }
}
