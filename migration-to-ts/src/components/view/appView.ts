import News from './news/news';
import Sources from './sources/sources';
import { NewsData, NewsObject, NewsSource} from '../../types';

export class AppView {
    private news: News;

    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

  public drawNews(data: NewsData):void {
        const values: NewsObject[]  = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

   public drawSources(data: NewsData):void {
        const values: NewsSource[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
