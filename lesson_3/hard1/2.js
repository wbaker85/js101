let object = { first: [1] };
let numArray = object["first"].slice();
numArray.push(2);

console.log(numArray); //  => "[1, 2]"
console.log(object);