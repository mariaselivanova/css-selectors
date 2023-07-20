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

export interface SelectedCar {
  name: string,
  color: string,
  id: number,
  element: HTMLElement,
}

export type ButtonTypes = 'reset' | 'submit' | 'button';
