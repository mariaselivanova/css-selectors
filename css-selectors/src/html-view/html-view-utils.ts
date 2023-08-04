import { ElementTag, TagObj } from '../utils/types';
import View from '../utils/view';

export function createTag(textContent: string, classes: string[]): View {
  const tag = new View(ElementTag.DIV, ['inner-div', ...classes]);
  tag.setTextContent(textContent);
  return tag;
}

export const getTag = (tag: TagObj, isOpenTag: boolean): string => {
  const tagId = tag.idAttribute ? ` id='${tag.idAttribute}'` : '';
  const tagClass = tag.classAttribute ? ` class='${tag.classAttribute}'` : '';
  return isOpenTag ? `<${tag.name}${tagId}${tagClass}>` : `<${tag.name}${tagId}${tagClass}/>`;
};
