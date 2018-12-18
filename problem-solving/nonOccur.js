// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)

  let nonOccurrenceMin = 1;
  for (let i = 0; i < A.length; i++) {
    console.log(`A[${i}]: ${A[i]}, nonOccurrenceMin: ${nonOccurrenceMin}`);
    if (A.includes(nonOccurrenceMin) === false) {
      break;
    }
    else if (A[i] > 1) {
      nonOccurrenceMin++;
    }
  }
  return nonOccurrenceMin;
}

const arr = [-8, -8, -7, 2, 1, 1, 1, 56, 1, 1, 1, 1, 1, 1, 1, 1, -5, -5, -5, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 4];

console.log(solution(arr));