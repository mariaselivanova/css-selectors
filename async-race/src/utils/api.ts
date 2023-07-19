/* eslint-disable class-methods-use-this */
import { ApiConfig, CarResponse } from './types';

const API_URL = 'http://127.0.0.1:3000';

class Api {
  private headers: { [key: string]: string };

  constructor(config: ApiConfig) {
    this.headers = config.headers;
  }

  private request(endpoint: string, options: RequestInit): Promise<Response> {
    return fetch(`${API_URL}${endpoint}`, options).then(this.checkRes.bind(this));
  }

  private checkRes(res: Response): Promise<Response> {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => Promise.reject(new Error(err.message || 'Unknown Error')));
  }

  public getAllCars(): Promise<CarResponse[]> {
    return this.request('garage', {
      method: 'GET',
      headers: this.headers,
    }).then((response: Response) => response.json());
  }

  public getCar(id: number): Promise<CarResponse> {
    return this.request(`garage/${id}`, {
      method: 'GET',
      headers: this.headers,
    }).then((response: Response) => response.json());
  }
}

const api: Api = new Api({
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
