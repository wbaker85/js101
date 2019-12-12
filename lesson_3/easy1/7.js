let str1 = "Few things in life are as important as house training your pet dinosaur.";
let str2 = "Fred and Wilma have a pet dinosaur named Dino.";

let pattern = /\bDino\b/;

console.log(str1.match(pattern));
console.log(str2.match(pattern));

console.log(str1.includes('Dino'));
console.log(str2.includes('Dino'));