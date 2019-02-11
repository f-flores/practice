
function isInteger(num) {
  return (typeof num === "number" && num % 1 === 0);
}

function isInteger2(num) {
  return ((num ^ 0) === num)
}

function isInteger3(num) {
  return Number.isInteger(num);
}

console.log(isInteger3(5));