let arr = [['a', 1], ['b', 'two'], ['sea', {'c': 3}], ['D', ['a', 'b', 'c']]];

let obj = {};
arr.forEach((pair) => obj[pair[0]] = pair[1]);

// let obj = Object.fromEntries(arr);
console.log(obj);