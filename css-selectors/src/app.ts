import LevelsView from './levels/levels-view';
import BoardView from './game-board/board-view';
import './styles/index.css';

export default class App {
  public static start = (): void => {
    const boardView = new BoardView();
    const levelsView = new LevelsView(boardView);
    document.body.append(levelsView.getElement(), boardView.getElement());
  };
}
