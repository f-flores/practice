// weight to fulfill
//

// returns number of small bags needed
// input: (small, big, goal)
// output: number of small bags
// goal: kilos to fill
// small: bags 1k
// big: bags 5k
// if not possible return -1
function smBags(small, big, goal) {
  if (small + big * 5 < goal) return -1;
  let weightToFulfill = goal,
      numSmall = 0;

  if (goal / 5 < big) {
    weightToFulfill = goal % 5;
    console.log(`weightToFulfill: ${weightToFulfill}`);
    if (weightToFulfill > small)
      return -1;
    else {
      numSmall = weightToFulfill;
    }
  } else {
    if (weightToFulfill > small)
      return -1;
    else {
      numSmall = weightToFulfill - 5 * big;
    }
  }

  return numSmall;
}


console.log("number of small bags of skittles: ", smBags(24, 10, 3));

