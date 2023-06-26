import { Level } from '../utils/types';
import View from '../utils/view';
import './html-view.css';
import { highlightImage, deleteImageHighlight } from '../utils/highlightUtils';

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
        const newTag = new View('div', ['inner-div']);
        newTag.setTextContent(`<${tag.name} />`);
        const newTagElement = newTag.getElement();
        newTagElement.setAttribute('data-markupID', `${tag.id}`);

        newTagElement.addEventListener('mouseover', () => {
          highlightImage(tag.id, tag.name);
        });
        newTagElement.addEventListener('mouseout', () => {
          deleteImageHighlight(tag.id);
        });

        tagElements.push(newTag.getElement());
      });
    }
    this.addElements([openingDiv.getElement(), ...tagElements, closingDiv.getElement()]);
  }

  public static highlightElement(id: number):void {
    const element = document.querySelector(`[data-markupID="${id}"]`);
    if (element) {
      element.classList.add('highlighted');
    }
  }

  public static deleteHighlight(id: number):void {
    const element = document.querySelector(`[data-markupID="${id}"]`);
    if (element) {
      element.classList.remove('highlighted');
    }
  }
}
