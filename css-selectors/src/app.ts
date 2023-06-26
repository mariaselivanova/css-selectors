import Levels from './levels/levels';
import Board from './game-board/board';
import './styles/index.css';
import Input from './input/input';
import HelpBtn from './help-btn/help-btn';
import LevelInputManager from './utils/levels-input-manager';
import ResetBtn from './reset-progres-btn/reset-progress-btn';
import EnterBtn from './enter-btn/enter-btn';

export default class App {
  public static start = (): void => {
    const board = new Board();
    const levels = new Levels(board);
    const resetBtn = new ResetBtn(levels);
    const input = new Input(levels);
    const enterBtn = new EnterBtn(input);
    const helpBtn = new HelpBtn(levels, input);
    const levelInputManager = new LevelInputManager(levels, input);
    levels.onLevelChange(() => {
      levelInputManager.handleInput();
    });
    document.body.append(
      levels.getElement(),
      resetBtn.getElement(),
      board.getElement(),
      input.getElement(),
      helpBtn.getElement(),
      enterBtn.getElement(),
    );
  };
}
