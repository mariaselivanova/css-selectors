/* eslint-disable class-methods-use-this */
import { ApiConfig, CarResponse } from './types';

const API_URL = 'http://127.0.0.1:3000/';

class Api {
  public headers: { [key: string]: string };

  constructor(config: ApiConfig) {
    this.headers = config.headers;
  }

  private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, options);
    return this.checkRes(res);
  }

  private async checkRes<T>(res: Response): Promise<T> {
    if (res.ok) {
      const totalCountHeader = res.headers.get('X-Total-Count');
      if (totalCountHeader) {
        this.headers['X-Total-Count'] = totalCountHeader;
      }
      return res.json();
    }
    const err = await res.json();
    throw new Error(err.message || 'Unknown Error');
  }

  public getAllCars(page: number | undefined, limit: number | undefined): Promise<CarResponse[]> {
    const queryParams = new URLSearchParams();
    if (page !== undefined) {
      queryParams.append('_page', page.toString());
    }
    if (limit !== undefined) {
      queryParams.append('_limit', limit.toString());
    }

    const queryString = queryParams.toString();
    const endpoint = `garage${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint, {
      method: 'GET',
    });
  }

  public removeCar(id: number): Promise<void> {
    return this.request(`garage/${id}`, {
      method: 'DELETE',
    });
  }

  public createCar(name: string, color: string): Promise<CarResponse> {
    const carData = { name, color };
    return this.request<CarResponse>('garage', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(carData),
    });
  }

  public updateCar(id: number, name: string, color: string): Promise<CarResponse> {
    const carData = {
      name,
      color,
    };

    return this.request<CarResponse>(`garage/${id}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(carData),
    });
  }

  public getCar(id: number): Promise<CarResponse> {
    return this.request(`garage/${id}`, {
      method: 'GET',
    });
  }
}

const api: Api = new Api({
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
