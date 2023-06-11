import './news.css';
import { NewsObject } from '../../../types';

class News {
    public draw = (data: NewsObject[]): void => {
        const news = data.length >= 10 ? data.filter((_item: NewsObject, idx: number) => idx < 10) : data;
        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        if (newsItemTemp) {
            news.forEach((item, idx) => {
                const newsClone = newsItemTemp.content.cloneNode(true);
                if (newsClone instanceof DocumentFragment) {
                    if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

                    const metaPhoto: HTMLElement | null  = newsClone.querySelector('.news__meta-photo');
                    if (metaPhoto) {
                        metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                    }
                    const metaAuthor: HTMLElement | null = newsClone.querySelector('.news__meta-author');
                    if (metaAuthor) {
                        metaAuthor.textContent = item.author || item.source.name;
                    }
                    const metaDate: HTMLElement | null  = newsClone.querySelector('.news__meta-date');
                    if (metaDate) {
                        metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                    }
                    const descriptionTitle: HTMLElement | null  = newsClone.querySelector('.news__description-title');
                    if (descriptionTitle) {
                        descriptionTitle.textContent = item.title;
                    }
                    const descriptionSource: HTMLElement | null  = newsClone.querySelector('.news__description-source');
                    if (descriptionSource) {
                        descriptionSource.textContent = item.source.name;
                    }
                    const descriptionContent: HTMLElement | null  = newsClone.querySelector('.news__description-content');
                    if (descriptionContent) {
                        descriptionContent.textContent = item.description;
                    }
                    const readMore: HTMLAnchorElement | null  = newsClone.querySelector('.news__read-more a');
                    if (readMore) {
                        readMore.setAttribute('href', item.url);
                    }
                    fragment.append(newsClone);
                }


            });
        }
        const newsContainer: HTMLElement | null = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;