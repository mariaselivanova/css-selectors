import Tile from './Tile';
import Timer from './Timer';
import {
  selectors,
  elements,
  classes,
  tiles,
  content } from './utils/constants';

export default class Board {
  constructor(size, numberOfMines) {
    this.size = size;
    this.numberOfMines = numberOfMines;
    this.board = [];
    this.timer = new Timer();
    this.clickCount = 0;
    this.firstMove = true;
    this.isGameOver = false;
    this.subtext = document.querySelector(selectors.SUBTEXT);
    this.boardElement = document.querySelector(selectors.BOARD);
    this.clickCountElement = document.querySelector(selectors.CLICK_COUNTER);
  }

  checkifTimer() {
    if (!this.timer.timer) {
      this.timer.start();
    }
  }

  checkIfMines(mines, x, y) {
    return mines.some(mine => mine.x === x && mine.y === y);
  }

  openTile(board, tile) {
    const neighbourTiles = this.findNeighbourTiles(board, tile);
    const neighbourMines = neighbourTiles.filter(adjacentTile => adjacentTile.isMine);

    if (tile.isMine) {
      tile.reveal(neighbourMines.length);
    } else {
      tile.reveal(neighbourMines.length);
      if (neighbourMines.length === 0) {
        neighbourTiles.forEach(tile => {
          if (tile.isUnknown) {
            this.openTile(board, tile);
          }
        });
      }
    }
  }

  createBoard() {
    for (let x = 0; x < this.size; x++) {
      const row = [];
      for (let y = 0; y < this.size; y++) {
        const el = document.createElement(elements.DIV);
        el.classList.add(classes.TILE)
        el.dataset.type = tiles.UNKNOWN;
        const tile = new Tile(x, y, el, false);
        el.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          this.handleRightClick(tile);
        });
        el.addEventListener('click', () => {
          this.handleLeftClick(tile, el)

        });
        row.push(tile);
      }
      this.board.push(row);
    }
    return this.board;
  }

  handleRightClick(tile) {
    if (this.isGameOver) return
    this.checkifTimer();
    tile.toggleMark();
    this.updateMinesLeft();
  }

  handleFirstMove(tile) {
    this.firstMove = false;
    this.createMines(this.size, this.numberOfMines, tile.x, tile.y)
  }

  handleLeftClick(tile, el) {
    if (this.isGameOver) return
    if (this.firstMove) {
      this.handleFirstMove(tile)
    }
    this.checkifTimer();
    this.clickCount++;
    this.updateClickCountDisplay()
    this.openTile(this.board, tile)
    this.checkIfWin();
    this.checkIfLose(el);
  }

  findNeighbourTiles(board, tile) {
    const neighbourTiles = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x === 0 && y === 0) {
          continue;
        }

        const adjacentX = tile.x + x;
        const adjacentY = tile.y + y;

        if (
          adjacentX >= 0 &&
          adjacentX < this.size &&
          adjacentY >= 0 &&
          adjacentY < this.size
        ) {
          const adjacentTile = board[adjacentX][adjacentY];
          neighbourTiles.push(adjacentTile);
        }
      }
    }
    return neighbourTiles;
  }

  createMines(size, numMines, x, y) {
    const currentTile = this.board.flat().find(item => item.x === x && item.y === y);
    const positions = [];
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (row !== currentTile.x || col !== currentTile.y) {
          positions.push({ x: row, y: col });
        }
      }
    }
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    const mines = positions.slice(0, numMines);

    mines.forEach(mine => {
      const { x, y } = mine;
      this.board[x][y].isMine = true;
    });

    return mines;
  }


  updateMinesLeft() {
    const rightClickedTiles = this.board.flat().filter(tile => tile.isRightClicked);
    const mineCount = this.numberOfMines - rightClickedTiles.length;
    this.subtext.textContent = content.MINES_LEFT + mineCount;
  }

  checkIfLose(el) {
    if (el.dataset.type === tiles.MINE) {
      this.handleLose();
    }
  }

  checkIfWin() {
    for (let row of this.board) {
      for (let tile of row) {
        if (tile.isUnknown && !tile.isMine) {
          return;
        }
      }
    }
    this.handleWin();
  }


  resetGame() {
    this.isGameOver = false;
    this.clickCount = 0;
    this.firstMove = true;
    this.updateClickCountDisplay();
    this.timer.reset();
    this.clearBoard();
  }

  clearBoard() {
    while (this.boardElement.firstChild) {
      this.boardElement.removeChild(this.boardElement.firstChild);
    }
    this.board = [];
  }
}
