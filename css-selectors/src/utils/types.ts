export interface Level {
  number: number;
  task: string;
  answers: string[];
  tagsArray: TagObj[];
}

interface TagObj {
  name: string;
  id: number;
  idAttribute: string | null;
  strobe: boolean;
  child: TagObj | null;
}

export type ButtonTypes = 'submit' | 'reset' | 'button';
