import { Game } from '../src/game/game';

describe('Game', () => {
    let game;

    beforeEach(() => {
        game = new Game();
    });

    test('should initialize with an empty board', () => {
        expect(game.board).toEqual([
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]);
    });

    test('should switch turns after a move', () => {
        game.makeMove(0, 0); // Player X
        expect(game.currentPlayer.symbol).toBe('O');
        game.makeMove(1, 1); // Player O
        expect(game.currentPlayer.symbol).toBe('X');
    });

    test('should declare a winner', () => {
        game.makeMove(0, 0); // X
        game.makeMove(1, 0); // O
        game.makeMove(0, 1); // X
        game.makeMove(1, 1); // O
        game.makeMove(0, 2); // X
        expect(game.checkWinner()).toBe('X');
    });

    test('should declare a draw', () => {
        game.makeMove(0, 0); // X
        game.makeMove(0, 1); // O
        game.makeMove(0, 2); // X
        game.makeMove(1, 0); // O
        game.makeMove(1, 1); // X
        game.makeMove(1, 2); // O
        game.makeMove(2, 0); // X
        game.makeMove(2, 1); // O
        game.makeMove(2, 2); // X
        expect(game.checkWinner()).toBe(null);
        expect(game.isDraw()).toBe(true);
    });
});