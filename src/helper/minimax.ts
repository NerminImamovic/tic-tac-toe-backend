import * as _ from 'lodash';

type Move = {
  score?: any,
  index?: any,
};

const origBoard = Array.from(Array(9).keys()); // an array that keeps track of what's in each square: X, O or nothing
const humanPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [  // array thats gonna show winning combinations
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [6, 4, 2],
];

// defining checkWin function
function checkWin(board, player) {
  const plays = board.reduce((a, e, i) =>
  (e === player) ? a.concat(i) : a, []); // finding every index that the player has played
  let gameWon = null;
  for (const [index, win] of winCombos.entries()) { // checking if the game has been won by looping through every winCombos
    if (win.every(elem => plays.indexOf(elem) > -1)) { // has the player played in every spot that counts as a win for that win
      gameWon = { index, player };  // which win combo the player won at & which player had won
      break;
    }
  }
  return gameWon;
}

// defining emptySuares function
function emptySquares() {
  return origBoard.filter(s => typeof s === 'number'); // filter every element in the origBoard to see if the type of element equals number. If yes, we are gonna return it (all the squares that are numbers are empty, the squares with X and O are not empty)
}

// defining bestSpot function
export function bestSpot(humanPlayerFields: number[], aiPlayerFields: number[]): number {

  _.each(humanPlayerFields, (field: number) => {
    _.set(origBoard, field.toString(), humanPlayer);
  });

  _.each(aiPlayerFields, (field: number) => {
    _.set(origBoard, field.toString(), aiPlayer);
  });

  const res: any = minimax(origBoard, aiPlayer); // will always play in the first empty squre

  return res.index;
}

// defining minimax function
function minimax(newBoard, player): Move {

  const availSpots = emptySquares(); // defining the indexes of the available spots in the board

  if (checkWin(newBoard, player)) { // checking who wins
    return { score: -10 }; // if O wins we return -10
  }  if (checkWin(newBoard, aiPlayer)) {
    return { score: 10 }; // if X wins we return 10
  }  if (availSpots.length === 0) {
    return { score: 0 }; // tie, we return 0
  }

  const moves: Move[] = []; // collect the scores from each of the empty spots to evaluate them later
  for (let i = 0; i < availSpots.length; i++) {
    const move: Move = {};
    _.set(move, 'index', newBoard[availSpots[i]]); // setting the index number of the empty spot, that was store as a number in the origBoard, to the index property of the move object
    newBoard[availSpots[i]] = player; // setting empty spot on a newBoard to the current player
    if (player === aiPlayer) { // calling the minimax function with the other player in the newly changed newBoard
      const result = minimax(newBoard, humanPlayer);
      _.set(move, 'score', result.score); // store the object result from the minimax function call, that includes a score property, to the score property of the move object
    } else {
      const result = minimax(newBoard, aiPlayer);
      _.set(move, 'score', result.score); // if the minimax function does not find a terminal state, it goes level by level (deeper into the game). this recursion happens until it reached out the terminal state and returns a score one level up
    }

    newBoard[availSpots[i]] = _.get(move, 'index'); // minimax resets newBoard to what it was before

    moves.push(move); // pushes the move object to the moves array
  }

  let bestMove; // minimax algorithm evaluates the best move in the moves array
  if (player === aiPlayer) {  // choosing the highest score when AI is playing and the lowest score when the human is playing
    let bestScore = -10000; // if the player is AI player, it sets variable bestScore to a very low number
    for (let i = 0; i < moves.length; i++) { // looping through the moves array
      if (moves[i].score > bestScore) { // if a move has a higher score than the bestScore, the algorithm stores that move
        bestScore = moves[i].score;
        bestMove = i; // if there are moves with similar scores, only the first will be stored
      }
    }
  } else { // when human Player
    let bestScore = 10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) { // minimax looks for a move with the lowest score to store
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove]; // returning object stored in bestMove
}
