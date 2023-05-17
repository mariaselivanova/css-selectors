import {
  tiles,
  content,
  classes } from "./utils/constants";

export default class Tile {
  constructor(x, y, el, isMine, isUnknown, isRightClicked, num) {
    this.x = x;
    this.y = y;
    this.el = el;
    this.isMine = isMine;
    this.isUnknown = isUnknown;
    this.isRightClicked = isRightClicked;
    this.number = null;
    this.setRightClicked();
    this.setIsNum(num);
  }

  setIsNum(num) {
    if (!this.isUnknown && !this.isMine && !this.isRightClicked) {
      this.el.dataset.type = tiles.NUMBER;
      this.el.textContent = num;
      this.number = num;

      if (num === 0) {
        this.el.textContent = content.EMPTY;
      }
      switch (num) {
        case 1:
          this.el.classList.add(classes.ONE);
          break;
        case 2:
          this.el.classList.add(classes.TWO);
          break;
        case 3:
          this.el.classList.add(classes.THREE);
          break;
        case 4:
          this.el.classList.add(classes.FOUR);
          break;
        case 5:
          this.el.classList.add(classes.FIVE);
          break;
        case 6:
          this.el.classList.add(classes.SIX);
          break;
        case 7:
          this.el.classList.add(classes.SEVEN);
          break;
        case 8:
          this.el.classList.add(classes.EIGHT);
          break;
        default:
          break;
      }
    }
  }

  setRightClicked() {
    if (this.isRightClicked) {
      this.el.dataset.type = tiles.RIGHT_CLICKED
      this.el.textContent = content.QUESTION_MARK
    }
  }

  reveal(num) {
    if (!this.isUnknown || this.isRightClicked) {
      return;
    }
    this.isUnknown = false;

    if (this.isMine) {
      this.el.dataset.type = tiles.MINE;
      this.el.textContent = content.EMPTY;
      return;
    }

    this.el.dataset.type = tiles.NUMBER;
    this.el.textContent = num;
    this.number = num;


    if (num === 0) {
      this.el.textContent = content.EMPTY;
    }

    switch (num) {
      case 1:
        this.el.classList.add(classes.ONE);
        break;
      case 2:
        this.el.classList.add(classes.TWO);
        break;
      case 3:
        this.el.classList.add(classes.THREE);
        break;
      case 4:
        this.el.classList.add(classes.FOUR);
        break;
      case 5:
        this.el.classList.add(classes.FIVE);
        break;
      case 6:
        this.el.classList.add(classes.SIX);
        break;
      case 7:
        this.el.classList.add(classes.SEVEN);
        break;
      case 8:
        this.el.classList.add(classes.EIGHT);
        break;
      default:
        break;
    }
  }

  toggleMark() {
    if (!this.isUnknown) {
      return;
    }
    this.isRightClicked = !this.isRightClicked;
    if (this.isRightClicked) {
      this.el.dataset.type = tiles.RIGHT_CLICKED
      this.el.textContent = content.QUESTION_MARK
    } else {
      this.el.dataset.type = tiles.UNKNOWN
      this.el.textContent = content.EMPTY
    }
  }
}
