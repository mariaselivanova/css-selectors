import './levels.css';
import { levelsArray } from '../utils/levelsArray';
import { Level } from '../utils/types';
import BoardView from '../game-board/board-view';
import View from '../utils/view';

export default class LevelsView extends View {
  private levelLinks: HTMLElement[];

  public selectedLevel: number;

  private boardView: BoardView;

  constructor(boardView: BoardView) {
    super('section', ['levels-table']);
    this.boardView = boardView;
    this.levelLinks = [];
    this.selectedLevel = 1;
    this.addChildElements(levelsArray);
  }

  public getSelectedLevel():number {
    return this.selectedLevel;
  }

  private addChildElements(array: Level[]):void {
    array.forEach((level: Level, index: number) => {
      const link = document.createElement('a');
      link.classList.add('level-link');
      link.textContent = `${level.number} level`;
      this.levelLinks.push(link);
      if (level.number === this.selectedLevel) {
        this.setSelectedLevel(link);
      }
      link.addEventListener('click', this.setSelectedLevel.bind(this, link));
      this.element.append(link);
    });
  }

  private setSelectedLevel(element: HTMLElement):void {
    this.levelLinks.forEach((level: HTMLElement) => LevelsView.setNotSelectedLevel(level));
    element.classList.add('level-link_active');
    this.selectedLevel = parseInt(element.textContent ? element.textContent : '1', 10);
    this.boardView.setContent(this.selectedLevel, levelsArray);
  }

  private static setNotSelectedLevel(element: HTMLElement):void {
    element.classList.remove('level-link_active');
  }
}
