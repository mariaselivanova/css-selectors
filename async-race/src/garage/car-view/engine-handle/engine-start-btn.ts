import api from '../../../utils/api';
import ButtonView from '../../../utils/button-view';

export default class EngineStartBtn extends ButtonView {
  private carElement: HTMLElement;

  private svg: SVGElement | null;

  constructor(id: number, carElement: HTMLElement) {
    super(['engine-start'], 'button');
    this.setTextContent('A');
    this.element?.addEventListener('click', () => this.startDrive(id));
    this.carElement = carElement;
    this.svg = this.carElement.querySelector('svg');
  }

  private async startDrive(id: number): Promise<void> {
    const resetBtn = this.carElement.querySelector('.reset-btn');
    try {
      const engineData = await api.handleEngine(id, 'started');
      const animationDuration = engineData.distance / engineData.velocity / 1000;
      resetBtn?.classList.remove('disabled');
      if (this.svg) {
        this.svg.style.animation = `carAnimation ${animationDuration}s linear forwards`;
      }
      const res = await api.handleEngine(id, 'drive');
      if (res.success && this.svg) {
        this.svg.style.animationPlayState = 'paused';
      }
    } catch (error) {
      if (this.svg) {
        this.svg.style.animationPlayState = 'paused';
      }
    }
  }
}
