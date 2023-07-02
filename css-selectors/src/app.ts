import Levels from './levels/levels';
import HtmlView from './html-view/html-view';
import Input from './css-view/input/input';
import HelpBtn from './levels/help-btn/help-btn';
import ResetBtn from './levels/reset-progress-btn/reset-progress-btn';
import EnterBtn from './css-view/enter-btn/enter-btn';
import CssView from './css-view/css-view';
import CssHeader from './css-view/css-header/css-header';
import CssLineCounter from './css-view/css-line-counter/css-line-counter';
import Footer from './footer/footer';
import Markup from './html-view/markup';
import BoardView from './game-board/board';
import CodeHighlighter from './css-view/code-highlighter/code-highlighter';

export default class App {
  public static start = (): void => {
    const markup = new Markup();
    const board = new BoardView();
    const htmlView = new HtmlView();
    const cssView = new CssView();
    const cssHeader = new CssHeader();
    const cssLineCounter = new CssLineCounter();
    const codeHighlighter = new CodeHighlighter();
    const footer = new Footer();
    const levels = new Levels(board, htmlView, markup);
    const input = new Input(levels, codeHighlighter);
    const helpBtn = new HelpBtn(input);
    const enterBtn = new EnterBtn(() => input.handleInput());
    const resetBtn = new ResetBtn(() => levels.resetProgress());
    levels.onLevelChange(() => {
      input.clearInput();
    });
    board.onMouseOver((id: number) => {
      htmlView.highlightMarkupElement(id);
    });
    board.onMouseOut((id: number) => {
      htmlView.deleteMarkupHighlight(id);
    });
    htmlView.onMouseOver((id: number) => {
      board.highlightImage(id);
    });
    htmlView.onMouseOut((id: number) => {
      board.deleteImageHighlight(id);
    });
    cssView.getElement().append(
      codeHighlighter.getElement(),
      cssHeader.getElement(),
      input.getElement(),
      enterBtn.getElement(),
      cssLineCounter.getElement(),
    );
    levels.getElement().append(
      resetBtn.getElement(),
      helpBtn.getElement(),
    );
    document.body.append(
      levels.getElement(),
      cssView.getElement(),
      htmlView.getElement(),
      board.getElement(),
      footer.getElement(),
      markup.getElement(),
    );
  };
}
