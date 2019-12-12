let advice = "Few things in life are as important as house training your pet dinosaur.";

let pattern = /house.*/i;

console.log(advice.replace(pattern, ''));

let idx = advice.indexOf('house');

console.log(advice.slice(0, idx));