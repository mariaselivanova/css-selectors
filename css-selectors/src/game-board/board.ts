import './board.css';
import { Level } from '../utils/types';
import View from '../utils/view';
import { handleImageMouseOver, handleImageMouseOut, createImageDiv } from './board-utils';

export default class BoardView extends View {
  private task: HTMLElement;

  private imagesContainer: View;

  constructor() {
    super('section', ['game-board']);
    this.task = document.createElement('p');
    this.imagesContainer = new View('div', ['images-container']);
    this.imagesContainer.getElement().addEventListener('mouseover', handleImageMouseOver);
    this.imagesContainer.getElement().addEventListener('mouseout', handleImageMouseOut);
    this.element?.append(this.task, this.imagesContainer.getElement());
  }

  public updateContent(level: number, levelsArr: Level[]):void {
    this.imagesContainer.removeContent();
    const selectedLevel = levelsArr.find((lev) => lev.number === level);
    if (selectedLevel) {
      this.task.textContent = selectedLevel.task;
      selectedLevel.tagsArray.forEach((tag) => {
        const { wrapper, imageElement } = createImageDiv(tag);

        if (tag.child) {
          const {
            wrapper: innerWrapper,
            imageElement: innerImageElement,
          } = createImageDiv(tag.child);

          innerImageElement.classList.add('child');
          imageElement.classList.add('parent');
          wrapper.append(innerWrapper);
        }
        this.imagesContainer.getElement().append(wrapper);
      });
    }
  }
}
