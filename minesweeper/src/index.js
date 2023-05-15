//the design should be adaptive (or responsive) from (500px <= width).
//It is acceptable to change the appearance for the mobile version (for example, hide the buttons in the burger menu)
//the game should include sound effects for events such as revealing a cell, flagging a cell, and game over (win and lose).
//the latest 10 results are saved in the high score table and can be viewed in any way (for example, by pressing a button)
//implement the functionality to save the game (for example, using localStorage), so that when the page is reloaded, a player can continue from where he left off
//dark/light themes of the game


import './styles/index.css';
import Board from './Board';
import {
  selectors,
  elements,
  classes,
  content,
  sizeProperty
} from './utils/constants';


const createAndAppendElement = (tag, parent, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  parent.appendChild(element);
  return element;
};

function boardCreate(board) {
  board.createBoard().forEach(row => {
    row.forEach(tile => {
      const boardElement = document.querySelector(selectors.BOARD)
      boardElement.append(tile.el)
    })
  })
}

// header
const header = createAndAppendElement(elements.HEADER, document.body, classes.HEADER);
const title = createAndAppendElement(elements.H1, header, classes.TITLE);
const resetButton = createAndAppendElement(elements.BUTTON, header, classes.NEW_GAME_BTN);

resetButton.textContent = content.RESET_BTN_MESSAGE;
title.textContent = content.TITLE;

// main
const main = createAndAppendElement(elements.MAIN, document.body, classes.MAIN);

// counter - section
const counterSection = createAndAppendElement(elements.DIV, main, classes.COUNTER_SECTION);
const timer = createAndAppendElement(elements.P, counterSection, classes.TIMER);
const clickCounter = createAndAppendElement(elements.P, counterSection, classes.CLICK_COUNTER);
const optionsGameSize = createAndAppendElement(elements.SELECT, counterSection, classes.GAME_SIZE_OPTIONS);
const option10 = createAndAppendElement(elements.OPTION, optionsGameSize, classes.GAME_SIZE_OPTION);
const option15 = createAndAppendElement(elements.OPTION, optionsGameSize, classes.GAME_SIZE_OPTION);
const option25 = createAndAppendElement(elements.OPTION, optionsGameSize, classes.GAME_SIZE_OPTION);
option10.textContent = '10 x 10';
option15.textContent = '15 x 15';
option25.textContent = '25 x 25';
option10.value = 10;
option15.value = 15;
option25.value = 25;
const mineCountSlider = createAndAppendElement(elements.INPUT, counterSection, classes.MINE_COUNT_SLIDER);
mineCountSlider.type = 'range';
mineCountSlider.min = '1';
mineCountSlider.max = '99';

timer.textContent = content.TIMER_INITIAL;
clickCounter.textContent = content.CLICK_COUNTER_INITIAL;

// board - section
const boardSection = createAndAppendElement(elements.DIV, main, classes.BOARD_SECTION);
const subtext = createAndAppendElement(elements.P, boardSection, classes.SUBTEXT);
const boardTable = createAndAppendElement(elements.DIV, boardSection, classes.BOARD);

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
   board.loadGame().forEach(row => {
    row.forEach(tile => {
      const boardElement = document.querySelector(selectors.BOARD)
      boardElement.append(tile.el)
    })
  })
}

const saveAndResetGame = () => {
  board.resetGame();
  const selectedSize = parseInt(optionsGameSize.value);
  const selectedMineCount = parseInt(mineCountSlider.value);
  board.size = selectedSize;
  board.numberOfMines = selectedMineCount;
  boardTable.style.setProperty(sizeProperty, selectedSize);
  boardCreate(board);
  subtext.textContent = content.MINES_LEFT + mineCountSlider.value;
  board.saveGame();
};

resetButton.addEventListener('click', saveAndResetGame);

optionsGameSize.addEventListener('change', saveAndResetGame);

mineCountSlider.addEventListener('input', saveAndResetGame);




