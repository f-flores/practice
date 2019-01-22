// 
// given an array of numbers, find min and max elems of that array
// and returns an array of two sums: sum of array without max
// element and sum of array without min element
//

const getMinMaxSums= arr => {
  let result = [];
  let min = Number.MAX_SAFE_INTEGER, max = Number.MIN_SAFE_INTEGER;
  const reducer = (acc, item) => acc + item;
  const sumArray = arr.reduce(reducer);

  for (elem of arr) {
    if (elem < min) {
      min = elem;
    }
    if (elem > max) {
      max = elem;
    }
  }

  result.push(sumArray - min, sumArray - max);
  return result;
}

// returns length of number
// 34 -- 34/10 --> 3, 3/10 --> 0
const getLengthNum = num => {
  let len = 0;
  do {
    len++;
    num = Math.trunc(num / 10);
  } while (Math.abs(num) > 0);

  return len;
}

const numArray = [4, 3, 1, 2];
const numberX = -76978;

console.log(`getMinMax(${numArray}): ${getMinMaxSums(numArray)}`);
console.log(`getLengthNum(${numberX}): ${getLengthNum(numberX)}`);