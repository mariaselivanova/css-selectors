import './board.css';
import { Level } from '../utils/types';
import View from '../utils/view';
import { highlightMarkupElement, deleteMarkupHighlight } from '../utils/highlightUtils';

export default class BoardView extends View {
  constructor() {
    super('section', ['game-board']);
  }

  public updateContent(level: number, levelsArr: Level[]):void {
    this.removeContent();
    const chosenLevel = levelsArr.find((item) => item.number === level);
    const task = document.createElement('p');
    const imagesContainer = new View('div', ['images-container']);
    if (chosenLevel) {
      task.textContent = chosenLevel.task;
      chosenLevel.tagsArray.forEach((tag) => {
        const image = new View('div', [tag.name, 'image']);
        const imageElement = image.getElement();
        imageElement.setAttribute('data-id', `${tag.id}`);
        imageElement.addEventListener('mouseover', () => {
          imageElement.setAttribute('data-tag', `<${tag.name}></${tag.name}>`);
          highlightMarkupElement(tag.id);
        });
        imageElement.addEventListener('mouseout', () => {
          imageElement.removeAttribute('data-tag');
          deleteMarkupHighlight(tag.id);
        });
        imagesContainer.getElement().append(imageElement);
      });
    }
    this.element?.append(task, imagesContainer.getElement());
  }
}
