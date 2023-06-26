import { Level } from '../utils/types';
import View from '../utils/view';
import './html-view.css';

export default class HtmlView extends View {
  constructor() {
    super('section', ['html-view']);
  }

  public updateContent(level: number, levelsArr: Level[]):void {
    this.removeContent();
    const openingDiv = new View('div', ['opening-div']);
    const closingDiv = new View('div', ['closing-div']);
    closingDiv.setTextContent('</div>');
    openingDiv.setTextContent('<div class = "sky">');
    const tagElements: HTMLElement[] = [];
    const chosenLevel = levelsArr.find((item) => item.number === level);
    if (chosenLevel) {
      chosenLevel.tagsArray.forEach((tag) => {
        const newTag = document.createElement('div');
        newTag.textContent = `<${tag} />`;
        tagElements.push(newTag);
      });
    }
    this.addElements([openingDiv.getElement(), ...tagElements, closingDiv.getElement()]);
  }
}
