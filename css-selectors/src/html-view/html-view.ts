import hljs from 'highlight.js/lib/core';
import html from 'highlight.js/lib/languages/xml';
import { Level } from '../utils/types';
import View from '../utils/view';
import './html-view.css';
import HtmlHeader from './html-header/html-header';
import HtmlLineCounter from './html-line-counter/html-line-counter';
import { handleTagMouseOver, handleTagMouseOut, createTag } from './html-view-utils';

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
    openingDiv.setTextContent('<div class="sea">');
    closingDiv.setTextContent('</div>');
    hljs.highlightElement(openingDiv.getElement());
    hljs.highlightElement(closingDiv.getElement());
    const tagElements: HTMLElement[] = [];
    const chosenLevel = levelsArr.find((lev) => lev.number === level);
    if (chosenLevel) {
      chosenLevel.tagsArray.forEach((tag) => {
        if (!tag.child) {
          const newTag = createTag(
            `<${tag.name} ${tag.idAttribute ? `id='${tag.idAttribute}'` : ''} ${tag.classAttribute ? `class='${tag.classAttribute}'` : ''}/>`,
            ['inner-div'],
            tag.id,
          );
          tagElements.push(newTag.getElement());
        } else {
          const newOpenTag = createTag(
            `<${tag.name} ${tag.idAttribute ? `id='${tag.idAttribute}'` : ''}${tag.classAttribute ? `class='${tag.classAttribute}'` : ''}>`,
            ['inner-div'],
            tag.id,
          );
          const newChildTag = createTag(
            `<${tag.child.name} ${tag.child.idAttribute ? `id='${tag.child.idAttribute}'` : ''}${tag.child.classAttribute ? `class='${tag.child.classAttribute}'` : ''}/>`,
            ['inner-div', 'inner-child-div'],
            tag.child.id,
          );
          const newClosingTag = createTag(
            `</${tag.name}>`,
            ['inner-div'],
            tag.id,
          );
          tagElements.push(
            newOpenTag.getElement(),
            newChildTag.getElement(),
            newClosingTag.getElement(),
          );
        }
      });
    }
    tagElements.forEach((element) => {
      hljs.highlightElement(element);
    });
    this.code.addElements([openingDiv.getElement(), ...tagElements, closingDiv.getElement()]);
  }
}
