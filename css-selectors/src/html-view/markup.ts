import { Level } from '../utils/types';
import View from '../utils/view';

export default class Markup extends View {
  constructor() {
    super('div', ['sea']);
  }

  public updateContent(currentLevel: number, levels: Level[]): void {
    const currentLevelObj = levels.find((level) => level.number === currentLevel);
    if (currentLevelObj && this.element) {
      this.element.innerHTML = currentLevelObj.markup;
    }
  }
}
