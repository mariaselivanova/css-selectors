import { Level } from '../utils/types';
import View from '../utils/view';
import './html-view.css';
import HtmlHeader from './html-header/html-header';
import HtmlLineCounter from './html-line-counter/html-line-counter';
import { handleTagMouseOver, handleTagMouseOut } from './html-view-utils';

export default class HtmlView extends View {
  private code: View;

  constructor() {
    super('section', ['html-view']);
    this.code = new View('div', ['code']);
    this.code.getElement().addEventListener('mouseover', handleTagMouseOver);
    this.code.getElement().addEventListener('mouseout', handleTagMouseOut);
    const header = new HtmlHeader();
    const htmlLineCounter = new HtmlLineCounter();
    this.addElements([
      header.getElement(),
      htmlLineCounter.getElement(),
      this.code.getElement()]);
  }

  public updateContent(level: number, levelsArr: Level[]): void {
    this.code.removeContent();
    const openingDiv = new View('div', ['opening-div']);
    const closingDiv = new View('div', ['closing-div']);
    openingDiv.setTextContent('<div class = "sky">');
    closingDiv.setTextContent('</div>');
    const tagElements: HTMLElement[] = [];
    const chosenLevel = levelsArr.find((lev) => lev.number === level);
    if (chosenLevel) {
      chosenLevel.tagsArray.forEach((tag) => {
        const newTag = new View('div', ['inner-div']);
        if (!tag.child) {
          newTag.setTextContent(`<${tag.name} ${tag.idAttribute ? `id='${tag.idAttribute}'` : ''} />`);
        } else {
          const newChildTag = new View('div', ['inner-child-div']);
          newChildTag.setTextContent(`<${tag.child.name} ${tag.child.idAttribute ? `id='${tag.child.idAttribute}'` : ''} />`);
          newChildTag.getElement().setAttribute('data-markupid', `${tag.child.id}`);
          newTag.getElement().classList.add('parent-tag');
          newTag.getElement().innerHTML = `
          &lt;${tag.name} ${tag.idAttribute ? `id='${tag.idAttribute}'` : ''}&gt;
          ${newChildTag.getElement().outerHTML}
          &lt;/${tag.name}&gt;
        `;
        }
        const newTagElement = newTag.getElement();
        newTagElement.setAttribute('data-markupid', `${tag.id}`);
        tagElements.push(newTag.getElement());
      });
    }
    this.code.addElements([openingDiv.getElement(), ...tagElements, closingDiv.getElement()]);
  }
}
