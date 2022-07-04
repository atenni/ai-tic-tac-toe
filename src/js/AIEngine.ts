/** More a brute force algorithm than AI... */
import { GamePlay } from "./wc/TTTGame.js";
import type { Move } from "./wc/TTTGame.js";

export default function getAIMove(gameState: Move[]): Move {
  const gs = new GamePlay(gameState);
  const nextMoveIndex = gs.moves.length;

  // Create 10000 full games
  const fullGamesArr = createSimulatedGames([...gameState], 50000);

  const bestNextMove: Move = getBestNextMoveFromWonGames(
    fullGamesArr,
    gs.currentPlayer,
    nextMoveIndex,
  );

  return bestNextMove;
}

function createSimulatedGames(
  currentGameState: Move[],
  numGames: number,
): GamePlay[] {
  const fullGames: GamePlay[] = [];
  while (fullGames.length < numGames) {
    const simulatedGame = new GamePlay([...currentGameState]);
    while (!simulatedGame.isFinished) {
      simulatedGame.addMove(createRandomMove(simulatedGame));
    }
    fullGames.push(simulatedGame);
  }
  return fullGames;
}

function getBestNextMoveFromWonGames(
  simulatedGames: GamePlay[],
  currentPlayer: Move["player"],
  nextMoveIndex: number,
): Move {
  const nextMoves: number[] = [];

  // Get all games ending in a win/tie for the `currentPlayer`
  const winningGames = simulatedGames.filter((game) => {
    const winner = game.winner.player;
    return winner === currentPlayer || winner === undefined;
  });

  winningGames.forEach((game) =>
    nextMoves.push(game.moves[nextMoveIndex].square)
  );

  // If there are no winning moves, return a random move
  if (nextMoves.length === 0) {
    return createRandomMove(simulatedGames[0]);
  }

  // Get the frequency of each move
  const winningMoveFrequencies = nextMoves.reduce((acc, move) => {
    if (acc.has(move)) {
      acc.set(move, acc.get(move) + 1);
    } else {
      acc.set(move, 1);
    }
    return acc;
  }, new Map());

  // Return the [square, frequency] pair fir the highest frequency
  const bestMoveFrequencyPair = [...winningMoveFrequencies.entries()].sort(
    (a, b) => {
      // Each `.entries()` pair is a [square, frequency] array. Sort by frequency descending.
      return b[1] - a[1];
    },
  )[0];

  return {
    player: currentPlayer,
    square: bestMoveFrequencyPair[0], // The square is the first element of the pair
  };
}

/** Generate a random, valid move for the current player */
function createRandomMove(gameState: GamePlay): Move {
  const player = gameState.currentPlayer;
  let square = gameState.availableSquares[
    Math.floor(Math.random() * gameState.availableSquares.length)
  ];

  // Special case the forth move
  if (gameState.moves.length === 3) {
    const currentXPos = gameState.moves
      .filter((move) => move.player === "x")
      .map((move) => move.square);

    const specialCaseXPositions = [[1, 9], [3, 7]];

    specialCaseXPositions.forEach((specialXPos) => {
      if (specialXPos.every((position) => currentXPos.includes(position))) {
        const currentOPos = gameState.moves[1].square;
        square = [2, 4, 6, 8].filter((square) =>
          square !== currentOPos
        )[Math.floor(Math.random() * 4)];
      }
    });
  }

  return { player, square };
}
