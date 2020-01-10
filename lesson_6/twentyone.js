const readline = require('readline-sync');

const OPTIONS = {upperLimit: 21, dealerMin: 17, matches: 3};
const CARD_VALUES = [
  '2', '3', '4', '5', '6', '7', '8', '9', '10',
  'J', 'K', 'Q', 'A'
];
const CARD_SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

let prompt = function(string) {
  console.log(`==> ${string}`);
};

let clearScreen = function() {
  console.clear();
};

let capitalize = function(string) {
  return string[0].toUpperCase() + string.slice(1);
};

let validYN = function(string) {
  return /^[yn]$/i.test(string);
};

let validHS = function(string) {
  return /^[hs]$/i.test(string);
};

let validInteger = function(number) {
  return Number.isInteger(number);
};

let showWelcomeMsg = function() {
  clearScreen();
  prompt('Welcome to Twenty-One!');
};

let showExitMsg = function() {
  console.log();
  prompt('Thanks for playing!');
};

let showGameResults = function(winner) {
  console.log();
  prompt(`${capitalize(winner)} won the game!`);
};

let getYOrN = function() {
  let choice = readline.prompt();
  while (!validYN(choice)) {
    prompt('Invalid input, please enter Y or N!');
    choice = readline.prompt();
  }
  return choice.toUpperCase();
};

let playAgain = function() {
  console.log();
  prompt('Do you want to play again? Enter Y to play again, or N to exit.');
  return getYOrN() === 'Y';
};

let changeOptions = function() {
  console.log();
  prompt('Do you want to change the game options? Enter Y or N.');
  return getYOrN() === 'Y';
};

let getInteger = function(defaultVal, max = NaN) {
  while (true) {
    let choice = readline.question('([ENTER] to leave unchanged) > ');
    choice = choice === '' ? defaultVal : Number(choice);

    if (!validInteger(choice)) {
      prompt('Input not an integer, try again!');
      continue;
    } else if (choice <= 0) {
      prompt('Must be greater than 0, try again!');
      continue;
    } else if (Number(choice) > max) {
      prompt(`Number must be less than or equal to ${max}, try again!`);
      continue;
    }

    return choice;
  }
};

let changeMatchLimit = function() {
  console.log();
  prompt(`Match Limit: Best of --> ${OPTIONS.matches} <-- matches wins the game.`);
  prompt('Enter a new value for the Match Limit, positive integer only.');
  OPTIONS.matches = getInteger(OPTIONS.matches);
  prompt(`Match Limit set to --> ${OPTIONS.matches} <--`);
};

let changeHandValueLimit = function() {
  console.log();
  prompt(`Hand Value Limit: Bust if over --> ${OPTIONS.upperLimit} <-- hand value.`);
  prompt('Enter a new value for the Hand Value Limit, positive integer only.');
  OPTIONS.upperLimit = getInteger(OPTIONS.upperLimit);
  prompt(`Hand Value Limit set to --> ${OPTIONS.upperLimit} <--`);
};

let changeDealerHitLimit = function() {
  console.log();
  prompt(`Dealer Hit Limit: Dealer will hit if hand value is less than --> ${OPTIONS.dealerMin} <--.`);
  prompt('Enter a new value for the Dealer Hit Limit, positive integer only, must be less than or equal to the hand value limit.');
  OPTIONS.dealerMin = getInteger(OPTIONS.dealerMin, OPTIONS.upperLimit);
  prompt(`Dealer Hit Limit set to --> ${OPTIONS.dealerMin} <--`);
};

let showOptions = function() {
  console.log();
  prompt('CURRENT GAME OPTIONS');
  prompt(`Match Limit: Best of --> ${OPTIONS.matches} <-- matches wins the game.`);
  prompt(`Hand Value Limit: Bust if over --> ${OPTIONS.upperLimit} <-- hand value.`);
  prompt(`Dealer Hit Limit: Dealer will hit if hand value is less than --> ${OPTIONS.dealerMin} <--.`);
};

let optionsChanger = function() {
  do {
    changeMatchLimit();
    changeHandValueLimit();
    changeDealerHitLimit();
    showOptions();
    console.log();
    prompt('Do you want to change these options again?  Input Y to change again, or N to start the game.');
  } while (getYOrN() === 'Y');
};

let gameWinner = function(score) {
  if (score.player === OPTIONS.matches) {
    return 'player';
  } else if (score.dealer === OPTIONS.matches) {
    return 'dealer';
  }

  return false;
};

let createDeck = function() {
  return CARD_VALUES.flatMap((val) => {
    return CARD_SUITS.map((suit) => [val, suit]);
  });
};

let drawOneCard = function(deck) {
  // This function will modify the deck object in place and return a card!
  let cardIdx = Math.floor(Math.random() * deck.length);
  return deck.splice(cardIdx, 1)[0];
};

let dealHands = function(deck) {
  return {
    player: [drawOneCard(deck), drawOneCard(deck)],
    dealer: [drawOneCard(deck), drawOneCard(deck)],
    playerScore: 0,
    dealerScore: 0,
    playerBusted: false,
    dealerBusted: false,
  };
};

let swapTurn = function(turn) {
  return (turn === 'player' ? 'dealer' : 'player');
};

let aceValue = function(score) {
  return (score + 11) > OPTIONS.upperLimit ? 1 : 11;
};

let cardVal = function(score, card) {
  if (!Number.isNaN(Number(card))) {
    return Number(card);
  } else if (card !== 'A') {
    return 10;
  }

  return aceValue(score);
};

let handScore = function(hand) {
  // Make sure aces are at the end of the hand array
  // so that the aceValue function works right
  let handCopy = hand.slice().sort((a) => (a[0] === 'A' ? 1 : -1));
  return handCopy.reduce((sum, card) => sum + cardVal(sum, card[0]), 0);
};

let updateHandProps = function(hands) {
  hands.playerScore = handScore(hands.player);
  hands.dealerScore = handScore(hands.dealer);
  hands.playerBusted = hands.playerScore > OPTIONS.upperLimit;
  hands.dealerBusted = hands.dealerScore > OPTIONS.upperLimit;
};

let somebodyBusted = function(hands) {
  return hands.playerBusted || hands.dealerBusted;
};

let prettyCards = function(cards) {
  return cards.map((card) => `${card[0]} of ${card[1]}`).join(', ');
};

let showHands = function(hands) {
  prompt(`Your Hand: ${prettyCards(hands.player)}`);
  prompt(`Dealer Card: ${prettyCards(hands.dealer.slice(0, 1))}`);
};

let playerHitOrStay = function(hands) {
  clearScreen();
  showHands(hands);
  console.log();
  prompt('Do you want to hit or stay? Enter H to hit or S to stay!');
  let choice = readline.prompt();
  while (!validHS(choice)) {
    prompt('Invalid input, please enter H or S!');
    choice = readline.prompt();
  }
  return choice.toUpperCase();
};

let dealerHitOrStay = function(hands) {
  return hands.dealerScore < OPTIONS.dealerMin ? 'H' : 'S';
};

let hitOrStay = function(hands, turn) {
  return (turn === 'player' ? playerHitOrStay(hands) : dealerHitOrStay(hands));
};

let hit = function(deck, hands, turn) {
  hands[turn].push(drawOneCard(deck));
};

let playTurn = function(deck, hands, turn) {
  while (true) {
    updateHandProps(hands);
    if (somebodyBusted(hands) || hitOrStay(hands, turn) === 'S') break;
    hit(deck, hands, turn);
  }
};

let playTurns = function(deck, hands, turn) {
  do {
    playTurn(deck, hands, turn);
    turn = swapTurn(turn);
  } while (turn !== 'player');
};

let matchWinner = function(hands) {
  let winner = 'tie';

  if (hands.playerBusted) {
    winner = 'dealer';
  } else if (hands.dealerBusted) {
    winner = 'player';
  } else if (hands.playerScore > hands.dealerScore) {
    winner = 'player';
  } else if (hands.dealerScore > hands.playerScore) {
    winner = 'dealer';
  }

  return winner;
};

let showFinalHandInfo = function(hands) {
  clearScreen();
  prompt(`Your hand was ${prettyCards(hands.player)} (${hands.playerScore} points).`);
  prompt(`Dealer hand was ${prettyCards(hands.dealer)} (${hands.dealerScore} points).`);

  if (hands.playerBusted) {
    prompt('You busted!');
  } else if (hands.dealerBusted) {
    prompt('Dealer busted!');
  }
};

let playOneMatch = function() {
  let deck = createDeck();
  let hands = dealHands(deck);

  let firstTurn = 'player';

  playTurns(deck, hands, firstTurn);
  showFinalHandInfo(hands);

  return matchWinner(hands);
};

let showMatchWinner = function(winner) {
  console.log();
  if (winner === 'tie') {
    prompt('It was a tie!');
  } else {
    prompt(`${capitalize(winner)} won the match!`);
  }
};

let updateScore = function(score, winner) {
  score[winner] += 1;
};

let showScore = function(score) {
  console.log();
  prompt('CURRENT SCORE');
  prompt(`Player: ${score.player}, Dealer: ${score.dealer}.`);
  prompt(`Playing to ${OPTIONS.matches}.`);
};

let playOneGame = function() {
  let score = {player: 0, dealer: 0};

  while (true) {
    let winner = playOneMatch();
    showMatchWinner(winner);
    updateScore(score, winner);
    showScore(score);
    if (gameWinner(score)) break;
    console.log();
    prompt('Next match is starting, press enter to continue!');
    readline.prompt();
  }

  return gameWinner(score);
};

let runProgram = function() {
  while (true) {
    if (changeOptions()) optionsChanger();
    clearScreen();

    let winner = playOneGame();
    showGameResults(winner);

    if (!playAgain()) break;
  }
};

showWelcomeMsg();
runProgram();
showExitMsg();
