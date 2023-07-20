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

export interface GeneratedCar {
  name: string;
  color: string;
}

export interface EngineParams {
  velocity: number,
  distance: number
}

export type ButtonTypes = 'reset' | 'submit' | 'button';

export type DriveStatus = 'started' | 'drive' | 'stopped';
