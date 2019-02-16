
function isInteger(num) {
  return (typeof num === "number" && num % 1 === 0);
}

function isInteger2(num) {
  return ((num ^ 0) === num)
}

function isInteger3(num) {
  return Number.isInteger(num);
}

function multiply(a) {
  return function(b) {
    return function(c) {
      return a * b * c;
    }
  }
}

function decToBinary(num) {
  let arr = [];
  do {
    arr.unshift(Math.trunc(num % 2));
    num = Math.trunc(num/2);
  } while (num > 0);
  return arr.join('');
}

console.log(isInteger3(5));

console.log(multiply(5)(6)(7));

const myNum = 25;
console.log(`decToBinary(${myNum}): ${decToBinary(myNum)}`);