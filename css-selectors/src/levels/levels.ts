import './levels.css';
import { levelsArray } from '../utils/levelsArray';
import { Level } from '../utils/types';
import Board from '../game-board/board';
import View from '../utils/view';
import HtmlView from '../html-view/html-view';
import {
  addToHelp,
  addToProgress,
  getHelpArray,
  getProgressArray,
  getSelectedLevel,
} from './localStorage';
import Markup from '../html-view/markup';

const TOTAL_LEVELS_NUM = 10;

export default class Levels extends View {
  private levelLinks: HTMLElement[];

  public selectedLevel: number;

  private board: Board;

  private htmlView: HtmlView;

  private markup: Markup;

  private selectedLevelElement: HTMLElement | undefined;

  private levelChangeCallback: (() => void) | undefined;

  private isHelped: HTMLElement | undefined;

  constructor(board: Board, htmlView: HtmlView, markup: Markup) {
    super('section', ['levels-table']);
    this.board = board;
    this.markup = markup;
    this.htmlView = htmlView;
    this.levelLinks = [];
    this.selectedLevel = getSelectedLevel();
    this.selectedLevelElement = undefined;
    this.setContent(levelsArray);
    this.isHelped = undefined;
  }

  private setContent(levels: Level[]): void {
    const note = new View('p', ['note']);
    note.setTextContent('* - solved with help');
    const helpArray = getHelpArray();
    const progressArray = getProgressArray();
    levels.forEach((level: Level) => {
      const link = new View('a', ['link']);
      link.setTextContent(`Level ${level.number}`);
      const linkElement = link.getElement();
      if (helpArray.includes(level.number)) {
        linkElement.classList.add('solved-with-help');
      }
      if (progressArray.includes(level.number)) {
        linkElement.classList.add('link_solved');
      }
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

  public onLevelChange(callback: () => void): void {
    this.levelChangeCallback = callback;
  }

  private setSelectedLevel(element: HTMLElement | undefined): void {
    this.selectedLevelElement = element;
    this.levelLinks.forEach((level: HTMLElement) => Levels.setNotSelectedLevel(level));
    if (element) {
      element.classList.add('link_active');
      this.selectedLevel = parseInt(element.textContent?.substring(5) ? element.textContent.substring(5) : '1', 10);
      localStorage.setItem('currentLevel', this.selectedLevel.toString());
      const chosenLevelObj = levelsArray.find((level) => level.number === this.selectedLevel);
      if (chosenLevelObj) {
        this.board.updateContent(chosenLevelObj);
        this.htmlView.updateContent(chosenLevelObj);
        this.markup.updateContent(chosenLevelObj);
      }
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
    addToProgress(this.selectedLevel);
  }

  private findUnsolvedLevel(): HTMLElement | undefined {
    return this.levelLinks.find((item) => !item.classList.contains('link_solved'));
  }

  public goToNextLevel(): void {
    if (this.selectedLevel === TOTAL_LEVELS_NUM) {
      const unsolvedLevel = this.findUnsolvedLevel();
      if (unsolvedLevel) {
        this.setSelectedLevel(unsolvedLevel);
        return;
      }
      this.board.handleWin();
      return;
    }
    const nextLevel = this.levelLinks.slice(this.selectedLevel).find((item) => !item.classList.contains('link_solved'));
    if (nextLevel) {
      this.setSelectedLevel(nextLevel);
    } else {
      const previousLevel = this.levelLinks.slice(0, this.selectedLevel).find((item) => !item.classList.contains('link_solved'));
      if (previousLevel) {
        this.setSelectedLevel(previousLevel);
      } else {
        this.board.handleWin();
      }
    }
  }

  public resetProgress(): void {
    this.levelLinks.forEach((link) => {
      link.classList.remove('link_solved');
      link.classList.remove('solved-with-help');
    });
    localStorage.clear();
    this.setSelectedLevel(this.levelLinks[0]);
  }

  public getCorrectAnswer(): string {
    const currentLevelObject = levelsArray.find((level) => level.number === this.selectedLevel);
    if (currentLevelObject) {
      return currentLevelObject.selector;
    }
    return '';
  }

  public getSelectedElements(selector: string): NodeListOf<HTMLElement> {
    return this.markup.getElement().querySelectorAll(selector);
  }

  public checkHelp(): void {
    if (this.isHelped === this.selectedLevelElement) {
      this.selectedLevelElement?.classList.add('solved-with-help');
      addToHelp(this.selectedLevel);
    }
  }

  public setHelpedStatus(): void {
    this.isHelped = this.selectedLevelElement;
  }

  public handleCorrectAnswer():void {
    this.board.setCorrectAnswerAnimation();
    setTimeout(() => {
      this.checkHelp();
      this.changeLevelStatus();
      this.goToNextLevel();
    }, 1000);
  }

  public handleWrongAnswer():void {
    this.board.setWrongAnswerAnimation();
  }
}