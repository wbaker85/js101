let arr = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];

let newArr = arr.map(function(subArr) {
  if (typeof subArr[0] === 'number') {
    return [...subArr].sort((a, b) => a - b);
  } else {
    return [...subArr].sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
  }
});

console.log(arr);
console.log(newArr);