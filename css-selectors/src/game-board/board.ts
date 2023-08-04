import './board.css';
import { Level } from '../utils/types';
import View from '../utils/view';
import { createImageDiv } from './board-utils';
import { ANIMATION_DELAY } from '../utils/constants';

export default class BoardView extends View {
  public task: HTMLElement;

  private images: Record<string, HTMLElement>;

  public imagesContainer: View;

  private highlightMarkup: ((id: number) => void) | undefined;

  private deleteMarkupHighlight: ((id: number) => void) | undefined;

  constructor() {
    super('section', ['game-board']);
    this.images = {};
    this.task = document.createElement('p');
    this.imagesContainer = new View('div', ['images-container']);
    this.imagesContainer.getElement().addEventListener('mouseover', (e) => this.handleImageMouseOver(e));
    this.imagesContainer.getElement().addEventListener('mouseout', (e) => this.handleImageMouseOut(e));
    this.element?.append(this.task, this.imagesContainer.getElement());
  }

  public onMouseOver(callback: (id: number) => void): void {
    this.highlightMarkup = callback;
  }

  public onMouseOut(callback: (id: number) => void): void {
    this.deleteMarkupHighlight = callback;
  }

  public updateContent(chosenLevelObj: Level): void {
    this.imagesContainer.removeContent();
    this.images = {};
    this.task.textContent = chosenLevelObj.task;
    chosenLevelObj.tagsArray.forEach((tag) => {
      const { wrapperElement, imageElement } = createImageDiv(tag);
      this.images[tag.id] = imageElement;
      if (tag.child) {
        const {
          wrapperElement: innerWrapper,
          imageElement: innerImageElement,
        } = createImageDiv(tag.child);
        this.images[tag.child.id] = innerImageElement;
        innerImageElement.classList.add('child');
        imageElement.classList.add('parent');
        wrapperElement.append(innerWrapper);
      }
      this.imagesContainer.getElement().append(wrapperElement);
    });
  }

  public handleWin(): void {
    this.imagesContainer.removeContent();
    this.task.textContent = 'YOU WON!';
  }

  private handleImageMouseOver(event: MouseEvent): void {
    const { target } = event;
    if (target instanceof HTMLElement) {
      const tagId = Object.keys(this.images).find((key) => this.images[key] === target);
      if (tagId) {
        target.classList.add('hovered');
        if (this.highlightMarkup) {
          this.highlightMarkup(+tagId);
        }
      }
    }
  }

  private handleImageMouseOut(event: MouseEvent): void {
    const { target } = event;
    if (target instanceof HTMLElement) {
      const tagId = Object.keys(this.images).find((key) => this.images[key] === target);
      if (tagId) {
        target.classList.remove('hovered');
        if (this.deleteMarkupHighlight) {
          this.deleteMarkupHighlight(+tagId);
        }
      }
    }
  }

  public setCorrectAnswerAnimation(): void {
    Object.values(this.images).forEach((image) => {
      image.classList.remove('strobe');
      image.classList.add('fade-out');
      setTimeout(() => {
        image.classList.remove('fade-out');
      }, ANIMATION_DELAY);
    });
  }

  public setWrongAnswerAnimation(): void {
    Object.values(this.images).forEach((image) => {
      image.classList.add('shake');
      setTimeout(() => {
        image.classList.remove('shake');
      }, ANIMATION_DELAY);
    });
  }

  public highlightImage(id: number): void {
    const targetElement = this.images[id];
    if (targetElement) {
      targetElement.classList.add('hovered');
    }
  }

  public deleteImageHighlight(id: number): void {
    const targetElement = this.images[id];
    if (targetElement) {
      targetElement.classList.remove('hovered');
    }
  }
}
