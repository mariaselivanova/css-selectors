import LevelsView from './levels/levels-view';

export default class App {
  public static start = (): void => {
    const levelsView = new LevelsView();
    const levels = levelsView.getElement();
    document.body.append(levels);
  };
}
