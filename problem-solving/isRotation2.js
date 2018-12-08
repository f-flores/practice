// ---
// is one array a rotation of another ? returns true or false
// ---

function isRotation(arrA, arrB) {
  let pB = 0,
      shiftedElems = [];

  if (arrA.length !== arrB.length) // arrays aren't of same length
    return false;

  // look for first matching element in arrB
  while (arrB[pB] !== arrA[0] && pB < arrB.length) {
    shiftedElems.push(arrB[pB]);
    pB++;
  }

  if (pB === arrB.length - 1) // no matching element found
    return false;

  arrB = [...arrB.slice(pB), ...shiftedElems];

  return arrA.join('') === arrB.join('');
}

const arrayA = [3, 4, 5, 1, 2];
const arrayB = [1, 2, 3, 4, 5];

console.log(isRotation(arrayA, arrayB));