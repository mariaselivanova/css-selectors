/* eslint-disable max-lines-per-function */
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
        if (tag.child) {
          image.getElement().classList.add('parent');
          const innerClassName = tag.child.idAttribute ? tag.child.idAttribute : tag.child.name;
          const innerImage = new View('div', [innerClassName, 'image']);
          innerImage.getElement().classList.add('child');
          if (tag.child.strobe) {
            innerImage.getElement().classList.add('strobe');
          }
          innerImage.getElement().addEventListener('mouseover', () => {
            innerImage.getElement().classList.add('hovered');
            if (tag.child) {
              highlightMarkupElement(tag.child.id);
            }
          });
          innerImage.getElement().addEventListener('mouseout', () => {
            innerImage.getElement().classList.remove('hovered');
            if (tag.child) {
              deleteMarkupHighlight(tag.child.id);
            }
          });
          innerImage.getElement().setAttribute('data-id', `${tag.child.id}`);
          const innerWrapper = document.createElement('div');
          const innerSpan = document.createElement('span');
          innerSpan.textContent = `<${tag.child.name}${tag.child.idAttribute ? ` id='${tag.child.idAttribute}'` : ''}></${tag.child.name}>`;
          innerWrapper.append(innerImage.getElement(), innerSpan);
          wrapper.append(innerWrapper);
        }
        const span = document.createElement('span');
        span.textContent = `<${tag.name}${tag.idAttribute ? ` id='${tag.idAttribute}'` : ''}></${tag.name}>`;
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
