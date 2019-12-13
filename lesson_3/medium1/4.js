function addToRollingBuffer1(buffer, maxBufferSize, newElement) {
  buffer.push(newElement);
  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }
  return buffer;
}

function addToRollingBuffer2(buffer, maxBufferSize, newElement) {
  buffer.concat(newElement);
  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }
  return buffer;
}

let buff = [1, 2, 3, 4];
let maxSize = 4;
let newElem = 5;

console.log(addToRollingBuffer2(buff, maxSize, newElem)); // Logs [2, 3, 4, 5]
console.log(buff); // this is now [2, 3, 4, 5]
console.log(addToRollingBuffer1(buff, maxSize, newElem)); // Also logs [2, 3, 4, 5]