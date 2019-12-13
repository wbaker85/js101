let statement = "The Flintstones Rock";

let wordObj = {};

statement .split('')
          .filter((char) => char !== ' ')
          .forEach((letter) => {
            if (wordObj.hasOwnProperty(letter)) {
              wordObj[letter] += 1;
            } else {
              wordObj[letter] = 1;
            }
          });

console.log(wordObj);

