let readline = require('readline-sync');
const HUMAN_MARK = 'X';
const COMPUTER_MARK = 'O';
const EMPTY_MARK = '-';
const NUM_ROWS = 3;
const NUM_COLUMNS = 3;
const NUM_BOARD_SPOTS = NUM_ROWS * NUM_COLUMNS;

let prompt = function(string) {
  console.log(`==> ${string}`);
};

let boardRowValues = function(board) {
  return Array(NUM_ROWS).fill().map((_, rowNum) => {
    let thisRow = [];
    for (let colNum = 1; colNum <= NUM_COLUMNS; colNum += 1) {
      let spotNum = colNum + (rowNum * NUM_COLUMNS);
      thisRow.push([spotNum, board[spotNum]]);
    }
    return thisRow;
  });
};

let boardColumnValues = function(board) {
  return Array(NUM_COLUMNS).fill().map((_, colNum) => {
    let thisColumn = [];
    for (let rowNum = 0; rowNum < NUM_ROWS; rowNum += 1) {
      let spotNum = colNum + 1 + (rowNum * NUM_COLUMNS);
      thisColumn.push([spotNum, board[spotNum]]);
    }
    return thisColumn;
  });
};

let boardDiagValues = function(board) {
  if (NUM_ROWS !== NUM_COLUMNS) return [[null], [null]];

  let leftDiagValue = function(nth) {
    return nth === 1 ? 1 : leftDiagValue(nth - 1) + NUM_ROWS + 1;
  };

  let rightDiagValue = function(nth) {
    return nth === 1 ? NUM_ROWS : rightDiagValue(nth - 1) + NUM_ROWS - 1;
  };

  let leftDiag = Array(NUM_ROWS).fill().map((_, idx) => {
    let spotNum = leftDiagValue(idx + 1);
    return [spotNum, board[spotNum]];
  });

  let rightDiag = Array(NUM_ROWS).fill().map((_, idx) => {
    let spotNum = rightDiagValue(idx + 1);
    return [spotNum, board[spotNum]];
  });

  return [leftDiag, rightDiag];
};

let getAllPositions = function(board) {
  return [...boardRowValues(board),
          ...boardDiagValues(board),
          ...boardColumnValues(board)
          ];
};

let emptyOrMine = function(positions, mark) {
  return positions.filter((position) => {
    return position.every((spot) => [mark, EMPTY_MARK].includes(spot[1]));
  });
};

let rightNumberOfBlanks = function(positions, movesUntil) {
  return positions.filter((position) => {
    let numBlanks = position.reduce((sum, spot) => {
      return spot[1] === EMPTY_MARK ? sum + 1 : sum;
    }, 0);

    return numBlanks === movesUntil;
  });
};

let winningSpot = function(positions) {
  return positions[0].filter((spot) => {
    return spot[1] === EMPTY_MARK;
  })[0][0];
};

let winningMove = function(board, mark, movesUntil = 1) {
  let positions = getAllPositions(board);
  positions = emptyOrMine(positions, mark);
  positions = rightNumberOfBlanks(positions, movesUntil);

  if (positions.length > 0) {
    return winningSpot(positions);
  }

  return false;
};

let randomSpot = function(board) {
  let spots = Object.entries(board);
  let availableSpots = spots.filter((spot) => spot[1] === EMPTY_MARK);
  return availableSpots[Math.floor(Math.random() * availableSpots.length)][0];
};

let getMiddle = function(board) {
  if ((NUM_ROWS % 2) + (NUM_COLUMNS % 2) === 2) {
    let middle = Math.ceil(NUM_BOARD_SPOTS / 2);
    return [middle, board[middle]];
  }

  return [false, false];
};

let getComputerChoice = function(board) {
  let move = [];

  if (winningMove(board, COMPUTER_MARK)) {
    move = [winningMove(board, COMPUTER_MARK), COMPUTER_MARK];
  } else if (winningMove(board, HUMAN_MARK)) {
    move = [winningMove(board, HUMAN_MARK), COMPUTER_MARK];
  } else if (winningMove(board, COMPUTER_MARK, 2)) {
    move = [winningMove(board, COMPUTER_MARK, 2), COMPUTER_MARK];
  } else if (getMiddle(board)[1] === EMPTY_MARK) {
    move = [getMiddle(board)[0], COMPUTER_MARK];
  } else {
    move = [randomSpot(board), COMPUTER_MARK];
  }

  return move;
};

let validYesNo = function(inputString) {
  return /^[yn]$/i.test(inputString);
};

let validChoiceNumber = function(choice) {
  let numChoice = Number(choice);
  return Number.isInteger(numChoice) && numChoice <= NUM_BOARD_SPOTS;
};

let playAnotherGame = function() {
  prompt('Do you want to play another game?');
  let choice = readline.prompt();
  while (!validYesNo(choice)) {
    prompt('Not a valid choice, please input Y or N!');
    choice = readline.prompt();
  }
  return choice === 'y';
};

let showGameResults = function(gameResults) {
  switch (gameResults) {
    case 'human':
      prompt('Human won the game!');
      break;
    case 'computer':
      prompt('Computer won the game!');
      break;
    default:
      prompt('Never should see this');
  }
};

let displayMatchResults = function(results) {
  switch (results) {
    case 'human':
      prompt('You won!');
      break;
    case 'computer':
      prompt('Computer won!');
      break;
    default:
      prompt('It was a tie!');
  }
};

let updateScore = function(score, results) {
  score[results] += 1;
  return score;
};

let showScore = function(score) {
  prompt(`Current score is Human: ${score.human}, Computer: ${score.computer}`);
};

let gameWinner = function(score) {
  if (score.human >= 5) {
    return 'human';
  } else if (score.computer >= 5) {
    return 'computer';
  }

  return false;
};

let createBoard = function() {
  let board = {};

  for (let idx = 1; idx <= NUM_BOARD_SPOTS; idx += 1) {
    board[idx] = EMPTY_MARK;
  }

  return board;
};

let validBoardSpot = function(board, choice) {
  return board[choice] === '-';
};

let joinOr = function(array, separator = ',') {
  let outStr = '';

  array.forEach((elem, idx) => {
    if (!outStr) {
      outStr = elem;
    } else if ((idx + 1) === array.length) {
      outStr += ` or ${elem}`;
    } else {
      outStr += `${separator} ${elem}`;
    }
  });

  return outStr;
};

let possibleChoices = function(board) {
  let spots = Object.entries(board);
  let availableSpots = spots.filter((spot) => spot[1] === EMPTY_MARK);
  let availableChoices = availableSpots.map((spot) => spot[0]);
  return joinOr(availableChoices, ',');
};

let getUserChoice = function(board) {
  prompt('Chose where you want to go by entering a number.');
  prompt(`Possible choices are ${possibleChoices(board)}`);
  let choice = readline.prompt();
  while (true) {
    if (!validBoardSpot(board, choice)) {
      prompt('Invalid choice!  That spot is not available.  Enter a new number.');
      choice = readline.prompt();
      continue;
    } else if (!validChoiceNumber(choice)) {
      prompt('Invalid choice!  Not a valid number.  Enter a new number.');
      choice = readline.prompt();
      continue;
    }
    break;
  }

  return [Number(choice), HUMAN_MARK];
};

let updateBoard = function(board, choice) {
  board[choice[0]] = choice[1];
  return board;
};

let showBoard = function(board) {
  let rows = boardRowValues(board).map((row) => {
    return row.map((pair) => pair[1]);
  });

  rows.forEach((row) => {
    console.log(` ${row.join(' | ')} `);
  });
};

let matchWinner = function(board) {
  let positions = getAllPositions(board);

  for (let count = 0; count < positions.length; count += 1) {
    if (positions[count].every((spot) => spot[1] === HUMAN_MARK)) {
      return 'human';
    } else if (positions[count].every((spot) => spot[1] === COMPUTER_MARK)) {
      return 'computer';
    }
  }

  return false;
};

let tiedMatch = function(board) {
  return !Object.values(board).some((spot) => spot === EMPTY_MARK);
};

let matchOver = function(board) {
  return tiedMatch(board) || !!matchWinner(board);
};

let getChoice = function(currentPlayer, board) {
  if (currentPlayer === 'human') {
    return getUserChoice(board);
  }

  return getComputerChoice(board);
};

let switchPlayers = function(currentPlayer) {
  return currentPlayer === 'human' ? 'computer' : 'human';
};

let playOneMatch = function() {
  let board = createBoard();
  let currentPlayer = 'human';

  while (true) {
    if (currentPlayer === 'human') showBoard(board);
    let choice = getChoice(currentPlayer, board);
    board = updateBoard(board, choice);
    if (matchOver(board)) break;
    currentPlayer = switchPlayers(currentPlayer);
  }

  showBoard(board);
  return matchWinner(board);
};

let playOneGame = function() {
  let score = {human: 0, computer: 0};

  while (true) {
    let matchResults = playOneMatch();
    displayMatchResults(matchResults);
    score = updateScore(score, matchResults);
    showScore(score);
    if (gameWinner(score)) break;
  }

  return gameWinner(score);
};

while (true) {
  let gameResults = playOneGame();
  showGameResults(gameResults);
  if (!playAnotherGame()) break;
}

prompt('Thanks for playing!');