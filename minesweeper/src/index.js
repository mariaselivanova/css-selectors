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

const boardSection = createAndAppendElement('div', main, 'board-section');
const subtext = createAndAppendElement('p', boardSection, 'subtext');
subtext.textContent = 'You Lose';

const boardTable = createAndAppendElement('div', boardSection, 'board');
boardTable.style.setProperty('--size', 25)

const board = new Board(25, 20)
board.createBoard().forEach(row => {
  row.forEach(tile => {
    const boardElement = document.querySelector('.board')
    boardElement.append(tile.el)
  })
})






