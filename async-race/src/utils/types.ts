export interface ApiConfig {
  headers: {
    [key: string]: string;
  };
}

export interface CarResponse {
  name: string,
  color: string,
  id: number,
}

export type ButtonTypes = 'reset' | 'submit' | 'button';
