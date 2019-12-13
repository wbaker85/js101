/**
 * A: ['two'], ['three'], ['one']...wrong, because its shadowing, doesn't change anything in global scope
 * B: one two three, shadowing again
 * C: two, three, one, splice is destructive
 */

function messWithVars(one, two, three) {
  one.splice(0, 1, "two");
  two.splice(0, 1, "three");
  three.splice(0, 1, "one");
}

let one = ["one"];
let two = ["two"];
let three = ["three"];

messWithVars(one, two, three);

console.log(`one is: ${one}`);
console.log(`two is: ${two}`);
console.log(`three is: ${three}`);