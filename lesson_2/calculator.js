const readline = require('readline-sync');
const messages = require('./calculator_messages.json');
const VALID_OPERATORS = ['+', '-', '*', '/'];

let prompt = function(message) {
  console.log(`=> ${message}`);
};

let greeting = function(message) {
  prompt(message);
};

function invalidNumber(number) {
  return number.trim() === '' || Number.isNaN(Number(number));
}

let getNumber = function(message) {
  prompt(message);
  let input = readline.question();
  while (invalidNumber(input)) {
    prompt(messages.invalidNumber);
    prompt(message);
    input = readline.question();
  }
  return input;
};

let invalidOperator = function(string) {
  return !VALID_OPERATORS.includes(string);
};

let getOperator = function(message) {
  prompt(message);
  let input = readline.question();
  while (invalidOperator(input)) {
    prompt(messages.invalidOperator);
    prompt(message);
    input = readline.question();
  }
  return input;
};

let doMath = function(num1, num2, operator) {
  // eslint-disable-next-line no-eval
  return eval(`${num1} ${operator} ${num2}`);
};

let displayResults = function(num1, num2, operator, result) {
  prompt(`${num1} ${operator} ${num2} = ${result}`);
};

let validRepeatChoice = function(string) {
  return !!string.match(/^(y|n)$/i);
};

let repeatCalculation = function() {
  prompt(messages.doAnother);
  let choice = readline.question();
  while (!validRepeatChoice(choice)) {
    prompt(messages.invalidRepeat);
    prompt(messages.doAnother);
    choice = readline.question();
  }
  return choice.toLowerCase() === 'y';
};

greeting(messages.greeting);

while (true) {
  let firstNum = getNumber(messages.getFirstNum);
  let secondNum = getNumber(messages.getSecondNum);
  let operator = getOperator(messages.getOperator);
  let result = doMath(firstNum, secondNum, operator);
  displayResults(firstNum, secondNum, operator, result);
  if (!repeatCalculation()) break;
}

prompt(messages.exit);
