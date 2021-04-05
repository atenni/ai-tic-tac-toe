import { winningPatterns3x3 } from './utils';

interface Move {
  player: string,
  position: number
}

type Subscribers = Array<(board: Board) => void>;

/**
 * A Board represents the current state of players moves in a Game.
 */
export class Board {
  positions: Array<string>;
  players: Array<string> = ['x', 'o'];
  subscribers: Subscribers;
  // winner: string = '';

  constructor(subscribers: Subscribers = []) {
    this.subscribers = subscribers;
    this.positions = new Array(9).fill('');
  }

  updatePositions(move: Move) {
    this.positions[move.position] = move.player;
    this.subscribers.forEach((cb) => cb(this));
  }

  getWinner(): string {
    const winnerChecks = [
      this.#colsHaveWinner(),
      this.#rowsHaveWinner(),
      this.#diagonalsHaveWinner(),
    ];

    for (const check of winnerChecks) {
      if (check.hasWinner) {
        return check.player;
      }
    }

    return '';
  }

  isWon(): boolean {
    return this.getWinner() !== '';
  }

  // @ts-ignore
  #colsHaveWinner(): { hasWinner: boolean, player: string } {
    const result = { hasWinner: false, player: '' };
    const colIndexes = [0, 1, 2];

    colIndexes.forEach((colIndex) => {
      const col = [
        this.positions[colIndex],
        this.positions[colIndex + 3],
        this.positions[colIndex + 6],
      ];

      this.players.forEach((player) => {
        if (col.every((playerPosition) => playerPosition === player)) {
          result.hasWinner = true;
          result.player = player;
        }
      });
    });

    return result;
  }

  // @ts-ignore
  #rowsHaveWinner(): { hasWinner: boolean, player: string } {
    const result = { hasWinner: false, player: '' };
    const rowIndexes = [0, 3, 6];

    rowIndexes.forEach((rowIndex) => {
      const row = [
        this.positions[rowIndex],
        this.positions[rowIndex + 1],
        this.positions[rowIndex + 2],
      ];

      this.players.forEach((player) => {
        if (row.every((playerPosition) => playerPosition === player)) {
          result.hasWinner = true;
          result.player = player;
        }
      });
    });

    return result;
  }

  // @ts-ignore
  #diagonalsHaveWinner(): { hasWinner: boolean, player: string } {
    const result = { hasWinner: false, player: '' };
    const diagonals = [
      { index: 0, increment: 4 },
      { index: 2, increment: 2 },
    ];

    diagonals.forEach(({ index, increment }) => {
      const diagonal = [
        this.positions[index],
        this.positions[index + increment],
        this.positions[index + increment + increment],
      ];

      this.players.forEach((player) => {
        if (diagonal.every((playerPosition) => playerPosition === player)) {
          result.hasWinner = true;
          result.player = player;
        }
      });
    });

    return result;
  }
}

// /**
//  * A Player represents a player of a Game.
//  */
// export class Player {
//   symbol: string;
//
//   constructor(symbol: string) {
//     this.symbol = symbol;
//   }
// }
//
// /**
//  * A Game represents Players interacting with a Board. It knows whose turn is
//  * next, and if the current state of the Board is in progress or won.
//  */
// export class Game {
//   players: Array<Player>;
//   board: Board;
//   inProgress = true;
//   winner: Player | undefined;
//
//   constructor(
//     players: Player | Array<Player> = [new Player('x'), new Player('o')],
//     board: Board = new Board(),
//   ) {
//     this.players = [players].flat();
//     this.board = board;
//   }
//
//   hasWinner(): boolean {
//     // TODO: this is a bit of a mess. Simplify. Combine logic with `this.winner`.
//     //       Use get/set accessor methods.
//     let hasWinner = false;
//
//     for (const player of this.players) {
//       for (const winningPattern of winningPatterns3x3) {
//         hasWinner = winningPattern.every(
//           (position) => this.board.positions[position] === player.symbol,
//         );
//
//         if (hasWinner) {
//           this.winner = player;
//           return hasWinner;
//         }
//       }
//     }
//     return hasWinner;
//   }
//
//   addMove(player: Player, position: number): void {
//     if (!this.board.positions[position]) {
//       this.board.positions[position] = player.symbol;
//     }
//   }

// getPlayersMoves() {
//   const playersMoves = {};
//   this.players.forEach((player) => {
//     playersMoves[player] = this.board.positions.map((move, i) => {
//       return move === player.symbol ? i : null;
//     });
//   });
//   return playersMoves;
// }
// }

// TEMP STUFF...
// const board = new Board();
// board.positions[2] = '3';
