// ---
// is one array a rotation of another ? returns true or false
// ---

function isRotation(arrA, arrB) {
  let pA = 0, pB = 0;
  
  // check arrays are of same length
  if (arrA.length !== arrB.length) {
    return false;
  }

  // look for first matching element in arrB
  while (arrB[pB] !== arrA[0] && pB < arrB.length) {
    pB++;
  }

  if (pB === arrB.length - 1) {
    return false;
  } else {
    for (; pA < arrA.length; pA++) {
      const bIndex = (pB + pA) % arrA.length;
      if (arrA[pA] !== arrB[bIndex]) {
        return false;
      }
    }
  }

  return true;
}

const arrayA = [1, 2, 3, 4, 5, 6, 7];
const arrayB = [4,5,6,7, 1, 2, 3];

console.log(isRotation(arrayA, arrayB));