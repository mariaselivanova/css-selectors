export function highlightMarkupElement(id: number):void {
  const element = document.querySelector(`[data-markupid="${id}"]`);
  if (element) {
    element.classList.add('highlighted');
  }
}

export function deleteMarkupHighlight(id: number):void {
  const element = document.querySelector(`[data-markupid="${id}"]`);
  if (element) {
    element.classList.remove('highlighted');
  }
}

export function highlightImage(id: number, name: string):void {
  const element = document.querySelector(`[data-id="${id}"]`);
  if (element) {
    element.classList.add('highlighted-img');
    element.setAttribute('data-tag', `<${name}></${name}>`);
  }
}

export function deleteImageHighlight(id: number):void {
  const element = document.querySelector(`[data-id="${id}"]`);
  if (element) {
    element.removeAttribute('data-tag');
    element.classList.remove('highlighted-img');
  }
}
