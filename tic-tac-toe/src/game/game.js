export class Game {
    constructor(playerSymbol = 'X', playerName = 'Player', gameMode = 'computer') {
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.playerSymbol = playerSymbol;
        this.playerName = playerName;
        this.gameMode = gameMode;
        this.computerSymbol = playerSymbol === 'X' ? 'O' : 'X';
        this.currentPlayer = { symbol: 'X' }; // Always start with X
        this.winningLine = null;
    }

    reset() {
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.currentPlayer = { symbol: this.playerSymbol };
        this.winningLine = null;
    }

    makeMove(row, col) {
        if (this.board[row][col] === '' && !this.checkWinner()) {
            this.board[row][col] = this.currentPlayer.symbol;
            
            if (!this.checkWinner() && !this.isDraw()) {
                // Only make computer move if in computer mode
                if (this.gameMode === 'computer' && this.currentPlayer.symbol === this.playerSymbol) {
                    this.currentPlayer.symbol = this.computerSymbol;
                    setTimeout(() => this.makeComputerMove(), 500);
                } else {
                    // Switch turns between players
                    this.currentPlayer.symbol = this.currentPlayer.symbol === 'X' ? 'O' : 'X';
                }
            }
            return true;
        }
        return false;
    }

    makeComputerMove() {
        if (this.gameMode !== 'computer') return;
        
        // Computer logic here
        const emptyCells = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[i][j] === '') {
                    emptyCells.push({row: i, col: j});
                }
            }
        }
        
        if (emptyCells.length > 0) {
            const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.board[move.row][move.col] = this.computerSymbol;
            this.currentPlayer.symbol = this.playerSymbol;
        }
    }

    findBestMove(symbol) {
        // Check rows
        for (let i = 0; i < 3; i++) {
            const row = this.board[i];
            if (this.canWin(row, symbol)) {
                const col = row.findIndex(cell => cell === '');
                return {row: i, col: col};
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            const column = [this.board[0][i], this.board[1][i], this.board[2][i]];
            if (this.canWin(column, symbol)) {
                const row = column.findIndex(cell => cell === '');
                return {row: row, col: i};
            }
        }

        // Check diagonals
        const diagonal1 = [this.board[0][0], this.board[1][1], this.board[2][2]];
        if (this.canWin(diagonal1, symbol)) {
            const index = diagonal1.findIndex(cell => cell === '');
            return {row: index, col: index};
        }

        const diagonal2 = [this.board[0][2], this.board[1][1], this.board[2][0]];
        if (this.canWin(diagonal2, symbol)) {
            const index = diagonal2.findIndex(cell => cell === '');
            return {row: index, col: 2 - index};
        }

        return null;
    }

    canWin(line, symbol) {
        const symbolCount = line.filter(cell => cell === symbol).length;
        const emptyCount = line.filter(cell => cell === '').length;
        return symbolCount === 2 && emptyCount === 1;
    }

    checkWinner() {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (this.board[i][0] && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]) {
                this.winningLine = [[i,0], [i,1], [i,2]];
                return this.board[i][0];
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (this.board[0][i] && this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]) {
                this.winningLine = [[0,i], [1,i], [2,i]];
                return this.board[0][i];
            }
        }

        // Check diagonals
        if (this.board[0][0] && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
            this.winningLine = [[0,0], [1,1], [2,2]];
            return this.board[0][0];
        }
        if (this.board[0][2] && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) {
            this.winningLine = [[0,2], [1,1], [2,0]];
            return this.board[0][2];
        }

        return null;
    }

    getWinningLine() {
        return this.winningLine;
    }

    isDraw() {
        return this.board.flat().every(cell => cell !== '') && !this.checkWinner();
    }
}