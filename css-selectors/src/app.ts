import Levels from './levels/levels';
import Board from './game-board/board';
import HtmlView from './html-view/html-view';
import Input from './input/input';
import HelpBtn from './help-btn/help-btn';
import LevelInputManager from './utils/levels-input-manager';
import ResetBtn from './reset-progres-btn/reset-progress-btn';
import EnterBtn from './enter-btn/enter-btn';
import CssView from './css-view/css-view';

export default class App {
  public static start = (): void => {
    const board = new Board();
    const htmlView = new HtmlView();
    const cssVIew = new CssView();
    const levels = new Levels(board, htmlView);
    const resetBtn = new ResetBtn(levels);
    const input = new Input(levels);
    const enterBtn = new EnterBtn(input);
    const helpBtn = new HelpBtn(levels, input);
    const levelInputManager = new LevelInputManager(levels, input);
    levels.onLevelChange(() => {
      levelInputManager.handleInput();
    });
    const boardElement = board.getElement();
    const levelsElement = levels.getElement();
    const cssElement = cssVIew.getElement();
    document.body.append(
      boardElement,
      levelsElement,
      cssElement,
      htmlView.getElement(),
    );
    cssElement.append(input.getElement(), enterBtn.getElement());
    levelsElement.append(resetBtn.getElement());
    boardElement.append(helpBtn.getElement());
  };
}
