let munsters = {
  herman: { age: 32, gender: 'male' },
  lily: { age: 30, gender: 'female' },
  grandpa: { age: 402, gender: 'male' },
  eddie: { age: 10, gender: 'male' },
  marilyn: { age: 23, gender: 'female'}
};

console.log(Object.entries(munsters));

Object.entries(munsters).forEach((person) => {
  let thisName = person[0][0].toUpperCase() + person[0].slice(1);
  console.log(`${thisName} is a ${person[1].age}-year-old ${person[1].gender}.`);
});