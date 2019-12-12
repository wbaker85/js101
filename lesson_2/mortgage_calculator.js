const readline = require('readline-sync');
const messages = require('./mortgage_messages.json');

let clearScreen = function() {
  console.clear();
};

let prompt = function(text) {
  console.log(`=> ${text}`);
};

let lineBreak = function() {
  console.log();
};

let validAmount = function(input) {
  return !isNaN(Number(input)) && (Number(input) > 0);
};

let validRate = function(input) {
  return !isNaN(Number(input)) && (Number(input) >= 0);
};

let validDuration = function(input) {
  return Number.isInteger(Number(input)) && (Number(input) > 0);
};

let validCalcAgainChoice = function(choice) {
  return !!choice.match(/^[yn]$/i);
};

let getAmount = function() {
  lineBreak();
  prompt(messages.loanAmount);
  let amount = readline.question();
  while (!validAmount(amount)) {
    prompt(messages.loanAmountError);
    lineBreak();
    prompt(messages.loanAmount);
    amount = readline.question();
  }
  return Number(amount);
};

let annualToMonthlyRate = function(annualRate) {
  return (Number(annualRate) / 12);
};

let getRate = function() {
  lineBreak();
  prompt(messages.annualRate);
  let input = readline.question();
  while (!validRate(input)) {
    prompt(messages.annualRateError);
    lineBreak();
    prompt(messages.annualRate);
    input = readline.question();
  }
  return annualToMonthlyRate(input);
};

let getDuration = function() {
  lineBreak();
  prompt(messages.loanDuration);
  prompt(messages.loanDurationNote);
  let input = readline.question();
  while (!validDuration(input)) {
    prompt(messages.loanDurationError);
    lineBreak();
    prompt(messages.loanDuration);
    prompt(messages.loanDurationNote);
    input = readline.question();
  }
  return Number(input);
};

let calcPayment = function(amount, rate, duration) {
  // eslint-disable-next-line id-length
  let p = amount;
  // eslint-disable-next-line id-length
  let j = rate / 100;
  // eslint-disable-next-line id-length
  let n = duration;
  if (j === 0) {
    return p / n;
  } else {
    return p * (j / (1 - Math.pow((1 + j),(-n))));
  }
};

let calcAgain = function() {
  lineBreak();
  prompt(messages.calcAgain);
  let choice = readline.question();
  while (!validCalcAgainChoice(choice)) {
   prompt(messages.calcAgainError);
   prompt(messages.calcAgain);
   choice = readline.question();
  }
  return choice.toLowerCase() === 'y';
};

let displayGreeting = function(text) {
  prompt(text);
};

let displayResults = function(payment, duration) {
  lineBreak();
  let roundedPayment = payment.toFixed(2);
  prompt(`${messages.paymentPrefix}${roundedPayment}`);
  prompt(`${messages.durationPrefix}${duration}`);
};

while (true) {
  clearScreen();
  displayGreeting(messages.greetingMessage);
  let amount = getAmount();
  let rate = getRate();
  let duration = getDuration();
  let monthlyPayment = calcPayment(amount, rate, duration);
  displayResults(monthlyPayment, duration);
  if (!calcAgain()) break;
}

lineBreak();
prompt(messages.exitMessage);
