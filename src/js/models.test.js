import { describe, test, expect } from '@jest/globals';
import { Board } from './models';

describe('Board model', () => {
  test('Board initialises with empty positions', () => {
    const board = new Board();
    board.positions.forEach((i) => {
      expect(i).toBeFalsy();
    });
  });

  test('Board inits with 9 available positions', () => {
    const board = new Board();
    expect(board.positions.length).toBe(9);
  });

  test('Board correctly identifies a win', () => {
    // Positions for three winning games via rows, cols and diagonals
    const wins = [[
      1, 2, '',
      1, 1, 2,
      2, 2, 1,
    ], [
      '', 2, 1,
      1,  2, 1,
      1,  2, '',
    ], [
      '', 2,  2,
      1,  1,  1,
      '', '', '',
    ]];

    // Test each game
    wins.forEach((moves) => {
      const board = new Board();
      const [p1, p2] = board.players;

      // Add each position to the board
      moves.forEach((move, position) => {
        let player;

        if (move === 1) player = p1;
        else if (move === 2) player = p2;

        if (player) {  // Skips positions with empty strings
          board.updatePositions({ player, position });
        }
      });

      expect(board.isWon()).toBeTruthy();
    });
  });

  test('Board correctly identifies a non-win', () => {
    const draws = [[
      1, 2,  '',
      1, '', 2,
      2, 2,  1,
    ], [
      '', 2,  1,
      1,  '', 1,
      1,  2,  '',
    ], [
      '', 2,  2,
      '', 1,  1,
      '', '', '',
    ]];

    // Test each game
    draws.forEach((moves) => {
      const board = new Board();
      // const [p1, p2] = board.players;

      // Add each position to the board
      moves.forEach((move, position) => {
        let player;

        if (move === 1) player = board.players[0];
        else if (move === 2) player = board.players[1];

        if (player) {  // Skips positions with empty strings
          board.updatePositions({ player, position });
        }
      });

      expect(board.isWon()).toBeFalsy();
    });
  });

  test('Board correctly identifies who the winner is', () => {
    const wins = [
      {
        winner: 1,
        moves: [
          1, 2, '',
          1, 1, 2,
          2, 2, 1,
        ],
      }, {
        winner: 2,
        moves: [
          '', 2, 1,
          1,  2, 1,
          1,  2, '',
        ],
      }, {
        winner: 1,
        moves: [
          '', 2,  2,
          1,  1,  1,
          '', '', '',
        ],
      },
    ];

    // Test each game
    wins.forEach((game) => {
      const board = new Board();
      let winner;

      if (game.winner === 1) {
        winner = board.players[0];
      } else {
        winner = board.players[1];
      }

      // Add each position to the board
      game.moves.forEach((move, position) => {
        let player;

        if (move === 1) player = board.players[0];
        else if (move === 2) player = board.players[1];

        if (player) {  // Skips positions with empty strings
          board.updatePositions({ player, position });
        }
      });

      expect(board.getWinner()).toBe(winner);
    });
  });
});
