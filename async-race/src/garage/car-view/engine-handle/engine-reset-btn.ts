import ButtonView from '../../../utils/button-view';

export default class EngineResetBtn extends ButtonView {
  private carElement: HTMLElement;

  private svg: SVGElement | null;

  constructor(carElement: HTMLElement) {
    super(['reset-btn'], 'button');
    this.setTextContent('B');
    this.carElement = carElement;
    this.svg = this.carElement.querySelector('svg');
    this.element?.addEventListener('click', () => this.resetDrive());
  }

  private resetDrive(): void {
    if (this.svg) {
      this.svg.style.animation = '';
    }
  }
}
