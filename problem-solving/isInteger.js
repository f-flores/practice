
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
    return a * b;
  }
}

console.log(isInteger3(5));

// multiplier function with two parameters
console.log(multiply(5)(6));
