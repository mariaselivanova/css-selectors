import api from '../../utils/api';
import ButtonView from '../../utils/button-view';
import { EngineParams } from '../../utils/types';
import Pagination from '../pagination/pagination';

export default class ResetAllBtn extends ButtonView {
  private pagination: Pagination;

  constructor(pagination: Pagination) {
    super(['reset-all'], 'button');
    this.setTextContent('reset');
    this.pagination = pagination;
    this.element?.addEventListener('click', () => this.resetAll());
  }

  private resetAll(): void {
    const raceBtn = document.querySelector('.race');
    raceBtn?.classList.remove('disabled');
    const promises: Promise<EngineParams>[] = [];
    Object.keys(this.pagination.currentCarElements).forEach((id) => {
      promises.push(api.handleEngine(+id, 'stopped'));
    });
    Promise.all(promises)
      .then(() => {
        this.pagination.reloadPage();
      })
      .catch((error) => {
        console.error('Failed to stop engines:', error);
      });
  }
}
