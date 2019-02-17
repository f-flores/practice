// =============================================================
//
// isOneAway takes in two strings, s1 and s2
//  if s1 and s2 are one edit away, this program returns true
//  otherwise it returns false
//
// =============================================================
const compareSameLengthStrs = (arr1, arr2) => {
  let diffArr = [];

  for (sPos = 0; sPos < arr1.length; sPos++) {
    if (arr1[sPos] !== arr2[sPos]) {
      diffArr.push(arr2[sPos]);
      if (diffArr.length > 1)
        return false;
    }
  }
  return true;
}

const compareDiffLengthStrs = (arr1, arr2) => {
  let diffArr = [], arr1Pos = 0, arr2Pos = 0;
  while (arr1Pos < arr1.length) {
    if (arr1[arr1Pos] === arr2[arr2Pos]) {
      arr1Pos++;
      arr2Pos++;
    } else {
      diffArr.push(arr1[arr1Pos]);
      arr1Pos++;
      if (diffArr.length > 1)
        return false;
    }
  }

  return true;
}

function isOneAway(s1, s2) {
  const s1arr = s1.split('');
  const s2arr = s2.split('');

  // case where s1 and s2 are more than two edits away because of length
  if (Math.abs(s1arr.length - s2arr.length) >= 2)
    return false;
  // if strings are of equal length compare characters
  else if (s1arr.length === s2arr.length) {
    return compareSameLengthStrs(s1arr, s2arr);
  }
  // if strings vary by 1 character
  else if (s1arr.length > s2arr.length) {
    return compareDiffLengthStrs(s1arr, s2arr);
  }
  else if (s2arr.length > s1arr.length) {
    return compareDiffLengthStrs(s2arr, s1arr);
  }
}

const str1 = "qyaz";
const str2 = "qyz";

console.log(`isOneAway(${str1}, ${str2}): ${isOneAway(str1, str2)}`);
