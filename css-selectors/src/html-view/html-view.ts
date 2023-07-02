import hljs from 'highlight.js/lib/core';
import html from 'highlight.js/lib/languages/xml';
import { Level } from '../utils/types';
import View from '../utils/view';
import './html-view.css';
import HtmlHeader from './html-header/html-header';
import HtmlLineCounter from './html-line-counter/html-line-counter';
import { createTag } from './html-view-utils';
import BoardView from '../game-board/board';

hljs.registerLanguage('html', html);

export default class HtmlView extends View {
  private code: View;

  private board: BoardView;

  private tags: { [key: string]: HTMLElement[] };

  constructor(board: BoardView) {
    super('section', ['html-view']);
    this.tags = {};
    this.code = new View('code', ['code']);
    this.code.getElement().addEventListener('mouseover', (e) => this.handleTagMouseOver(e));
    this.code.getElement().addEventListener('mouseout', (e) => this.handleTagMouseOut(e));
    const header = new HtmlHeader();
    const htmlLineCounter = new HtmlLineCounter();
    this.board = board;
    this.addElements([
      header.getElement(),
      htmlLineCounter.getElement(),
      this.code.getElement()]);
  }

  public updateContent(level: number, levelsArr: Level[]): void {
    this.code.removeContent();
    this.tags = {};
    const openingDiv = new View('div', ['opening-div']);
    this.code.addElements([openingDiv.getElement()]);
    const closingDiv = new View('div', ['closing-div']);
    openingDiv.setTextContent('<div class="sea">');
    closingDiv.setTextContent('</div>');
    hljs.highlightElement(openingDiv.getElement());
    hljs.highlightElement(closingDiv.getElement());
    const chosenLevel = levelsArr.find((lev) => lev.number === level);
    if (chosenLevel) {
      chosenLevel.tagsArray.forEach((tag) => {
        if (!tag.child) {
          const newTag = createTag(
            `<${tag.name} ${tag.idAttribute ? `id='${tag.idAttribute}'` : ''} ${tag.classAttribute ? `class='${tag.classAttribute}'` : ''}/>`,
            ['inner-div'],
          );
          this.pushTagElement(tag.id, newTag.getElement());
          this.code.addElements([newTag.getElement()]);
        } else {
          const newOpenTag = createTag(
            `<${tag.name} ${tag.idAttribute ? `id='${tag.idAttribute}'` : ''}${tag.classAttribute ? `class='${tag.classAttribute}'` : ''}>`,
            ['inner-div'],
          );
          this.code.getElement().append(newOpenTag.getElement());
          this.pushTagElement(tag.id, newOpenTag.getElement());
          const newChildTag = createTag(
            `<${tag.child.name} ${tag.child.idAttribute ? `id='${tag.child.idAttribute}'` : ''}${tag.child.classAttribute ? `class='${tag.child.classAttribute}'` : ''}/>`,
            ['inner-div', 'inner-child-div'],
          );
          this.code.getElement().append(newChildTag.getElement());
          this.pushTagElement(tag.child.id, newChildTag.getElement());
          const newClosingTag = createTag(
            `</${tag.name}>`,
            ['inner-div'],
          );
          this.code.getElement().append(newClosingTag.getElement());
          this.pushTagElement(tag.id, newClosingTag.getElement());
        }
      });
    }
    const tagElements = Object.values(this.tags).flat();
    tagElements.forEach((element) => hljs.highlightElement(element));
    this.code.addElements([closingDiv.getElement()]);
  }

  private pushTagElement(tagId: number, element: HTMLElement): void {
    if (!this.tags[tagId]) {
      this.tags[tagId] = [];
    }
    this.tags[tagId].push(element);
  }

  private handleTagMouseOver(event: MouseEvent): void {
    const { target } = event;
    if (target instanceof HTMLElement) {
      const innerDiv = target.closest('.inner-div');
      const tagId = Object.keys(this.tags)
        .find((key) => this.tags[key].find((item) => item === innerDiv));
      if (tagId) {
        this.board.highlightImage(+tagId);
        const currElements = Object.values(this.tags).find(
          (item) => item.find((element) => element === innerDiv),
        );
        currElements?.forEach((element) => {
          element.classList.add('highlighted');
        });
      }
    }
  }

  private handleTagMouseOut(event: MouseEvent): void {
    const { target } = event;
    if (target instanceof HTMLElement) {
      const innerDiv = target.closest('.inner-div');
      const tagId = Object.keys(this.tags)
        .find((key) => this.tags[key].find((item) => item === innerDiv));
      if (tagId) {
        this.board.deleteImageHighlight(+tagId);
        const currElements = Object.values(this.tags).find(
          (item) => item.find((element) => element === innerDiv),
        );
        currElements?.forEach((element) => {
          element.classList.remove('highlighted');
        });
      }
    }
  }

  public highlightMarkupElement(id: number): void {
    const elements = this.tags[id];
    elements.forEach((element) => {
      element.classList.add('highlighted');
    });
  }

  public deleteMarkupHighlight(id: number): void {
    const elements = this.tags[id];
    elements.forEach((element) => {
      element.classList.remove('highlighted');
    });
  }
}
