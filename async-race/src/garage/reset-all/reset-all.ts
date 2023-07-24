import api from '../../utils/api';
import ButtonView from '../../utils/button-view';
import { EngineParams } from '../../utils/types';
import Garage from '../garage';

export default class ResetAllBtn extends ButtonView {
  private garage: Garage;

  constructor(garage: Garage) {
    super(['reset-all'], 'button');
    this.setTextContent('reset');
    this.garage = garage;
    this.element?.addEventListener('click', () => this.resetAll());
  }

  public async resetAll(): Promise<void> {
    const promises: Promise<EngineParams>[] = [];
    Object.keys(this.garage.currentCarElements).forEach((id) => {
      promises.push(api.handleEngine(+id, 'stopped'));
    });
    try {
      await Promise.all(promises);
      await this.garage.reloadPage();
    } catch (error) {
      console.error('Failed to stop engines:', error);
    }
  }
}
