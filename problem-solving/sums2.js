// console.log(sum(2,3));   -- Outputs 5
// console.log(sum(2)(3));  -- Outputs 5

function sums(x, y) {
  if (y !== undefined) {
    return x + y;
  } else {
    return function(y) {
      return x + y;
    }
  }
}

function mult(a) {
  return (b) => {
    return (c) => {
      return a * b * c;
    }
  }
}

function sums2(a) {
  return function(b) {
    return a + b;
  }
}

function sumRecursive(n) {
  if (n <= 1) {
    return 1;
  }
  else {
    return n + sumRecursive(n-1);
  }

}

console.log(sums(2, 3));
console.log(sums((2), (3)));
console.log(sums2(2) (3));
console.log(mult(2) (3) (4));
console.log(sumRecursive(5000));