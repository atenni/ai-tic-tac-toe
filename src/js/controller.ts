import { Board } from "./models";

let board = new Board();

/**
 * Controller for a game. Connects the UI to the Model.
 */
class Game {
  board: Board;

  constructor() {

  }

  isWon() {

  }
}

/**
 * Receives input from the view, updates the model.
 * @param event
 */
const makeMove = (event: Event) => {
  const move = {
    player: '',  // TODO: get from event
    position: 0, // TODO: get from event
  };

  board.updatePositions(move);
};

const resetGame = (event: Event) => {
  board = new Board();  // TODO: make this something legit...
};

const handleClick = (event: Event) => {
  if (event.target instanceof Element) {
    // Target is an Element, so `matches()` makes sense
    if (event.target.matches('.ttt__board button')) makeMove(event);
    if (event.target.matches('.ttt__feedback')) resetGame(event);
  }
};

export default handleClick;
