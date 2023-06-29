import hljs from 'highlight.js/lib/core';
import html from 'highlight.js/lib/languages/xml';
import { Level } from '../utils/types';
import View from '../utils/view';
import './html-view.css';
import HtmlHeader from './html-header/html-header';
import HtmlLineCounter from './html-line-counter/html-line-counter';
import { handleTagMouseOver, handleTagMouseOut } from './html-view-utils';

hljs.registerLanguage('html', html);

export default class HtmlView extends View {
  private code: View;

  constructor() {
    super('section', ['html-view']);
    this.code = new View('code', ['code']);
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
    hljs.highlightElement(openingDiv.getElement());
    hljs.highlightElement(closingDiv.getElement());
    const tagElements: HTMLElement[] = [];
    const chosenLevel = levelsArr.find((lev) => lev.number === level);
    if (chosenLevel) {
      chosenLevel.tagsArray.forEach((tag) => {
        if (!tag.child) {
          const newTag = new View('div', ['inner-div']);
          newTag.setTextContent(`<${tag.name} ${tag.idAttribute ? `id='${tag.idAttribute}'` : ''} />`);
          newTag.getElement().setAttribute('data-markupid', `${tag.id}`);
          tagElements.push(newTag.getElement());
        } else {
          const newOpenTag = new View('div', ['inner-div']);
          newOpenTag.setTextContent(`<${tag.name} ${tag.idAttribute ? `id='${tag.idAttribute}'` : ''}>`);
          newOpenTag.getElement().setAttribute('data-markupid', `${tag.id}`);
          tagElements.push(newOpenTag.getElement());

          const newChildTag = new View('div', ['inner-div', 'inner-child-div']);
          newChildTag.setTextContent(`<${tag.child.name} ${tag.child.idAttribute ? `id = '${tag.child.idAttribute}'` : ''} />`);
          newChildTag.getElement().setAttribute('data-markupid', `${tag.child.id}`);
          tagElements.push(newChildTag.getElement());

          const newClosingTag = new View('div', ['inner-div']);
          newClosingTag.setTextContent(`</${tag.name}>`);
          newClosingTag.getElement().setAttribute('data-markupid', `${tag.id}`);
          tagElements.push(newClosingTag.getElement());
        }
      });
    }
    tagElements.forEach((element) => {
      hljs.highlightElement(element);
    });
    this.code.addElements([openingDiv.getElement(), ...tagElements, closingDiv.getElement()]);
  }
}
