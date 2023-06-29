import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';

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

export function highlightCssCode(cssCode: string | null): void {
  hljs.registerLanguage('css', css);
  const highlighter = document.querySelector('.css-code-highlighter');
  if (highlighter instanceof HTMLElement && cssCode) {
    highlighter.innerHTML = hljs.highlight('css', cssCode).value;
  }
}
