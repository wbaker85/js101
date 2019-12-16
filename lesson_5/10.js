let arr = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];

let newArr = arr.map((subArr) => {
  if (typeof subArr[0] === 'string') {
    return subArr.slice().sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0));
  } else {
    return subArr.slice().sort((a, b) => b - a);
  }
});

console.log(arr);
console.log(newArr);