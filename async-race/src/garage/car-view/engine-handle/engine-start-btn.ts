import api from '../../../utils/api';
import ButtonView from '../../../utils/button-view';

export default class EngineStartBtn extends ButtonView {
  private carElement: HTMLElement;

  constructor(id: number, carElement: HTMLElement) {
    super(['engine-start'], 'button');
    this.setTextContent('A');
    this.element?.addEventListener('click', () => this.startDrive(id));
    this.carElement = carElement;
  }

  private async startDrive(id: number): Promise<void> {
    const svg = this.carElement.querySelector('svg');
    const resetBtn = this.carElement.querySelector('.reset-btn');
    if (!svg || !resetBtn) return;
    try {
      const engineData = await api.handleEngine(id, 'started');
      const animationDuration = engineData.distance / engineData.velocity / 1000;
      this.element?.classList.toggle('disabled', true);
      resetBtn?.classList.toggle('disabled', false);
      svg.style.animation = `carAnimation ${animationDuration}s linear forwards`;
      await api.handleEngine(id, 'drive');
    } catch (error) {
      svg.style.animationPlayState = 'paused';
    }
  }
}
