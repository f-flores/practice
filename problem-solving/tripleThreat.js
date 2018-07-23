// array of numbers
numArray = [9, 10, 4, 7, 5, 3, 28, 41, 54, 35, 29, 98, 34];

// returns 1 if there are 3 consecutive numbers where each is 
// greater than the previous 
function tripleThreat(arr) {
  if (arr.length < 3) return 0;

  for (var ind = 0; ind < arr.length; ind++) {
    // first see if elements exist
    if (arr[ind + 2] && arr[ind + 1]) {
      if (arr[ind + 2] > arr[ind + 1] &&
          arr[ind + 1] > arr[ind])
          return 1;
    }
  }
  return 0;
}

// returns 1 if there are con consecutive numbers where each is 
// greater than the previous 
function tripleThreat2(arr, con) {
  if (arr.length < con) return 0;
  let consecutiveCnt = 0;

  if (arr.length >= con) {
    for (var ind = 1; ind < arr.length; ind++) {
      if (arr[ind] > arr[ind - 1]) {
        consecutiveCnt++;
        if (consecutiveCnt === con - 1)
          return 1;
      } else {
        consecutiveCnt = 0;
      }
    }
  }
  return 0;
}


console.log("triple threat result: ", tripleThreat(numArray));
console.log("triplethreat2 result: ", tripleThreat2(numArray, 5));