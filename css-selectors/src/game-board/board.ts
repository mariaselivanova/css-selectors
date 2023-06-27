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
        const className = tag.idAttribute ? tag.idAttribute : tag.name;
        const image = new View('div', [className, 'image']);
        if (tag.strobe) {
          image.getElement().classList.add('strobe');
        }
        const imageElement = image.getElement();
        imageElement.setAttribute('data-id', `${tag.id}`);
        const wrapper = document.createElement('div');
        const span = document.createElement('span');
        span.textContent = `<${tag.name} ${tag.idAttribute ? `id='${tag.idAttribute}'` : ''}></${tag.name}>`;
        wrapper.append(imageElement, span);
        imageElement.addEventListener('mouseover', () => {
          imageElement.classList.add('hovered');
          highlightMarkupElement(tag.id);
        });
        imageElement.addEventListener('mouseout', () => {
          imageElement.classList.remove('hovered');

          deleteMarkupHighlight(tag.id);
        });
        imagesContainer.getElement().append(wrapper);
      });
    }
    this.element?.append(task, imagesContainer.getElement());
  }
}
