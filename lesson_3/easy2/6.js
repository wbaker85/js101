let flintstones = ["Fred", "Wilma"];
flintstones.push([["Barney"], ["Betty"]]);
flintstones.push(["Bambam", "Pebbles"]);

// let flatFlint = flintstones.reduce((accum, curr) => accum.concat(curr), []);
// console.log(flatFlint);

// console.log(flintstones.flat());
// console.log(flintstones);

console.log(flintstones);
flintstones = [].concat(...flintstones);
console.log(flintstones);