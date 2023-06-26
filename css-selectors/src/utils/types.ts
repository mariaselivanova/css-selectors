export interface Level {
  name: string;
  number: number;
  task: string;
  answer: string;
  html: string;
  tagsArray: string[];
}

export type ButtonTypes = 'submit' | 'reset' | 'button';
