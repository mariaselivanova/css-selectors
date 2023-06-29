import Levels from './levels/levels';
import Board from './game-board/board';
import HtmlView from './html-view/html-view';
import Input from './css-view/input/input';
import HelpBtn from './levels/help-btn/help-btn';
import LevelInputManager from './utils/levels-input-manager';
import ResetBtn from './levels/reset-progress-btn/reset-progress-btn';
import EnterBtn from './css-view/enter-btn/enter-btn';
import CssView from './css-view/css-view';
import CssHeader from './css-view/css-header/css-header';
import CssLineCounter from './css-view/css-line-counter/css-line-counter';
import Footer from './footer/footer';
import CodeHighlighter from './css-view/code-highlighter/code-highlighter';

export default class App {
  public static start = (): void => {
    const htmlView = new HtmlView();
    const board = new Board();
    const cssVIew = new CssView();
    const cssHeader = new CssHeader();
    const codeHighlighter = new CodeHighlighter();
    const cssLineCounter = new CssLineCounter();
    const levels = new Levels(board, htmlView);
    const resetBtn = new ResetBtn(levels);
    const input = new Input(levels, codeHighlighter);
    const enterBtn = new EnterBtn(input);
    const helpBtn = new HelpBtn(levels, input, codeHighlighter);
    const levelInputManager = new LevelInputManager(levels, input);
    const footer = new Footer();
    levels.onLevelChange(() => {
      levelInputManager.handleInput();
    });
    const levelsElement = levels.getElement();
    const cssElement = cssVIew.getElement();
    document.body.append(
      levelsElement,
      cssElement,
      htmlView.getElement(),
      board.getElement(),
      footer.getElement(),
    );
    cssElement.append(
      codeHighlighter.getElement(),
      cssHeader.getElement(),
      input.getElement(),
      enterBtn.getElement(),
      cssLineCounter.getElement(),
    );
    levelsElement.append(resetBtn.getElement(), helpBtn.getElement());
  };
}
