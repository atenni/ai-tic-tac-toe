export class Player {
  constructor(symbol) {
    this.symbol = symbol;
  }
}
export class Board {
  constructor(players = [new Player("x"), new Player("o")]) {
    this.pieces = [null, null, null, null, null, null, null, null, null];
    this.players = players;
  }
}
const board = new Board();
board.pieces[2] = "3";
