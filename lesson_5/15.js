let arr = [
  { a: [1, 2, 3] },
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] },
];

/*
let newArr = arr.filter((obj) => {
  return Object.values(obj).flat().filter((num) => num % 2 === 1).length === 0;
});
*/

/*
let newArr = arr.filter((obj) => {
  return Object.values(obj).flat().every((num) => num % 2 === 0);
});
*/

let newArr = arr.filter((obj) => {
  return Object.values(obj).every((arr) => {
    return arr.every((elem) => elem % 2 === 0);
  });
});

console.log(newArr);