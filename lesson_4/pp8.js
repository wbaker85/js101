let createObj = function(array) {
  let newObj = {};
  array.forEach((elem, idx) => {
    newObj[elem] = idx;
  });
  return newObj;
};

let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];

console.log(createObj(flintstones));