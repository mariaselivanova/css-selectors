import { highlightImage, deleteImageHighlight } from '../utils/highlightUtils';

export function handleTagMouseOver(event: MouseEvent): void {
  const { target } = event;
  if (target instanceof HTMLElement) {
    const tagId = target.getAttribute('data-markupid');
    if (tagId) {
      highlightImage(+tagId);
      target.classList.add('highlighted');
    }
  }
}

export function handleTagMouseOut(event: MouseEvent): void {
  const { target } = event;
  if (target instanceof HTMLElement) {
    const tagId = target.getAttribute('data-markupid');
    if (tagId) {
      deleteImageHighlight(+tagId);
      target.classList.remove('highlighted');
    }
  }
}
