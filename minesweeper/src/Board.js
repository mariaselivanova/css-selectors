import Tile from './Tile';
import Timer from './Timer';
import Sound from './Sound';
import leftClickSound from './assets/Retro8.ogg';
import rightClickSound from './assets/Retro3.ogg';
import winSound from './assets/Retro10.ogg';
import loseSound from './assets/Modern13.ogg';
import {
  selectors,
  elements,
  classes,
  tiles,
  content
} from './utils/constants';

export default class Board {
  constructor(size, numberOfMines) {
    this.size = size;
    this.numberOfMines = numberOfMines;
    this.board = [];
    this.timer = new Timer(() => this.saveGame());
    this.clickCount = 0;
    this.firstMove = true;
    this.isGameOver = false;
    this.subtext = document.querySelector(selectors.SUBTEXT);
    this.boardElement = document.querySelector(selectors.BOARD);
    this.clickCountElement = document.querySelector(selectors.CLICK_COUNTER);
    this.isDarkTheme = false;
    this.leftClickSound = new Sound(leftClickSound);
    this.rightClickSound = new Sound(rightClickSound);
    this.winSound = new Sound(winSound);
    this.loseSound = new Sound(loseSound);
  }

  toggleSound() {
    this.leftClickSound.toggleMute();
    this.rightClickSound.toggleMute();
    this.winSound.toggleMute();
    this.loseSound.toggleMute();
  }

  checkForOpenedMine() {
    for (const row of this.board) {
      for (const tile of row) {
        if (!tile.isUnknown && tile.isMine) {
          return true;
        }
      }
    }
    return false;
  }

  checkforWinLoad() {
    for (let row of this.board) {
      for (let tile of row) {
        if (tile.isUnknown && !tile.isMine) {
          return;
        }
      }
    }
    this.handlGameOver()
    this.subtext.textContent = content.WIN_MESSAGE.FISRT_PART + this.timer.elapsedTime
      + (this.timer.elapsedTime === 1 ? content.WIN_MESSAGE.SECOND_PART_SINGULAR : content.WIN_MESSAGE.SECOND_PART) + this.clickCount + (this.clickCount === 1 ? content.WIN_MESSAGE.THIRD_PART_SINGULAR : content.WIN_MESSAGE.THIRD_PART);
  }

  loadGame() {
    const savedGameState = localStorage.getItem('gameState');
    if (savedGameState) {
      const {
        size,
        numberOfMines,
        timerElapsed,
        clickCount,
        firstMove,
        isGameOver,
        board: savedBoard,
      } = JSON.parse(savedGameState);
      this.size = size;
      this.numberOfMines = numberOfMines;
      this.timer.elapsedTime = timerElapsed;
      this.clickCount = clickCount;
      this.firstMove = firstMove;
      this.isGameOver = isGameOver;
      this.updateClickCountDisplay();
      this.board = Array.from(savedBoard, row => {
        return row.map(element => {
          const el = document.createElement(elements.DIV);
          if (element.isUnknown) {
            el.dataset.type = tiles.UNKNOWN;
          } else if (element.isMine) {
            el.dataset.type = tiles.MINE;
          } else {
            el.dataset.type = tiles.NUMBER;
          }
          el.classList.add(classes.TILE);
          const tile = new Tile(element.x, element.y, el, element.isMine, element.isUnknown, element.isRightClicked, element.number);
          el.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.handleRightClick(tile);
          });
          el.addEventListener('click', () => {
            this.handleLeftClick(tile, el);
          });
          return tile;
        });
      });

      if (this.checkForOpenedMine()) {
        this.handlGameOver()
        this.subtext.textContent = content.GAME_OVER_MESSAGE;
        const mines = this.board.flat().filter(tile => tile.isMine);
        mines.forEach(mine => {
          mine.el.dataset.type = tiles.MINE
          mine.el.textContent = ''
        })
      }
      this.checkforWinLoad();
      this.timer.updateDisplay();
      if (timerElapsed !== 0 && !this.isGameOver) {
        this.timer.continue();
      }
    }
    return this.board
  }

  saveGame() {
    const gameState = {
      size: this.size,
      numberOfMines: this.numberOfMines,
      timerElapsed: this.timer.elapsedTime,
      clickCount: this.clickCount,
      firstMove: this.firstMove,
      isGameOver: this.isGameOver,
      board: this.board
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }

  checkifTimer() {
    if (!this.timer.timer) {
      this.timer.start();
    }
  }

  checkIfMines(mines, x, y) {
    return mines.some(mine => mine.x === x && mine.y === y);
  }

  updateClickCountDisplay() {
    this.clickCountElement.textContent = content.CLICK_COUNTER + this.clickCount;
  }

  clearBoard() {
    while (this.boardElement.firstChild) {
      this.boardElement.removeChild(this.boardElement.firstChild);
    }
    this.board = [];
  }

  openTile(board, tile) {

    if (!tile.isUnknown) {
      return;
    }

    const neighbourTiles = this.findNeighbourTiles(board, tile);
    const neighbourMines = neighbourTiles.filter(adjacentTile => adjacentTile.isMine);

    if (tile.isMine) {
      tile.reveal(neighbourMines.length);
    } else {
      tile.reveal(neighbourMines.length);
      if (neighbourMines.length === 0) {
        neighbourTiles.forEach(tile => {
          if (tile.isUnknown && !tile.isRightClicked) {
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
        const tile = new Tile(x, y, el, false, true, false);
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
    if (this.isGameOver || !tile.isUnknown) return
    this.rightClickSound.play();
    this.checkifTimer();
    tile.toggleMark();
    this.updateMinesLeft();
    this.saveGame()
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
    if (tile.isUnknown && !tile.isRightClicked) {
      this.checkifTimer();
      this.clickCount++;
      this.updateClickCountDisplay()
      this.openTile(this.board, tile)
      this.checkIfWin();
      this.checkIfLose(el);
      this.saveGame()
      if (!this.isGameOver) {
        this.leftClickSound.play()
      }
    }
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
    localStorage.removeItem('gameState');
    this.isGameOver = false;
    this.clickCount = 0;
    this.firstMove = true;
    this.updateClickCountDisplay();
    this.timer.reset();
    this.clearBoard();
  }

  handleWin() {
    this.handlGameOver()
    this.subtext.textContent = content.WIN_MESSAGE.FISRT_PART + this.timer.elapsedTime
      + (this.timer.elapsedTime === 1 ?content.WIN_MESSAGE.SECOND_PART_SINGULAR : content.WIN_MESSAGE.SECOND_PART) + this.clickCount + (this.clickCount === 1 ? content.WIN_MESSAGE.THIRD_PART_SINGULAR : content.WIN_MESSAGE.THIRD_PART);
    this.addScore('WIN 🏆', this.clickCount, this.timer.elapsedTime, this.size, this.numberOfMines)
    this.winSound.play();

  }

  handleLose() {
    this.handlGameOver();
    this.loseSound.play();
    this.subtext.textContent = content.GAME_OVER_MESSAGE;
    const mines = this.board.flat().filter(tile => tile.isMine);
    mines.forEach(mine => {
      mine.el.dataset.type = tiles.MINE
      mine.el.textContent = ''
    })
  }

  handlGameOver() {
    this.isGameOver = true;
    this.timer.stop();
    const unknownTiles = document.querySelectorAll(selectors.UNKNOWN_TILES);
    unknownTiles.forEach(tile => {
      tile.classList.add(classes.DEFAULT_CURSOR);
    });
  }

  addScore(gameStatus, numOfClicks, time, boardSize, numberOfMines) {
    let scores = JSON.parse(localStorage.getItem('lastTenScores'))
    if (!scores) {
      scores = [];
    }
    const elapsedTime = `${time}s`
    const boardSizeFormat = `${boardSize} x ${boardSize}`
    const gameStatistics = { gameStatus, numOfClicks, elapsedTime, boardSizeFormat, numberOfMines };
    scores.push(gameStatistics);
    const lastTenResults = scores.slice(-10);
    console.log(lastTenResults)
    localStorage.setItem("lastTenScores", JSON.stringify(lastTenResults))
  }
}
