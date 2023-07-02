import { highlightMarkupElement, deleteMarkupHighlight } from '../utils/highlightUtils';
import { TagObj } from '../utils/types';
import View from '../utils/view';

export function handleImageMouseOver(event: MouseEvent): void {
  const { target } = event;
  if (target instanceof HTMLElement) {
    const tagId = target.getAttribute('data-id');
    if (tagId) {
      target.classList.add('hovered');
      highlightMarkupElement(+tagId);
    }
  }
}

export function handleImageMouseOut(event: MouseEvent): void {
  const { target } = event;
  if (target instanceof HTMLElement) {
    const tagId = target.getAttribute('data-id');
    if (tagId) {
      target.classList.remove('hovered');
      deleteMarkupHighlight(+tagId);
    }
  }
}

export function createImageDiv(tag: TagObj): { wrapper: HTMLElement, imageElement: HTMLElement } {
  const wrapper = document.createElement('div');
  wrapper.classList.add('image-wrapper');
  const span = document.createElement('span');
  span.classList.add('span');
  span.textContent = `<${tag.name}${tag.idAttribute ? ` id='${tag.idAttribute}'` : ''}${tag.classAttribute ? ` class='${tag.classAttribute}'` : ''}></${tag.name}>`;
  const image = new View('div', [tag.imageClassname, 'image']);
  const imageElement = image.getElement();
  imageElement.setAttribute('data-id', `${tag.id}`);
  if (tag.strobe) {
    image.getElement().classList.add('strobe');
  }
  wrapper.append(imageElement, span);
  return { wrapper, imageElement };
}
