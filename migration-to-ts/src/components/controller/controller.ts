import AppLoader from './appLoader';
import { NewsData, SourcesData, Endpoints } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: <T extends SourcesData>(data: T) => void): void {
        super.getResp(
            {
                endpoint: Endpoints.Sources,
            },
            callback
        );
    }

    public getNews(e: Event, callback: <T extends NewsData>(data: T) => void): void {
        let { target } = e;
        const newsContainer = e.currentTarget;

        if (target instanceof HTMLElement && newsContainer instanceof HTMLElement) {
            const sourceItem = target.classList.contains('source__item');
            const sourceId = target.getAttribute('data-source-id');
            while (target !== newsContainer) {
                if (target && sourceItem) {
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
                if (target && target instanceof HTMLElement) {
                    target = target.parentNode;
                }
            }
        }
    }

}

export default AppController;