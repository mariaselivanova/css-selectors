import View from '../utils/view';

export function createTag(textContent: string, classes: string[]):View {
  const tag = new View('div', ['inner-div', ...classes]);
  tag.setTextContent(textContent);
  return tag;
}