let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

let ageSum = Object.values(ages).reduce((sum, elem) => sum + elem);

console.log(ageSum);

let ageSum2;
Object.values(ages).forEach((age) => ageSum2 + age);
console.log(ageSum2);