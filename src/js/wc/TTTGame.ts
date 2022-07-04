/**
 * TODO:
 *  - Prevent already played squares from being updated
 *  - Add reset button
 */
import sounds from "../sounds.js";
import { TTTSquare } from "./tttSquare.js";
import getAIMove from "../AIEngine.js";

export interface Move {
  player: "x" | "o";
  square: number;
}

const styles = `
  :host {
    background-color: var(--gray-100);
    border: 1px solid var(--game-border-color);
    box-shadow: var(--game-box-shadow);
    padding: 2rem 3rem;
  }

  :host([data-current-player="x"]) {
    --bg-player-x: var(--gray-300);
    --bg-player-o: transparent;
    
    --border-player-x: 1px solid var(--gray-200);
    --border-player-o: none;
  }

  :host([data-current-player="o"]) {
    --bg-player-x: transparent;
    --bg-player-o: var(--gray-300);

    --border-player-x: none;
    --border-player-o: 1px solid var(--gray-200);
  }

  ::slotted([slot="feedback"]) {
    text-align: center;
  }
  
  ::slotted([slot="reset"]) {
    width: 100%;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.4rem;

    padding: 0.4rem;
    
    color: var(--gray-700);
    background: var(--gray-100);
    border: 1px solid var(--gray-400);
    transition: all 100ms ease-in-out;
  }
  ::slotted([slot="reset"]:hover) {
    color: var(--gray-900);
    background: var(--gray-75);
    border: 1px solid var(--gray-500);

    box-shadow: var(--reset-button-hover-shadow);
  }
`;

class TTTGame extends HTMLElement {
  game: GamePlay;
  welcomeMessages = [
    "Welcome to Tic Tac Toe! It's your turn.",
    "Click on a square to start.",
    "Good luck!",
    "Have fun!",
    "Let's play!",
    "Let's play Tic Tac Toe!",
    "It's your turn!",
    "Let's go player X!",
    "Get 3 in a row to win!",
    "Here we go!",
    "Player X goes first",
  ];

  constructor() {
    super();

    // Attach web components
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>${styles}</style>
      <slot name="scoreboard"></slot>
      <slot name="board"></slot>
      <slot name="feedback"></slot>
      <slot name="reset"></slot>
    `;

    // Initialise the game
    this.game = new GamePlay();
    this.initBoard();
  }

  get squares() {
    return this.querySelectorAll<TTTSquare>("ttt-square");
  }

  get randomWelcomeMessage() {
    return this
      .welcomeMessages[Math.floor(Math.random() * this.welcomeMessages.length)];
  }

  /**
   * 1. Add a click handler to each square
   * 2. Add a click handler to the reset button
   * 3. Set current player to 'x'
   * 4. Update game feedback
   */
  initBoard() {
    const squareElms = this.querySelectorAll<TTTSquare>("ttt-square");
    squareElms.forEach((squareElm) => {
      // Add click handler to each square
      squareElm.addEventListener("click", this.squareClickHandler.bind(this), {
        passive: true,
      });
    });

    // Add click handler to the reset button
    const resetElm = this.querySelector('[slot="reset"]') as HTMLButtonElement;
    resetElm.addEventListener("click", this.resetClickHandler.bind(this), {
      passive: true,
    });

    // Set current player to 'x'
    this.dataset.currentPlayer = "x";

    // Update game feedback
    this.updateGameFeedback(this.randomWelcomeMessage);
  }

  resetBoard() {
    this.game = new GamePlay();
    this.dataset.currentPlayer = "x";
    this.updateGameFeedback(this.randomWelcomeMessage);
    this.squares.forEach((square, index) => {
      setTimeout(() => {
        square.setAttribute("value", "");
        square.classList.remove("winning-square");
      }, index * 50);
    });
  }

  updateCurrentPlayer() {
    if (this.game.isFinished) {
      this.dataset.currentPlayer = "";
    } else {
      this.dataset.currentPlayer = this.game.currentPlayer;
    }
  }

  updateGameFeedback(message: string = "") {
    const feedbackElm = this.querySelector(
      '[slot="feedback"]',
    ) as HTMLParagraphElement;

    feedbackElm.textContent = message ? message : this.game.getGameStatus();
  }

  squareClickHandler(evt: Event) {
    if (this.game.isFinished) return;
    if (this.game.currentPlayer === "o") return; // Currently AI's turn

    const player = this.game.currentPlayer;
    const square = Number((evt.target as TTTSquare).dataset.square);

    sounds.click("heavy");
    this.processMove({ player, square });
  }

  resetClickHandler(_evt: Event) {
    sounds.reset();
    this.resetBoard();
  }

  processMove(move: Move) {
    // If game is finished, do nothing
    if (this.game.isFinished) return;

    // Try to add move. Return early if move is invalid.
    try {
      this.game.addMove(move);
    } catch (e) {
      let message;
      if (e instanceof Error) message = e.message;
      else message = String(e);
      this.updateGameFeedback(message);
      return;
    }

    // Mark square as played
    const squareElms = this.querySelectorAll<TTTSquare>("ttt-square");
    squareElms[move.square - 1].setAttribute("value", move.player);

    this.updateCurrentPlayer();

    this.updateGameFeedback();

    // Mark winning squares if game has a winner, and return
    if (["x", "o"].includes(this.game.winner.player ?? "")) {
      const winningSquares = this.game.winner.squares;
      sounds.winner();
      this.game.highlightWinningSquares(winningSquares);
      return;
    }

    // Start AI move if it's now their turn, and the game is not finished
    if (this.game.currentPlayer === "o" && !this.game.isFinished) {
      setTimeout(() => {
        this.addAIMove();
      }, 1000); // + (Math.random() * 4000));
    }
  }

  addAIMove() {
    const move = getAIMove([...this.game.moves]);
    sounds.click();
    this.processMove(move);
  }
}

/** An object representing the current state of the game */
export class GamePlay {
  moves: Move[];
  // result: "✕ wins!" | "◯ wins!" | "Tie" | "Game in progress…";

  constructor(moves: Move[] = []) {
    this.moves = moves;
    // this.result = this.getGameStatus()
  }

  addMove(move: Move) {
    if (!this.isValidMove(move)[0]) {
      throw new Error(this.isValidMove(move)[1]);
    }
    this.moves.push(move);
  }

  get currentPlayer(): "x" | "o" {
    if (this.moves.length === 0) return "x";
    return this.moves.at(-1)!.player === "x" ? "o" : "x";
  }

  isValidMove(move: Move): [Boolean, string] {
    let [isValid, message] = [true, ""];

    if (move.square <= 0 || move.square > 9) {
      [isValid, message] = [false, "Invalid square"];
    } else if (move.player !== this.currentPlayer) {
      [isValid, message] = [false, `It's not ${move.player}'s turn`];
    } else if (move.player !== "x" && this.moves.length === 0) {
      [isValid, message] = [false, "Player x goes first (currently)"];
    } else if (this.moves.map((move) => move.square).includes(move.square)) {
      [isValid, message] = [false, "That square has already been played"];
    }
    return [isValid, message];
  }

  getGameStatus(): "✕ wins!" | "◯ wins!" | "Tie" | "Game in progress…" {
    if (["x", "o"].includes(this.winner.player ?? "")) {
      // Winner found
      return this.winner.player === "x" ? "✕ wins!" : "◯ wins!";
    } else if (this.moves.length >= 9) {
      // Game was a draw
      return "Tie";
    } else {
      // ...otherwise game still in progress
      return "Game in progress…";
    }
  }

  /** Includes side effect of updating this.result */
  get isFinished(): Boolean {
    return this.getGameStatus() !== "Game in progress…";
  }

  get availableSquares(): number[] {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((square) => {
      return !this.moves.map((move) => move.square).includes(square);
    });
  }

  highlightWinningSquares(moves: number[] = []) {
    const squares = document.querySelectorAll("ttt-square");

    moves.forEach((squareIndex) => {
      squares[squareIndex - 1].classList.add("winning-square");
    });
  }

  get winner(): {
    player: "x" | "o" | undefined;
    squares: number[] | undefined;
  } {
    let player = undefined;
    let squares = undefined;

    const winningCombinations = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    const xPositions: number[] = [];
    const oPositions: number[] = [];

    this.moves.forEach((move) => {
      if (move.player === "x") {
        xPositions.push(move.square);
      } else if (move.player === "o") {
        oPositions.push(move.square);
      }
    });

    winningCombinations.forEach((combination) => {
      if (combination.every((square) => xPositions.includes(square))) {
        player = "x";
        squares = combination;
      } else if (combination.every((square) => oPositions.includes(square))) {
        player = "o";
        squares = combination;
      }
    });

    return { player, squares };
  }
}

customElements.define("ttt-game", TTTGame);
