import { Level } from '../utils/types';
import View from '../utils/view';
import './html-view.css';
import { highlightImage, deleteImageHighlight } from '../utils/highlightUtils';
import HtmlHeader from './html-header/html-header';
import HtmlLineCounter from './html-line-counter/html-line-counter';

export default class HtmlView extends View {
  constructor() {
    super('section', ['html-view']);
  }

  private addStaticContent(): { code: View, openingDiv: View, closingDiv: View } {
    const header = new HtmlHeader();
    const htmlLineCounter = new HtmlLineCounter();
    const code = new View('div', ['code']);
    const openingDiv = new View('div', ['opening-div']);
    const closingDiv = new View('div', ['closing-div']);
    openingDiv.setTextContent('<div class = "sky">');
    closingDiv.setTextContent('</div>');
    this.addElements([header.getElement(), htmlLineCounter.getElement(), code.getElement()]);
    return { code, openingDiv, closingDiv };
  }

  public updateContent(level: number, levelsArr: Level[]): void {
    this.removeContent();
    const { code, openingDiv, closingDiv } = this.addStaticContent();
    code.getElement().addEventListener('mouseover', HtmlView.handleTagMouseOver);
    code.getElement().addEventListener('mouseout', HtmlView.handleTagMouseOut);
    const tagElements: HTMLElement[] = [];
    const chosenLevel = levelsArr.find((item) => item.number === level);
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
    code.addElements(
      [openingDiv.getElement(), ...tagElements, closingDiv.getElement()],
    );
  }

  private static handleTagMouseOver = (event: MouseEvent): void => {
    const { target } = event;
    if (target instanceof HTMLElement) {
      const tagId = target.getAttribute('data-markupid');
      if (tagId) {
        highlightImage(+tagId);
        target.classList.add('highlighted');
      }
    }
  };

  private static handleTagMouseOut = (event: MouseEvent): void => {
    const { target } = event;
    if (target instanceof HTMLElement) {
      const tagId = target.getAttribute('data-markupid');
      if (tagId) {
        deleteImageHighlight(+tagId);
        target.classList.remove('highlighted');
      }
    }
  };
}
