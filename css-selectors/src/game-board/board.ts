import './board.css';
import { Level } from '../utils/types';
import View from '../utils/view';

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
        const image = new View(tag, [tag, 'image']);
        const imageElement = image.getElement();
        imageElement.addEventListener('mouseover', () => {
          const className = image.getElement().classList[0];
          image.getElement().setAttribute('data-tag', `<${className}/>`);
        });
        imageElement.addEventListener('mouseout', () => {
          image.getElement().removeAttribute('data-tag');
        });
        imagesContainer.getElement().append(imageElement);
      });
    }
    this.element?.append(task, imagesContainer.getElement());
  }
}
