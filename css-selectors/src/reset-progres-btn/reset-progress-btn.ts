import View from '../utils/view';
import Levels from '../levels/levels';
import './reset-progress-btn.css';

export default class ResetBtn extends View {
  private levels: Levels;

  constructor(levels: Levels) {
    super('button', ['reset-btn']);
    this.levels = levels;
    this.element.addEventListener('click', () => this.handleResetBtn());
    this.setTextContent('Reset progress');
  }

  private handleResetBtn():void {
    this.levels.resetProgress();
  }
}
