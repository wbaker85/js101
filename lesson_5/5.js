let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};

console.log(Object.values(munsters));

let totalAge = Object.values(munsters).reduce((sum, obj) => {
  if (obj.gender === 'male') {
    return sum + obj.age;
  } else {
    return sum;
  }
}, 0);

console.log(totalAge);