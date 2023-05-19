import './styles/index.css';
import Board from './Board';
import Theme from './Theme';
import Results from './Results';
import {
  selectors,
  elements,
  classes,
  content,
  sizeProperty,
  RANGE
} from './utils/constants';

const createAndAppendElement = (tag, parent, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  parent.appendChild(element);
  return element;
}

function boardCreate(board) {
  board.createBoard().forEach(row => {
    row.forEach(tile => {
      const boardElement = document.querySelector(selectors.BOARD)
      boardElement.append(tile.el)
    })
  })
}

function updateResults(results) {
  results.getResults().forEach(game => {
    const tableRow = createAndAppendElement(elements.TR, tableBody, classes.TR);
    const { gameStatus, numOfClicks, elapsedTime, boardSizeFormat, numberOfMines } = game;
    const gameData = [gameStatus, numOfClicks, elapsedTime, boardSizeFormat, numberOfMines];
    gameData.forEach(data => {
      const tableCell = createAndAppendElement(elements.TD, tableRow, classes.TD);
      tableCell.textContent = data;
    });
  })
}

// header
const header = createAndAppendElement(elements.HEADER, document.body, classes.HEADER);
const title = createAndAppendElement(elements.H1, header, classes.TITLE);
title.textContent = content.TITLE;

// main
const main = createAndAppendElement(elements.MAIN, document.body, classes.MAIN);

// score - section
const scoreSection = createAndAppendElement(elements.DIV, main, classes.SCORE_SECTION);
const resultsTable = createAndAppendElement(elements.TABLE, scoreSection, classes.RESULTS_TABLE);
const tableHeader = createAndAppendElement(elements.THEAD, resultsTable, classes.THEAD);
const tableRowHeader = createAndAppendElement(elements.TR, tableHeader, classes.TR);
const headerCells = [content.RESULT, content.CLICKS, content.TIME, content.SIZE, content.MINES];
headerCells.forEach(headerText => {
  const headerCell = createAndAppendElement(elements.TH, tableRowHeader, classes.TH);
  headerCell.textContent = headerText;
});
const tableBody = createAndAppendElement(elements.TBODY, resultsTable, classes.TABLE_BODY);

// board - section
const boardSection = createAndAppendElement(elements.DIV, main, classes.BOARD_SECTION);
const subtext = createAndAppendElement(elements.P, boardSection, classes.SUBTEXT);
const sliderWrapper = createAndAppendElement(elements.DIV, boardSection, classes.SLIDER_WRAPPER);
const mineCountSlider = createAndAppendElement(elements.INPUT, sliderWrapper, classes.MINE_COUNT_SLIDER);
mineCountSlider.type = RANGE;
mineCountSlider.min = '1';
mineCountSlider.max = '99';
const sliderText = createAndAppendElement(elements.P, sliderWrapper, classes.SLIDER_TEXT);
const boardTable = createAndAppendElement(elements.DIV, boardSection, classes.BOARD);
const optionsWrapper = createAndAppendElement(elements.DIV, boardSection, classes.OPTIONS_WRAPPER);
const sizeWrapper = createAndAppendElement(elements.DIV, optionsWrapper, classes.SIZE_WRAPPER);
const optionsGameSizeText = createAndAppendElement(elements.P, sizeWrapper, classes.GAME_SIZE_OPTIONS_TEXT);
optionsGameSizeText.textContent = content.SIZE_OPTIONS;
const optionsGameSize = createAndAppendElement(elements.SELECT, sizeWrapper, classes.GAME_SIZE_OPTIONS);
const option10 = createAndAppendElement(elements.OPTION, optionsGameSize, classes.GAME_SIZE_OPTION);
const option15 = createAndAppendElement(elements.OPTION, optionsGameSize, classes.GAME_SIZE_OPTION);
const option25 = createAndAppendElement(elements.OPTION, optionsGameSize, classes.GAME_SIZE_OPTION);
option10.textContent = '10 x 10';
option15.textContent = '15 x 15';
option25.textContent = '25 x 25';
option10.value = 10;
option15.value = 15;
option25.value = 25;
const themeBtn = createAndAppendElement(elements.BUTTON, optionsWrapper, classes.CHANGE_THEME_BTN);
const changeSoundBtn = createAndAppendElement(elements.BUTTON, optionsWrapper, classes.CHANGE_SOUND_BTN);
const wrapper = createAndAppendElement(elements.DIV, boardSection, classes.WRAPPER);
const btnWrapper = createAndAppendElement(elements.DIV, wrapper, classes.BTN_WRAPPER);
const resetButton = createAndAppendElement(elements.BUTTON, btnWrapper, classes.NEW_GAME_BTN);
resetButton.textContent = content.RESET_BTN_MESSAGE;
const checkResultsButton = createAndAppendElement(elements.BUTTON, btnWrapper, classes.CHECK_RESULTS_BTN);
checkResultsButton.textContent = content.SHOW_RES;
const counterWrapper = createAndAppendElement(elements.DIV, wrapper, classes.COUNTER_WRAPPER);
const timer = createAndAppendElement(elements.P, counterWrapper, classes.TIMER);
const clickCounter = createAndAppendElement(elements.P, counterWrapper, classes.CLICK_COUNTER);
timer.textContent = content.TIMER_INITIAL;
clickCounter.textContent = content.CLICK_COUNTER_INITIAL;

// create board
const savedGameState = localStorage.getItem('gameState');
let board;

if (!savedGameState) {
  mineCountSlider.value = '10';
  option10.selected = true;
  const selectedSize = parseInt(optionsGameSize.value);
  const selectedMineCount = parseInt(mineCountSlider.value);
  board = new Board(selectedSize, selectedMineCount);
  boardCreate(board);
  boardTable.style.setProperty(sizeProperty, optionsGameSize.value);
  subtext.textContent = content.MINES_LEFT_INITIAL;
  sliderText.textContent = content.MINES_INITIAL;
} else {
  const { size, numberOfMines } = JSON.parse(savedGameState);
  board = new Board(size, numberOfMines);
  boardTable.style.setProperty(sizeProperty, size);
  mineCountSlider.value = numberOfMines
  if (size == 10) {
    option10.selected = true;
  } else if (size == 15) {
    option15.selected = true;
  } else if (size == 25) {
    option25.selected = true;
  }
  subtext.textContent = content.MINES_LEFT + numberOfMines;
  sliderText.textContent = content.MINES_RANGE + numberOfMines;
  board.loadGame().forEach(row => {
    row.forEach(tile => {
      const boardElement = document.querySelector(selectors.BOARD)
      boardElement.append(tile.el)
      if (tile.isUnknown && board.isGameOver) {
        tile.el.classList.add(classes.DEFAULT_CURSOR)
      }
    })
  })
}

const results = new Results();
const theme = new Theme();
themeBtn.addEventListener('click', () => {
  theme.toggleTheme();
})

const saveAndResetGame = () => {
  board.resetGame();
  const selectedSize = parseInt(optionsGameSize.value);
  const selectedMineCount = parseInt(mineCountSlider.value);
  board.size = selectedSize;
  board.numberOfMines = selectedMineCount;
  boardTable.style.setProperty(sizeProperty, selectedSize);
  boardCreate(board);
  subtext.textContent = content.MINES_LEFT + mineCountSlider.value;
  sliderText.textContent = content.MINES_RANGE + mineCountSlider.value;
  board.saveGame();
  tableBody.innerHTML = '';
  updateResults(results)
};

updateResults(results);

let showResults;

checkResultsButton.addEventListener('click', () => {
  resultsTable.classList.toggle('table-visible')
  showResults = !showResults;
  if (showResults) {
    checkResultsButton.textContent = 'hide results';
  } else {
    checkResultsButton.textContent = 'show results';
  }
})

changeSoundBtn.addEventListener('click', () => {
  board.toggleSound();
  changeSoundBtn.classList.toggle('sound-off');
})

resetButton.addEventListener('click', saveAndResetGame);
optionsGameSize.addEventListener('change', saveAndResetGame);
mineCountSlider.addEventListener('input', saveAndResetGame);

