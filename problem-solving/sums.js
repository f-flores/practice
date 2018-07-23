// calculate sum of list

myList = [23, 54, 32, 19, 21, 15];

function forLoopSum(arr) {
  var sum = 0;

  for (x of arr) {
    sum += x;
  }

  return sum;
}

function whileSum(myList) {
  var sum = 0, index = 0;

  while (index < myList.length) {
    sum += myList[index];
    index++;
  }

  return sum;
}

function recursiveSum(arr, n) {
  if (n === 0)
    return arr[n];
  else
    return arr[n] + recursiveSum(arr, n - 1);

}

console.log("List: " + myList);
console.log("forLoopSum(): " + forLoopSum(myList));
console.log("whileSum(): " + whileSum(myList));
console.log("recursiveSum(): " + recursiveSum(myList, myList.length - 1));