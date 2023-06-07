import './news.css';
import { NewsObject } from '../../../types';

class News {
    public draw = (data: NewsObject[]): void => {
        const news = data.length >= 10 ? data.filter((_item: NewsObject, idx: number) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement | null;
            if (newsClone) {
                if (idx % 2) newsClone.querySelector<HTMLElement>('.news__item')?.classList.add('alt');

                 const metaPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');
                 if (metaPhoto) {
                    metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                 }
                 const metaAuthor = newsClone.querySelector<HTMLElement>('.news__meta-author');
                 if (metaAuthor) {
                    metaAuthor.textContent = item.author || item.source.name;
                 }
                 const metaDate = newsClone.querySelector('.news__meta-date');
                 if (metaDate) {
                    metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                 }
                 const descriptionTitle = newsClone.querySelector<HTMLElement>('.news__description-title');
                 if (descriptionTitle) {
                    descriptionTitle.textContent = item.title;
                 }
                 const descriptionSource =  newsClone.querySelector<HTMLElement>('.news__description-source');
                 if (descriptionSource) {
                    descriptionSource.textContent = item.source.name;
                 }
                const descriptionContent = newsClone.querySelector<HTMLElement>('.news__description-content');
                if (descriptionContent) {
                    descriptionContent.textContent = item.description;
                }
                const readMore = newsClone.querySelector<HTMLElement>('.news__read-more a');
                if (readMore) {
                    readMore.setAttribute('href', item.url);
                }
                fragment.append(newsClone);
            }


        });

        const newsContainer = document.querySelector<HTMLElement>('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;