export function highlightMarkupElement(id: number): void {
  const elements = document.querySelectorAll(`[data-markupid="${id}"]`);
  elements.forEach((element) => {
    element.classList.add('highlighted');
  });
}

export function deleteMarkupHighlight(id: number): void {
  const elements = document.querySelectorAll(`[data-markupid="${id}"]`);
  elements.forEach((element) => {
    element.classList.remove('highlighted');
  });
}

export function highlightImage(id: number): void {
  const element = document.querySelector(`[data-id="${id}"]`);
  if (element) {
    element.classList.add('hovered');
  }
}

export function deleteImageHighlight(id: number): void {
  const element = document.querySelector(`[data-id="${id}"]`);
  if (element) {
    element.classList.remove('hovered');
  }
}
