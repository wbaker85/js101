let nanArray = [NaN];

console.log(nanArray[0] === NaN);

// false because NaN compared with anything is false, even compared with NaN
// is isNaN..

console.log(isNaN(nanArray[0]));