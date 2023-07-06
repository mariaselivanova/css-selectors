import './sources.css';
import { NewsSource } from '../../../types';

class Sources {
  public draw = (data: NewsSource[]): void => {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
    if (sourceItemTemp) {
      data.forEach((item) => {
        const sourceClone = sourceItemTemp.content.cloneNode(true);
        if (sourceClone instanceof DocumentFragment) {
          const itemName = sourceClone.querySelector('.source__item-name');
          if (itemName) {
            itemName.textContent = item.name;
          }
          const sourceItem = sourceClone.querySelector('.source__item');
          if (sourceItem) {
            sourceItem.setAttribute('data-source-id', item.id);
          }
          fragment.appendChild(sourceClone);
        }
      });

      const sourcesContainer = document.querySelector('.sources');
      if (sourcesContainer) {
        sourcesContainer.appendChild(fragment);
      }
    }
  };
}

export default Sources;
