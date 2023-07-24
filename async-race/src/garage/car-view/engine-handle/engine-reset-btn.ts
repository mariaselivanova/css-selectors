import api from '../../../utils/api';
import ButtonView from '../../../utils/button-view';

export default class EngineResetBtn extends ButtonView {
  private carElement: HTMLElement;

  constructor(id: number, carElement: HTMLElement) {
    super(['reset-btn', 'disabled'], 'button');
    this.setTextContent('B');
    this.carElement = carElement;
    this.element?.addEventListener('click', () => this.resetDrive(id));
  }

  private async resetDrive(id: number): Promise<void> {
    const svg = this.carElement.querySelector('svg');
    if (svg) {
      svg.style.animation = '';
    }
    try {
      await api.handleEngine(id, 'stopped');
      this.element?.classList.add('disabled');
      const startBtn = this.carElement.querySelector('.engine-start');
      startBtn?.classList.remove('disabled');
    } catch {
      console.log(`Error removing car #${id}`);
    }
  }
}
