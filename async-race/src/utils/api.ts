/* eslint-disable class-methods-use-this */
import { ApiConfig, CarResponse } from './types';

const API_URL = 'http://127.0.0.1:3000/';

class Api {
  private headers: { [key: string]: string };

  constructor(config: ApiConfig) {
    this.headers = config.headers;
  }

  private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, options);
    return this.checkRes(res);
  }

  private async checkRes<T>(res: Response): Promise<T> {
    if (res.ok) {
      return res.json();
    }
    const err = await res.json();
    throw new Error(err.message || 'Unknown Error');
  }

  public getAllCars(): Promise<CarResponse[]> {
    return this.request('garage', {
      method: 'GET',
      headers: this.headers,
    });
  }
}

const api: Api = new Api({
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
