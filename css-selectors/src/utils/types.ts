export interface Level {
  name: string;
  number: number;
  task: string;
  answer: string;
  html: string;
  tagsArray: TagObj[];
}

interface TagObj {
  name: string,
  id: number,
}

export type ButtonTypes = 'submit' | 'reset' | 'button';
