import './levels.css';
import { levelsArray } from '../utils/levelsArray';
import { Level } from '../utils/types';
import Board from '../game-board/board';
import View from '../utils/view';
import HtmlView from '../html-view/html-view';

export default class Levels extends View {
  private levelLinks: HTMLElement[];

  public selectedLevel: number;

  private board: Board;

  private htmlView: HtmlView;

  private selectedLevelElement: HTMLElement | undefined;

  private levelChangeCallback: (() => void) | undefined;

  constructor(board: Board, htmlView: HtmlView) {
    super('section', ['levels-table']);
    this.board = board;
    this.htmlView = htmlView;
    this.levelLinks = [];
    this.selectedLevel = 1;
    this.selectedLevelElement = undefined;
    this.setContent(levelsArray);
  }

  public getSelectedLevel(): number {
    return this.selectedLevel;
  }

  public getSelectedLevelElement(): HTMLElement | undefined {
    if (this.selectedLevelElement) {
      return this.selectedLevelElement;
    }
    return undefined;
  }

  private setContent(array: Level[]): void {
    const note = new View('p', ['note']);
    note.setTextContent('* - solved with help');
    array.forEach((level: Level) => {
      const link = new View('a', ['link']);
      link.setTextContent(`level ${level.number}`);
      const linkElement = link.getElement();
      if (linkElement) {
        this.levelLinks.push(linkElement);
        if (level.number === this.selectedLevel) {
          this.setSelectedLevel(linkElement);
        }
        linkElement?.addEventListener('click', this.setSelectedLevel.bind(this, linkElement));
        this.element?.append(linkElement);
      }
    });
    this.element?.append(note.getElement());
  }

  private setSelectedLevel(element: HTMLElement | undefined): void {
    this.selectedLevelElement = element;
    this.levelLinks.forEach((level: HTMLElement) => Levels.setNotSelectedLevel(level));
    if (element) {
      element.classList.add('link_active');
      this.selectedLevel = parseInt(element.textContent?.substring(5) ? element.textContent.substring(5) : '1', 10);
      this.board.updateContent(this.selectedLevel, levelsArray);
      this.htmlView.updateContent(this.selectedLevel, levelsArray);
    }
    if (this.levelChangeCallback) {
      this.levelChangeCallback();
    }
  }

  private static setNotSelectedLevel(element: HTMLElement): void {
    element.classList.remove('link_active');
  }

  public changeLevelStatus(): void {
    this.selectedLevelElement?.classList.add('link_solved');
  }

  private findUnsolvedLevel(): HTMLElement | undefined {
    return this.levelLinks.find((item) => !item.classList.contains('link_solved'));
  }

  private handleWin():void {
    this.board.removeContent();
    const winCaption = document.createElement('p');
    winCaption.textContent = 'YOU WON!';
    this.board.getElement().append(winCaption);
  }

  public goToNextLevel(): void {
    const nextUnsolved = this.findUnsolvedLevel();
    if (!nextUnsolved) {
      this.handleWin();
    } else {
      this.setSelectedLevel(nextUnsolved);
    }
  }

  public onLevelChange(callback: () => void): void {
    this.levelChangeCallback = callback;
  }

  public resetProgress():void {
    this.levelLinks.forEach((link) => {
      link.classList.remove('link_solved');
      link.classList.remove('solved-with-help');
      link.removeAttribute('data-help');
    });
    this.setSelectedLevel(this.levelLinks[0]);
  }
}
