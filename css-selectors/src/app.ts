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
import CodeHighlighter from './css-view/code-highlighter/code-highlighter';
import Markup from './html-view/markup';
import BoardView from './game-board/board';

export default class App {
  public static start = (): void => {
    const markup = new Markup();
    const board = new BoardView();
    const htmlView = new HtmlView(board);
    const cssVIew = new CssView();
    const cssHeader = new CssHeader();
    const codeHighlighter = new CodeHighlighter();
    const cssLineCounter = new CssLineCounter();
    const footer = new Footer();
    const levels = new Levels(board, htmlView, markup);
    const resetBtn = new ResetBtn(levels);
    const input = new Input(levels, codeHighlighter, markup, board);
    const enterBtn = new EnterBtn(input);
    const helpBtn = new HelpBtn(levels, input, codeHighlighter);
    levels.onLevelChange(() => {
      input.clearInput();
    });
    board.onMouseOver((id: number) => {
      htmlView.highlightMarkupElement(id);
    });
    board.onMouseOut((id: number) => {
      htmlView.deleteMarkupHighlight(id);
    });
    const levelsElement = levels.getElement();
    const cssElement = cssVIew.getElement();
    document.body.append(
      levelsElement,
      cssElement,
      htmlView.getElement(),
      board.getElement(),
      footer.getElement(),
      markup.getElement(),
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
