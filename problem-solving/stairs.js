/*

There's a staircase with N steps, and you can climb 1 or 2 steps at a time. Given N, write a function that returns the number of unique ways you can climb the staircase. The order of the steps matters.

For example, if N is 4, then there are 5 unique ways:

1, 1, 1, 1
2, 1, 1
1, 2, 1
1, 1, 2
2, 2

What if, instead of being able to climb 1 or 2 steps at a time, you could climb any number from a set of positive integers X? For example, if X = {1, 3, 5}, you could climb 1, 3, or 5 steps at a time. Generalize your function to take in X.

*/

// helper debug function
function indent(l) {
  let indentStr = '';
  for (let j = 0; j < l; j++) {
    indentStr += ' ';
  }
  return indentStr;
}


// recursive fibonacci
function stairwaysR(n) {
  if (n <= 1) {
    return 1;
  }

  const stairsN = stairwaysR(n - 1) + stairwaysR(n -2);
  return stairsN;
}

// iterative fibonacci
function stairwaysIter(n) {
  let val1 = 1, val2 = 1;

  for (let i = 0; i < n; i++) {
    [val1, val2] = [val2, val1 + val2];
  }

  return val1;
}

// generalization: test set X versus sum N
const reducer = (acc, currentValue) => acc + currentValue;

function stairwaysMem(arr, n, mem) {
  if (mem.length > 0 && mem[n]) {
    return mem[n];
  } 

  if (n <= 1) {
    mem[0] = mem[1] = 1;
    return 1;
  } else {
    mem[n] = stairwaysMem(arr, n - 1, mem) + stairwaysMem(arr, n - 2, mem);
  }

  return mem[n];
}

function stairwaysGen(arr, k, mem = []) {
  let ways = 0;

  stairwaysMem(arr, k, mem);
  mem.unshift(1);

  for (let elem of arr)
    if (k - elem >= 0) 
      ways += mem[k - elem];

  return ways;
}

const sArray = [1, 3, 5];
const k =9;

console.log(stairwaysGen(sArray, k));