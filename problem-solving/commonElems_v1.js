// ----
// finds common elements from 2 arrays
// ----



function findCommon(arrA, arrB) {
  let listElems = {}, common = [];

  for (let ind = 0; ind < arrA.length; ind++) {
    if (!listElems[arrA[ind]]) {
      listElems[arrA[ind]] = arrA[ind];
    }
  }

  for (let ind = 0; ind < arrB.length; ind++) {
    if (listElems[arrB[ind]]) {
      common.push(arrB[ind]);
    }
  }

  return common;
}

let arrA = [1, 2, 3, 4, 5, 6, 7];
let arrB = [3, 4, 5, 6, 8];

console.log(findCommon(arrA, arrB));