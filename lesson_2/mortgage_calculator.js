let readline = require('readline-sync');

let prompt = function(text) {
  console.log(`=> ${text}`);
};

let validAmount = function(input) {
  return !isNaN(Number(input)) && (Number(input) > 0);
};

let getAmount = function() {
  prompt('Input the loan amount.  Must be more than 0.');
  let amount = readline.question();
  while (!validAmount(amount)) {
    prompt('Please enter a valid amount!');
    prompt('Input the loan amount.  Must be more than 0.');
    amount = readline.question();
  }
  return Number(amount);
};

let validRate = function(input) {
  return !isNaN(Number(input)) && (Number(input) > 0);
};

let annualToMonthlyRate = function(annualRate) {
  return (Number(annualRate) / 12);
};

let getRate = function() {
  prompt('Input the annual loan rate like this: 5.52 (for 5.52% APR).  Must be more than 0.');
  let input = readline.question();
  while (!validRate(input)) {
    prompt('Please enter a valid rate!');
    prompt('Input the annual loan rate like this: 5.52 (for 5.52% APR)  Must be more than 0.');
    input = readline.question();
  }
  return annualToMonthlyRate(input);
};

let validDuration = function(input) {
  return Number.isInteger(Number(input)) && (Number(input) > 0);
};

let getDuration = function() {
  prompt('Enter the loan duration in months.');
  prompt('Note: Enter whole months only: 12 is fine, 12.1 is not.  Must be 1 month or longer.');
  let input = readline.question();
  while (!validDuration(input)) {
    prompt('Please enter a valid duration!');
    prompt('Enter the loan duration in months.');
    prompt('Note: Enter whole months only: 12 is fine, 12.1 is not.  Must be 1 month or longer.');
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
  return p * (j / (1 - Math.pow((1 + j),(-n))));
};

let validCalcAgainChoice = function(choice) {
  return !!choice.match(/^[yn]$/i);
};

let calcAgain = function() {
  prompt('Would you like to do another calculation? Enter Y or N.')
  let choice = readline.question();
  while (!validCalcAgainChoice(choice)) {
   prompt('Invalid input!') 
   prompt('Would you like to do another calculation? Enter Y or N.')
   choice = readline.question();
  }
  return choice.toLowerCase() === 'y';
};

let displayGreeting = function(text) {
  prompt(text);
};

let displayResults = function(payment, duration) {
  let roundedPayment = payment.toFixed(2);
  prompt(`Monthly Payment: $${roundedPayment}.  Loan Duration: ${duration} months.`);
};

let clearScreen = function() {
  console.log('\033[2J');
};

while (true) {
  clearScreen();
  displayGreeting('Mortgage calculator');
  let amount = getAmount();
  let rate = getRate();
  let duration = getDuration();
  let monthlyPayment = calcPayment(amount, rate, duration);
  displayResults(monthlyPayment, duration);
  if (!calcAgain()) break;
}