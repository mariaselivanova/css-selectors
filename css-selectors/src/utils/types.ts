export interface Level {
  number: number;
  task: string;
  tagsArray: TagObj[];
  markup: string;
  selector: string;
}

export interface TagObj {
  name: string;
  id: number;
  idAttribute: string | null;
  classAttribute: string | null;
  strobe: boolean;
  imageClassname: string;
  child: TagObj | null;
}

export enum ElementTag {
  DIV = 'div',
  BUTTON = 'button',
  INPUT = 'input',
  SECTION = 'section',
  CODE = 'code',
  PARAGRAPH = 'p',
  LINK = 'a',
  FOOTER = 'footer',
  SPAN = 'span',
}

export type ButtonTypes = 'submit' | 'reset' | 'button';
