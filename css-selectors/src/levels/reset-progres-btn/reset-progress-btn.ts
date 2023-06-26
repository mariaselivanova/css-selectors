import Levels from '../levels';
import './reset-progress-btn.css';
import ButtonView from '../../utils/button-view';

export default class ResetBtn extends ButtonView {
  private levels: Levels;

  constructor(levels: Levels) {
    super(['reset-btn']);
    this.setButtonType('reset');
    this.levels = levels;
    this.element?.addEventListener('click', () => this.handleResetBtn());
    this.setTextContent('Reset progress');
  }

  private handleResetBtn():void {
    this.levels.resetProgress();
  }
}
