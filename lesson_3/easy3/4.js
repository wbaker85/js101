let arr1 = [{ first: "value1" }, { second: "value2" }, 3, 4, 5];
let arr2 = arr1.slice();
arr2[2] = 42;
console.log(arr1);
console.log(arr2);

