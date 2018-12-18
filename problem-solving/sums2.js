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
  return n + sumRecursive(n-1);
}

// [2, 6, 4, 8, 10, 3, 11]
function mthOrder(arr, m) {
  const pivot = arr[0];
  const left = [], right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
    console.log(`pivot: ${pivot}, left: ${left}, right: ${right}, m: ${m}`);
  }
  // arr = [...left, pivot, ...right];
  // console.log(`arr: ${arr}`);
  if (left.length === m - 1 || right.length === m) {
    return arr[m - 1];
  } else if (arr[m - 1] < pivot) {
    // run procedure on the left
    return mthOrder([...left], m);
  } else {
    // run procedure on the right
    return mthOrder([...right], m - (left.length + 1));
  }
}

console.log(sums(2, 3));
console.log(sums((2), (3)));
console.log(sums2(2) (3));
console.log(mult(2) (3) (4));
// console.log(sumRecursive(100));
let arrM = [6, 2, 4, 8, 10, 3, 11, 20, 1, 17, 9];
console.log(mthOrder(arrM, 9));