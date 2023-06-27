import './board.css';
import { Level, TagObj } from '../utils/types';
import View from '../utils/view';
import { highlightMarkupElement, deleteMarkupHighlight } from '../utils/highlightUtils';

export default class BoardView extends View {
  constructor() {
    super('section', ['game-board']);
  }

  private updateStaticContent(): { task: HTMLElement, imagesContainer: View } {
    const task = document.createElement('p');
    const imagesContainer = new View('div', ['images-container']);
    this.element?.append(task, imagesContainer.getElement());
    return { task, imagesContainer };
  }

  private static createImageDiv(tag: TagObj): { wrapper: HTMLElement, imageElement: HTMLElement } {
    const wrapper = document.createElement('div');
    const span = document.createElement('span');
    span.textContent = `<${tag.name}${tag.idAttribute ? ` id='${tag.idAttribute}'` : ''}></${tag.name}>`;
    const className = tag.idAttribute ? tag.idAttribute : tag.name;
    const image = new View('div', [className, 'image']);
    const imageElement = image.getElement();
    imageElement.setAttribute('data-id', `${tag.id}`);
    if (tag.strobe) {
      image.getElement().classList.add('strobe');
    }
    wrapper.append(imageElement, span);
    return { wrapper, imageElement };
  }

  public updateContent(level: number, levelsArr: Level[]):void {
    this.removeContent();
    const { task, imagesContainer } = this.updateStaticContent();
    imagesContainer.getElement().addEventListener('mouseover', BoardView.handleTagMouseOver);
    imagesContainer.getElement().addEventListener('mouseout', BoardView.handleTagMouseOut);
    const selectedLevel = levelsArr.find((lev) => lev.number === level);
    if (selectedLevel) {
      task.textContent = selectedLevel.task;

      selectedLevel.tagsArray.forEach((tag) => {
        const { wrapper, imageElement } = BoardView.createImageDiv(tag);

        if (tag.child) {
          const {
            wrapper: innerWrapper,
            imageElement: innerImageElement,
          } = BoardView.createImageDiv(tag.child);

          innerImageElement.classList.add('child');
          imageElement.classList.add('parent');
          wrapper.append(innerWrapper);
        }
        imagesContainer.getElement().append(wrapper);
      });
    }
  }

  private static handleTagMouseOver = (event: MouseEvent): void => {
    const { target } = event;
    if (target instanceof HTMLElement) {
      const tagId = target.getAttribute('data-id');
      if (tagId) {
        target.classList.add('hovered');
        highlightMarkupElement(+tagId);
      }
    }
  };

  private static handleTagMouseOut = (event: MouseEvent): void => {
    const { target } = event;
    if (target instanceof HTMLElement) {
      const tagId = target.getAttribute('data-id');
      if (tagId) {
        target.classList.remove('hovered');
        deleteMarkupHighlight(+tagId);
      }
    }
  };
}
