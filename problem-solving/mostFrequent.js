/*

  Given an array of integers, return the integer appearing the most frequently


*/

const arrInts = [3, 1, 2, 3, 4, 5, 4, 2, 4, 99, 99, 99, 23, 99, 23, 99, 2, 99, 0, 99];
      // arrInts = [];

function mostFrequent(arr) {
  let freqTable = new Object();
  let maxCtr = 0, maxElem = null;

  for (elem of arr) {
    // initialize occurrences of element to one when number is encountered for the first time
    if (!freqTable[elem]) {
      freqTable[elem] = 1;
    } else {
      // freqTable[elem] exists increment value
      freqTable[elem] += 1;
    }
    if (freqTable[elem] > maxCtr) {
      maxCtr = freqTable[elem];
      maxElem = elem;
    }
  }
  console.log("freqTable: ", JSON.stringify(freqTable, null, 2));
  return maxElem;
}




console.log(mostFrequent(arrInts));

