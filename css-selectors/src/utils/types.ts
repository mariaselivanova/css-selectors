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

export type ButtonTypes = 'submit' | 'reset' | 'button';
