let swapCase = function(str) {
  return str.replace(/\w/g, (val) => (val === val.toLowerCase() ? val.toUpperCase() : val.toLowerCase()));
};

let munstersDescription = "The Munsters are creepy and spooky.";
console.log(swapCase(munstersDescription));