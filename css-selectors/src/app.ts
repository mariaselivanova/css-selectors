import LevelsView from './levels/levels-view';
import BoardView from './game-board/board-view';
import './styles/index.css';
import Input from './input/input';

export default class App {
  public static start = (): void => {
    const boardView = new BoardView();
    const levelsView = new LevelsView(boardView);
    const input = new Input(levelsView);
    document.body.append(levelsView.getElement(), boardView.getElement(), input.getElement());
  };
}
