//TODO: поправить клик на resetGame

import './styles/index.css';
import Board from './Board';

const createAndAppendElement = (tag, parent, className = '') => {
  const element = document.createElement(tag);
  element.classList.add(className);
  parent.appendChild(element);
  return element;
};

const header = createAndAppendElement('header', document.body, 'header');
const title = createAndAppendElement('h1', header, 'title');
title.textContent = 'Minesweeper';

const main = createAndAppendElement('main', document.body, 'main');

const counterSection = createAndAppendElement('div', main, 'counter-section');
//Timer
const timer = createAndAppendElement('p', counterSection, 'timer');
timer.textContent = "Timer: 0s";
//Click-counter
const clickCounter = createAndAppendElement('p', counterSection, 'click-counter')
clickCounter.textContent ="Click counter: 0"

const boardSection = createAndAppendElement('div', main, 'board-section');
const subtext = createAndAppendElement('p', boardSection, 'subtext');
subtext.textContent = 'Mines left: 10';

const boardTable = createAndAppendElement('div', boardSection, 'board');
boardTable.style.setProperty('--size', 2)
const resetButton = createAndAppendElement('button', header, 'new-game-btn');
resetButton.textContent = "Start over"

const board = new Board(2, 1)
board.createBoard().forEach(row => {
  row.forEach(tile => {
    const boardElement = document.querySelector('.board')
    boardElement.append(tile.el)
  })
})

resetButton.addEventListener('click', () => {
  board.resetGame()
  board.createBoard().forEach(row => {
    row.forEach(tile => {
      const boardElement = document.querySelector('.board')
      boardElement.append(tile.el)
    })
  })
})






