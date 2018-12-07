// ----
// finds common elements from 2 arrays; both arrays are sorted ascending
// ----



function findCommon(arrA, arrB) {
  let cntA = 0, cntB = 0;
  let common = [];

  while (cntA < arrA.length && cntB < arrB.length) {
    if (arrA[cntA] === arrB[cntB]) {
      common.push(arrA[cntA]);
      cntA++;
      cntB++;
    } else if (arrA[cntA] < arrB[cntB]) {
      cntA++;
    } else {
      cntB++;
    }
  }

  return common;
}

let arrA = [1,3,4,6,7,9];
let arrB = [1,2,4,5,9,10];

console.log(findCommon(arrA, arrB));