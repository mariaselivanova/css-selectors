import { TagObj } from '../utils/types';
import View from '../utils/view';

export function createImageDiv(tag: TagObj): {
  wrapperElement: HTMLElement, imageElement: HTMLElement } {
  const wrapper = new View('div', ['image-wrapper']);
  const span = new View('span', ['span']);
  const image = new View('div', [tag.imageClassname, 'image']);
  span.getElement().textContent = `<${tag.name}${tag.idAttribute ? ` id='${tag.idAttribute}'` : ''}${tag.classAttribute ? ` class='${tag.classAttribute}'` : ''}></${tag.name}>`;
  const wrapperElement = wrapper.getElement();
  const imageElement = image.getElement();
  if (tag.strobe) {
    image.getElement().classList.add('strobe');
  }
  wrapper.getElement().append(imageElement, span.getElement());
  return { wrapperElement, imageElement };
}
