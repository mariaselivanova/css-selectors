import AppLoader from './appLoader';
import { NewsData, SourcesData, Endpoints, Callback } from '../../types';

class AppController extends AppLoader {
  public getSources(callback: Callback<SourcesData>): void {
    super.getResp(
      {
        endpoint: Endpoints.Sources,
      },
      callback
    );
  }

  public getNews(e: Event, callback: Callback<NewsData>): void {
    let { target } = e;
    const newsContainer = e.currentTarget;

    if (target instanceof HTMLElement && newsContainer instanceof HTMLElement) {
      const sourceItem = target.classList.contains('source__item');
      const sourceId = target.getAttribute('data-source-id');
      while (target !== newsContainer) {
        if (sourceItem) {
          if (typeof sourceId === 'string') {
            if (newsContainer.getAttribute('data-source') !== sourceId) {
              newsContainer.setAttribute('data-source', sourceId);
              super.getResp(
                {
                  endpoint: Endpoints.Everything,
                  options: {
                    sources: sourceId,
                  },
                },
                callback
              );
            }
          }
          return;
        }
        if (target instanceof HTMLElement) {
          target = target.parentNode;
        }
      }
    }
  }
}

export default AppController;
