import Levels from './levels/levels';
import Board from './game-board/board';
import './styles/index.css';
import Input from './input/input';
import HelpBtn from './help-btn/help-btn';

export default class App {
  public static start = (): void => {
    const board = new Board();
    const levels = new Levels(board);
    const input = new Input(levels);
    const helpBtn = new HelpBtn(levels, input);
    document.body.append(
      levels.getElement(),
      board.getElement(),
      input.getElement(),
      helpBtn.getElement(),
    );
  };
}
