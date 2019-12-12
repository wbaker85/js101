let numbers = [1, 2, 3, 4, 5];
// console.log(numbers.slice().reverse()); // [ 5, 4, 3, 2, 1 ]
// console.log(numbers); // [1, 2, 3, 4, 5]

let copiedArray = numbers.reduce((newArray, currentValue) => {
  return [currentValue, ...newArray];
}, []);

console.log(copiedArray);