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
  distance: number,
  success: true,
}

export interface WinnerResponse {
  id: number,
  wins: number,
  time: number,
}

export enum SortOptions {
  time = 'time',
  wins = 'wins',
}

export enum SortOrder {
  asc = 'ASC',
  desc = 'DESC',
}

export type ButtonTypes = 'reset' | 'submit' | 'button';

export type DriveStatus = 'started' | 'drive' | 'stopped';

export type PossibleQueryParams = {
  id?: number;
  status?: DriveStatus;
  page?: number;
  limit?: number;
  sort?: SortOptions;
  order?: SortOrder;
};
