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
  const span = document.createElement('span');
  span.classList.add('span');
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
