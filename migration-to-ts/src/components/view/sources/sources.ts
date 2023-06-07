import './sources.css';
import { NewsSource } from '../../../types';

class Sources {
    public draw = (data: NewsSource[]): void => {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
            const itemName = sourceClone.querySelector('.source__item-name') as HTMLElement;
            if (itemName) {
                itemName.textContent = item.name;
            }
            const sourceItem = sourceClone.querySelector('.source__item') as HTMLElement;
            if (sourceItem) {
                sourceItem.setAttribute('data-source-id', item.id);
            }
            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        }
    }
}

export default Sources;
