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
    apiKey?: string;
    apiUrl?: string;
    sources?: string; 
    [key: string]: string | undefined;
}

export interface SourcesData {
    sources: NewsSource[];
    status: string;
}

export interface NewsData {
    articles: NewsObject[];
    totalResults: number;
}

export type FetchedData = SourcesData & NewsData;

export enum StatusCodes {
    Unauthorized = 401,
    NotFound = 404,
}

export enum Endpoints {
    Sources = 'sources',
    Everything = 'everything',
}