let arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];

let sumOdds = function(array) {
  return array.reduce((sum, num) => (num % 2 === 1 ? sum + num : sum), 0);
};

let newArr = arr.slice().sort((a, b) => sumOdds(a) - sumOdds(b));

console.log(arr);
console.log(newArr);