const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors'];

function prompt(message) {
  console.log(`=> ${message}`);
}

let determineWinner = function(choice, computerChoice) {
  if ((choice === 'rock' && computerChoice === 'scissors') ||
      (choice === 'paper' && computerChoice === 'rock') ||
      (choice === 'scissors' && computerChoice === 'paper')) {
    return 'human';
  } else if ((choice === 'rock' && computerChoice === 'paper') ||
             (choice === 'paper' && computerChoice === 'scissors') ||
             (choice === 'scissors' && computerChoice === 'rock')) {
    return 'computer';
  } else {
    return 'tie';
  }
};

let updateScore = function(currentScore, winner) {
  currentScore[winner] += 1;
};

function displayWinner(choice, computerChoice, winner) {
  prompt(`You chose ${choice}, computer chose ${computerChoice}`);

  if (winner === 'human') {
    prompt('You win!');
  } else if (winner === 'computer') {
    prompt('Computer wins!');
  } else {
    prompt("It's a tie!");
  }
}

let validChoice = function(choice) {
  if (choice.length === 1) {
    return VALID_CHOICES.some((allowed) => {
      return allowed[0].toLowerCase() === choice.toLowerCase();
    });
  } else {
    return VALID_CHOICES.includes(choice);
  }
};

let fullChoice = function(userChoice) {
  let idx = VALID_CHOICES.findIndex((allowed) => {
    return allowed[0].toLowerCase() === userChoice[0].toLowerCase();
  });
  return VALID_CHOICES[idx];
};

let userChoice = function() {
  prompt(`Choose one: ${VALID_CHOICES.join(', ')}`);
  prompt('You can type the full name, or just the first letter of your choice!');
  let choice = readline.question();
  while (!validChoice(choice)) {
    prompt("That's not a valid choice");
    choice = readline.question();
  }
  return fullChoice(choice);
};

let endGame = function(score) {
  return (score.human >= 5) || (score.computer >= 5);
};

let displayScore = function(score) {
  prompt(`Score is human: ${score.human}, computer: ${score.computer}.`);
};

let printGameResults = function(score) {
  prompt(score.human === 5 ? 'You got 5!' : 'Computer got 5!');
};

while (true) {
  let currentScore = { human: 0, computer: 0, tie: 0 };
  let gameOver = false;

  while (!gameOver) {
    let choice = userChoice();

    let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
    let computerChoice = VALID_CHOICES[randomIndex];

    let winner = determineWinner(choice, computerChoice);
    displayWinner(choice, computerChoice, winner);
    console.log();
    updateScore(currentScore, winner);
    displayScore(currentScore);
    console.log();
    gameOver = endGame(currentScore);
  }

  printGameResults(currentScore);
  console.log();

  prompt('Do you want to play again (y/n)?');
  let answer = readline.question().toLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }

  if (answer[0] !== 'y') break;
}