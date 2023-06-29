import { highlightImage, deleteImageHighlight } from '../utils/highlightUtils';
import View from '../utils/view';

export function handleTagMouseOver(event: MouseEvent): void {
  const { target } = event;
  if (target instanceof HTMLElement) {
    const innerDiv = target.closest('.inner-div');
    const tagId = innerDiv?.getAttribute('data-markupid');
    if (tagId) {
      highlightImage(+tagId);
      const elements = document.querySelectorAll(`[data-markupid="${tagId}"]`);
      elements.forEach((element) => {
        element.classList.add('highlighted');
      });
    }
  }
}

export function handleTagMouseOut(event: MouseEvent): void {
  const { target } = event;
  if (target instanceof HTMLElement) {
    const innerDiv = target.closest('.inner-div');
    const tagId = innerDiv?.getAttribute('data-markupid');
    if (tagId) {
      deleteImageHighlight(+tagId);
      const elements = document.querySelectorAll(`[data-markupid="${tagId}"]`);
      elements.forEach((element) => {
        element.classList.remove('highlighted');
      });
    }
  }
}

export function createTag(textContent: string, classes: string[], id:number):View {
  const tag = new View('div', [...classes]);
  tag.setTextContent(textContent);
  tag.getElement().setAttribute('data-markupid', `${id}`);
  return tag;
}
