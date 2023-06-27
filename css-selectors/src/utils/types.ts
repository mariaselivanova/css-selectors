export interface Level {
  number: number;
  task: string;
  answer: string;
  tagsArray: TagObj[];
}

interface TagObj {
  name: string,
  id: number,
  idAttribute: string | null,
}

export type ButtonTypes = 'submit' | 'reset' | 'button';
