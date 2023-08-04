import hljs from 'highlight.js/lib/core';
import html from 'highlight.js/lib/languages/xml';
import { ElementTag, Level, TagObj } from '../utils/types';
import View from '../utils/view';
import './html-view.css';
import HtmlHeader from './html-header/html-header';
import HtmlLineCounter from './html-line-counter/html-line-counter';
import { createTag, getTag } from './html-view-utils';

hljs.registerLanguage('html', html);

export default class HtmlView extends View {
  private code: View;

  private tags: Record<string, HTMLElement[]>;

  private highlightImage: ((id: number) => void) | undefined;

  private deleteImageHighlight: ((id: number) => void) | undefined;

  constructor() {
    super(ElementTag.SECTION, ['html-view']);
    this.tags = {};
    this.code = new View(ElementTag.CODE, ['code']);
    this.code.getElement().addEventListener('mouseover', (e) => this.handleTagMouseOver(e));
    this.code.getElement().addEventListener('mouseout', (e) => this.handleTagMouseOut(e));
    const header = new HtmlHeader();
    const htmlLineCounter = new HtmlLineCounter();
    this.addElements([
      header.getElement(),
      htmlLineCounter.getElement(),
      this.code.getElement()]);
  }

  public updateContent(chosenLevelObj: Level): void {
    this.code.removeContent();
    this.tags = {};
    const openingDiv = HtmlView.createDiv(['opening-div'], '<div class="sea">');
    const closingDiv = HtmlView.createDiv(['closing-div'], '</div>');
    this.code.addElements([openingDiv]);
    hljs.highlightElement(openingDiv);
    hljs.highlightElement(closingDiv);
    chosenLevelObj.tagsArray.forEach((tag) => {
      this.processTag(tag, []);
    });
    Object.values(this.tags).flat().forEach((element) => hljs.highlightElement(element));
    this.code.addElements([closingDiv]);
  }

  private static createDiv(classes: string[], text: string): HTMLElement {
    const div = new View(ElementTag.DIV, classes);
    div.setTextContent(text);
    return div.getElement();
  }

  private processTag(tag: TagObj, classes: string[]): void {
    if (!tag.child) {
      const newTag = createTag(getTag(tag, false), [...classes]);
      this.pushTagElement(tag.id, newTag.getElement());
      this.code.addElements([newTag.getElement()]);
    } else {
      const newOpenTag = createTag(getTag(tag, true), []);
      this.pushTagElement(tag.id, newOpenTag.getElement());
      this.code.addElements([newOpenTag.getElement()]);
      if (Array.isArray(tag.child)) {
        tag.child.forEach((childTag) => {
          this.processTag(childTag, ['inner-child-div']);
        });
      } else {
        this.processTag(tag.child, ['inner-child-div']);
      }
      const newClosingTag = createTag(`</${tag.name}>`, []);
      this.code.addElements([newClosingTag.getElement()]);
      this.pushTagElement(tag.id, newClosingTag.getElement());
    }
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
      if (innerDiv instanceof HTMLElement) {
        const tagId = Object.keys(this.tags).find((key) => this.tags[key].includes(innerDiv));
        if (tagId) {
          if (this.highlightImage) {
            this.highlightImage(+tagId);
          }
          this.tags[tagId]?.forEach((element) => {
            element.classList.add('highlighted');
          });
        }
      }
    }
  }

  private handleTagMouseOut(event: MouseEvent): void {
    const { target } = event;
    if (target instanceof HTMLElement) {
      const innerDiv = target.closest('.inner-div');
      if (innerDiv instanceof HTMLElement) {
        const tagId = Object.keys(this.tags).find((key) => this.tags[key].includes(innerDiv));
        if (tagId) {
          if (this.deleteImageHighlight) {
            this.deleteImageHighlight(+tagId);
          }
          this.tags[tagId]?.forEach((element) => {
            element.classList.remove('highlighted');
          });
        }
      }
    }
  }

  public highlightMarkupElement(id: number): void {
    this.tags[id].forEach((element) => {
      element.classList.add('highlighted');
    });
  }

  public deleteMarkupHighlight(id: number): void {
    this.tags[id].forEach((element) => {
      element.classList.remove('highlighted');
    });
  }

  public onMouseOver(callback: (id: number) => void): void {
    this.highlightImage = callback;
  }

  public onMouseOut(callback: (id: number) => void): void {
    this.deleteImageHighlight = callback;
  }
}
