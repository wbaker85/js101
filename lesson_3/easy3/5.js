function isColorValid1(color) {
  return (color === "blue" || color === "green");
}

function isColorValid(color) {
  let valid = false;
  if (color === "blue" || color === "green") valid = true;
  return valid;
}

console.log(isColorValid('blue'));
console.log(isColorValid('asdf'));