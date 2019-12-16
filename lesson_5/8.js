let obj = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog'],
};

let pattern = /[aeiou]/gi;

let getVowels = function(string) {
  return string.match(pattern).join('');
};

Object.entries(obj).forEach((elem) => {
  let theseVowels = '';
  elem.forEach((subElem) => {
    if (typeof subElem === 'string') {
      theseVowels = theseVowels.concat(getVowels(subElem));
    } else {
      subElem.forEach((subSubElem) => {
        theseVowels = theseVowels.concat(getVowels(subSubElem));
      });
    }
  });
  console.log(theseVowels);
});