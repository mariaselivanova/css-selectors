export interface NewsObject {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}

export interface NewsSource {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
}

export interface Options {
  apiKey: string;
}

export interface ResponseOptions {
  sources: string;
  [key: string]: string | undefined;
}

export interface FetchedData {
  articles: NewsObject[];
  totalResults: number;
  status: string;
  sources: NewsSource[];
}

export type NewsData = Pick<FetchedData, 'articles' | 'totalResults' | 'status'>;
export type SourcesData = Pick<FetchedData, 'sources' | 'status'>;

export enum StatusCodes {
  OK = 200,
  BadRequest = 400,
  TooManyRequests = 429,
  ServerError = 500,
  Unauthorized = 401,
  NotFound = 404,
}

export enum Endpoints {
  Sources = 'sources',
  Everything = 'everything',
}

export function mergeObject<T extends object, R extends object>(a: T, b: R): T & R {
  return { ...a, ...b };
}

export type RequestType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
