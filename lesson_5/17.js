// letters 97 to 102, inclusive
// numbers 48 to 57, inclusive
let validCodes = [];
for (let i = 97; i <= 102; i += 1) {
  validCodes.push(i);
}

for (let i = 48; i <= 57; i += 1) {
  validCodes.push(i);
}

let sectionLengths = [8, 4, 4, 4, 12];

let randomHex = function() {
  return validCodes[Math.floor(Math.random() * validCodes.length)];
};

let UUID = function() {
  let codeArray = [];
  for (let i = 0; i <= 4; i += 1) {
    codeArray[i] = [];
    for (let j = 0; j <= sectionLengths[i] - 1; j += 1) {
      codeArray[i].push(String.fromCharCode(randomHex()));
    }
  }

  return codeArray.map((list) => list.join(''))
                  .join('-');
};

console.log(UUID());