import './levels.css';
import { levelsArray } from '../utils/levelsArray';
import { Level } from '../utils/types';
import BoardView from '../game-board/board-view';

export default class LevelsView {
  private element: HTMLElement;

  private levels: HTMLElement[];

  public selectedLevel: number;

  private boardView: BoardView;

  constructor(boardView: BoardView) {
    this.boardView = boardView;
    this.element = document.createElement('section');
    this.addClasses(['levels-table']);
    this.levels = [];
    this.addInnerHtml(levelsArray);
    this.selectedLevel = 1;
  }

  private addClasses(classes: string[]): void {
    classes.forEach((className) => {
      this.element.classList.add(className);
    });
  }

  private addInnerHtml(array: Level[]):void {
    array.forEach((obj: Level, index: number) => {
      const link = document.createElement('a');
      link.classList.add('level-link');
      link.textContent = `${obj.number} level`;
      this.levels.push(link);
      if (index === 0) {
        this.setSelectedLevel(link);
        this.selectedLevel = obj.number;
      }
      link.addEventListener('click', this.setSelectedLevel.bind(this, link));
      this.element.append(link);
    });
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public setSelectedLevel(elem: HTMLElement):void {
    this.levels.forEach((level: HTMLElement) => this.setNotSelectedLevel(level));
    elem.classList.add('level-link_active');
    const levelNumber = parseInt(elem.textContent?.split(' ')[0] || '1', 10);
    this.selectedLevel = levelNumber;
    this.boardView.setContent(this.selectedLevel, levelsArray);
  }

  public setNotSelectedLevel(elem: HTMLElement):void {
    elem.classList.remove('level-link_active');
  }
}
