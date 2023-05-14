//the design should be adaptive (or responsive) from (500px <= width).
//It is acceptable to change the appearance for the mobile version (for example, hide the buttons in the burger menu)
//the game should include sound effects for events such as revealing a cell, flagging a cell, and game over (win and lose).
//the player should be able to select a difficulty level (easy, medium, hard) which changes the size of the game board and the number of mines
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
  sizeProperty } from './utils/constants';

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
const timer = createAndAppendElement(classes.P, counterSection, classes.TIMER);
const clickCounter = createAndAppendElement(classes.P, counterSection, classes.CLICK_COUNTER);

timer.textContent = content.TIMER_INITIAL;
clickCounter.textContent = content.CLICK_COUNTER_INITIAL;

// board - section
const boardSection = createAndAppendElement(elements.DIV, main, classes.BOARD_SECTION);
const subtext = createAndAppendElement(classes.P, boardSection, classes.SUBTEXT);
const boardTable = createAndAppendElement(elements.DIV, boardSection, classes.BOARD);
boardTable.style.setProperty(sizeProperty, 10);
subtext.textContent = content.MINES_LEFT_INITIAL;

const board = new Board(10, 1);
boardCreate(board);

resetButton.addEventListener('click', () => {
  board.resetGame()
  boardCreate(board);
  subtext.textContent = content.MINES_LEFT_INITIAL;
})






