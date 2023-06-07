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
  
  export interface NewsData {
    articles: NewsObject[];
    status: string;
    totalResults: number;
}

export interface SourceData {
    sources: NewsSource[];
    status: string;
}