// src/index.js

import { Game } from './game/game.js';

let game;
let gameMode;
let playerName;
let playerSymbol;
const board = document.getElementById('board');
const playerSetup = document.getElementById('player-setup');
const gameModeSelect = document.getElementById('game-mode-select');
const gameBoard = document.getElementById('game-board');
const currentPlayerDisplay = document.getElementById('current-player-display');
const currentPlayerSymbol = document.getElementById('current-player');
const statusDisplay = document.getElementById('status');

function createBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => handleMove(i, j));
            board.appendChild(cell);
        }
    }
}

function handleMove(row, col) {
    if (game.makeMove(row, col)) {
        updateBoard();
        const winner = game.checkWinner();
        if (winner) {
            let winnerName;
            if (gameMode === 'computer') {
                winnerName = winner === game.playerSymbol ? game.playerName : 'Computer';
            } else {
                winnerName = `Player ${winner}`;
            }
            statusDisplay.textContent = `${winnerName} wins!`;
            highlightWinningCells(game.getWinningLine());
        } else if (game.isDraw()) {
            statusDisplay.textContent = "It's a draw!";
        } else {
            updatePlayerDisplay();
        }
    }
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    game.board.flat().forEach((value, index) => {
        cells[index].textContent = value;
        cells[index].className = 'cell ' + (value.toLowerCase() || '');
    });
}

function highlightWinningCells(winningLine) {
    if (!winningLine) return;
    winningLine.forEach(([row, col]) => {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.classList.add('winning-line');
    });
}

function updatePlayerDisplay() {
    if (gameMode === 'computer') {
        currentPlayerDisplay.textContent = game.currentPlayer.symbol === game.playerSymbol ? 
            game.playerName : 'Computer';
    } else {
        currentPlayerDisplay.textContent = `Player ${game.currentPlayer.symbol}`;
    }
    currentPlayerSymbol.textContent = game.currentPlayer.symbol;
}

window.selectSymbol = function(symbol) {
    const nameInput = document.getElementById('player-name').value.trim();
    if (!nameInput) {
        alert('Please enter your name first!');
        return;
    }
    playerName = nameInput;
    playerSymbol = symbol;
    playerSetup.style.display = 'none';
    gameModeSelect.style.display = 'block';
}

window.startGame = function(mode) {
    gameMode = mode;
    game = new Game(playerSymbol, playerName, mode);
    gameModeSelect.style.display = 'none';
    gameBoard.style.display = 'block';
    createBoard();
    updatePlayerDisplay();
}

window.resetGame = function() {
    game = null;
    gameMode = null;
    playerName = null;
    playerSymbol = null;
    playerSetup.style.display = 'block';
    gameModeSelect.style.display = 'none';
    gameBoard.style.display = 'none';
    statusDisplay.textContent = '';
    document.getElementById('player-name').value = '';
};