import './levels.css';
import { levelsArray } from '../utils/levelsArray';
import { Level } from '../utils/types';
import BoardView from '../game-board/board-view';
import View from '../utils/view';

export default class LevelsView extends View {
  private levelLinks: HTMLElement[];

  public selectedLevel: number;

  private boardView: BoardView;

  private selectedLevelElement: HTMLElement | undefined;

  constructor(boardView: BoardView) {
    super('section', ['levels-table']);
    this.boardView = boardView;
    this.levelLinks = [];
    this.selectedLevel = 1;
    this.selectedLevelElement = undefined;
    this.setContent(levelsArray);
  }

  public getSelectedLevel(): number {
    return this.selectedLevel;
  }

  private setContent(array: Level[]): void {
    array.forEach((level: Level) => {
      const link = new View('a', ['level-link']);
      link.setTextContent(`${level.number} level`);
      const linkElement = link.getElement();
      this.levelLinks.push(linkElement);
      if (level.number === this.selectedLevel) {
        this.setSelectedLevel(linkElement);
      }
      linkElement.addEventListener('click', this.setSelectedLevel.bind(this, linkElement));
      this.element.append(linkElement);
    });
  }

  private setSelectedLevel(element: HTMLElement | undefined): void {
    this.selectedLevelElement = element;
    this.levelLinks.forEach((level: HTMLElement) => LevelsView.setNotSelectedLevel(level));
    if (element) {
      element.classList.add('level-link_active');
      this.selectedLevel = parseInt(element.textContent ? element.textContent : '1', 10);
      this.boardView.setContent(this.selectedLevel, levelsArray);
    }
  }

  private static setNotSelectedLevel(element: HTMLElement): void {
    element.classList.remove('level-link_active');
  }

  public changeLevelStatus(): void {
    this.selectedLevelElement?.classList.add('level-link_solved');
  }

  public goToNextLevel(): void {
    this.selectedLevel += 1;
    const nextLevel = this.levelLinks.find(
      (link) => parseInt(link.textContent ? link.textContent : '1', 10) === this.selectedLevel,
    );
    this.setSelectedLevel(nextLevel);
  }
}
