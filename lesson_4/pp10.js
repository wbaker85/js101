let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

let ageArr = Object.values(ages);
console.log(Math.min(...ageArr));

let ageMin = ageArr.reduce((min, age) => (age < min ? age : min));
console.log(ageMin);