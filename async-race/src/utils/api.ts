/* eslint-disable class-methods-use-this */
import {
  ApiConfig,
  CarResponse,
  DriveStatus,
  EngineParams,
  PossibleQueryParams,
  SortOptions,
  SortOrder,
  WinnerResponse,
} from './types';

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
    throw new Error(err.message);
  }

  public getAllCars(page: number | undefined, limit: number | undefined): Promise<CarResponse[]> {
    const endpoint = `garage${this.getQueryString({ page, limit })}`;
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
    return this.request('garage', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(carData),
    });
  }

  public updateCar(id: number, name: string, color: string): Promise<CarResponse> {
    const carData = { name, color };
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

  public handleEngine(id: number, status: DriveStatus): Promise<EngineParams> {
    const endpoint = `engine${this.getQueryString({ id, status })}`;
    return this.request(endpoint, {
      method: 'PATCH',
    });
  }

  public createWinner(id: number, wins: number, time: number): Promise<WinnerResponse> {
    const winnerData = { id, wins, time };
    return this.request('winners', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(winnerData),
    });
  }

  public getWinner(id: number): Promise<WinnerResponse> {
    return this.request(`winners/${id}`, {
      method: 'GET',
    });
  }

  public getWinners(
    page: number | undefined,
    limit: number | undefined,
    sort: SortOptions | undefined,
    order: SortOrder | undefined,
  )
    : Promise<WinnerResponse[]> {
    const endpoint = `winners${this.getQueryString({
      page, limit, sort, order,
    })}`;
    return this.request(endpoint, {
      method: 'GET',
    });
  }

  public updateWinner(id: number, wins: number, time: number): Promise<WinnerResponse> {
    const newWinnerData = { wins, time };
    return this.request(`winners/${id}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(newWinnerData),
    });
  }

  public deleteWinner(id: number): Promise<void> {
    return this.request(`winners/${id}`, {
      method: 'DELETE',
    });
  }

  private getQueryString({
    id, status, page, limit, sort, order,
  }: PossibleQueryParams): string {
    const queryParams = new URLSearchParams();
    if (id !== undefined) {
      queryParams.append('id', id.toString());
    }
    if (status !== undefined) {
      queryParams.append('status', status.toString());
    }
    if (page) {
      queryParams.append('_page', page.toString());
    }
    if (limit) {
      queryParams.append('_limit', limit.toString());
    }
    if (sort) {
      queryParams.append('_sort', sort.toString());
    }
    if (order) {
      queryParams.append('_order', order.toString());
    }

    const queryString = queryParams.toString();

    return queryString ? `?${queryString}` : '';
  }
}

const api: Api = new Api({
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;