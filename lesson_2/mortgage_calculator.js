let readline = require('readline-sync');

let prompt = function(text) {
  console.log(`=> ${text}`);
};

let validAmount = function(input) {
  return !isNaN(Number(input));
};

let getAmount = function() {
  prompt('Input the loan amount.');
  let amount = readline.question();
  while (!validAmount(amount)) {
    prompt('Please enter a valid amount!');
    prompt('Input the loan amount.');
    amount = readline.question();
  }
  return Number(amount);
};

let validRate = function(input) {
  return !isNaN(Number(input));
};

let annualToMonthlyRate = function(annualRate) {
  return (Number(annualRate) / 12);
};

let getRate = function() {
  prompt('Input the annual loan rate like this: 5.52 (for 5.52% APR)');
  let input = readline.question();
  while (!validRate(input)) {
    prompt('Please enter a valid rate!');
    prompt('Input the annual loan rate like this: 5.52 (for 5.52% APR)');
    input = readline.question();
  }
  return annualToMonthlyRate(input);
};

let validDuration = function() {
  return !isNaN(Number(input));
};

let getDuration = function() {
  prompt('Enter the loan duration in months.');
  let input = readline.question();
  while (!validDuration) {
    prompt('Please enter a valid duration!');
    prompt('Enter the loan duration in months.');
    input = readline.question();
  }
  return Number(input);
};

let calcPayment = function(amount, rate, duration) {
  // eslint-disable-next-line id-length
  let p = amount;
  // eslint-disable-next-line id-length
  let j = rate;
  // eslint-disable-next-line id-length
  let n = duration;
  return p * (j / (1 - Math.pow((1 + j),(-n))));
};

let validCalcAgainChoice = function () {

};

let calcAgain = function() {

};

let displayGreeting = function(text) {
  prompt(text);
};

let displayResults = function(payment, duration) {
  prompt(`Monthly Payment: ${payment}.  Loan Duration: ${duration} months.`);
};

let clearScreen = function() {
  // console.log('\033[2J');
};

while (true) {
  clearScreen();
  displayGreeting('Mortgage calculator');
  let amount = getAmount();
  let rate = getRate();
  let duration = getDuration();
  let monthlyPayment = calcPayment(amount, rate, duration);
  displayResults(monthlyPlayment, duration);
  if (!calcAgain()) break;
}