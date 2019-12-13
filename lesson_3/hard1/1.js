function first() {
  return {
    prop1: "hi there"
  };
}

function second() {
  return
  {
    prop1: "hi there"
  };
}

console.log(first()); // { prop1: 'hi there' }
console.log(second()); // same thing...or not.