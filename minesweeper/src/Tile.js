export default class Tile {
  constructor(x, y, el, isMine) {
    this.x = x;
    this.y = y;
    this.el = el;
    this.isMine = isMine;
    this.isHidden = true;
    this.isMarked = false;
  }

  reveal(num) {
    if (!this.isHidden || this.isMarked) {
      return;
    }
    this.isHidden = false;

    if (this.isMine) {
      this.el.dataset.status = "mine";
      this.el.textContent = '';
      return;
    }

    this.el.dataset.status = "number";
    this.el.textContent = num;

    if (num === 0) {
      this.el.textContent = "";
    }

    switch (num) {
      case 1:
        this.el.classList.add('one');
        break;
      case 2:
        this.el.classList.add('two');
        break;
      case 3:
        this.el.classList.add('three');
        break;
      case 4:
        this.el.classList.add('four');
        break;
      case 5:
        this.el.classList.add('five');
        break;
      case 6:
        this.el.classList.add('six');
        break;
      case 7:
        this.el.classList.add('seven');
        break;
      case 8:
        this.el.classList.add('eight');
        break;
      default:
        break;
    }
  }

  toggleMark() {
    if (!this.isHidden) {
      return;
    }
    this.isMarked = !this.isMarked;
    if (this.isMarked) {
      this.el.dataset.status = "marked"
      this.el.textContent = "?"
    } else {
      this.el.dataset.status = "hidden"
      this.el.textContent = ""
    }
  }
}
