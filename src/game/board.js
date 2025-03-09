class Board {
    constructor() {
        this.cells = Array(9).fill(null);
    }

    render() {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = '';
        this.cells.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;
            cellElement.dataset.index = index;
            boardElement.appendChild(cellElement);
        });
    }

    makeMove(index, symbol) {
        if (!this.cells[index]) {
            this.cells[index] = symbol;
            this.render();
            return true;
        }
        return false;
    }

    checkWin() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (this.cells[a] && this.cells[a] === this.cells[b] && this.cells[a] === this.cells[c]) {
                return this.cells[a];
            }
        }
        return null;
    }

    reset() {
        this.cells.fill(null);
        this.render();
    }
}

export default Board;