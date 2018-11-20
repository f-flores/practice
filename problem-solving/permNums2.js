/*

We define  to be a permutation of the first  natural numbers in the range . Let  denote the value at position  in permutation  using -based indexing.

 is considered to be an absolute permutation if  holds true for every .

Given  and , print the lexicographically smallest absolute permutation . If no absolute permutation exists, print -1.

For example, let  giving us an array . If we use  based indexing, create a permutation where every . If , we could rearrange them to :

pos[i]	i	|Difference|
3	1	2
4	2	2
1	3	2
2	4	2
Function Description

Complete the absolutePermutation function in the editor below. It should return an integer that represents the smallest lexicographically smallest permutation, or  if there is none.

absolutePermutation has the following parameter(s):

n: the upper bound of natural numbers to consider, inclusive
k: the integer difference between each element and its index
Input Format

The first line contains an integer , the number of test cases. 
Each of the next  lines contains  space-separated integers,  and .

Constraints

Output Format

On a new line for each test case, print the lexicographically smallest absolute permutation. If no absolute permutation exists, print -1.

Sample Input

3
2 1
3 0
3 2
Sample Output

2 1
1 2 3
-1
Explanation

Test Case 0:

perm.png

Test Case 1:

perm(1).png

Test Case 2: 
No absolute permutation exists, so we print -1 on a new line.

*/

// https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering


function indent(l) {
  let indentStr = '';
  for (let j = 0; j < l; j++) {
    indentStr += ' ';
  }
  return indentStr;
}

function attemptPerm(arr, k) {
  for (let ind = 0; ind < arr.length; ind++) {
    if (Math.abs(arr[ind] - (ind + 1)) !== k)
      return false;
  }
  return true;
}

const swap = (arr, i, j) => {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

// find all permutations
function permute(arr, k) {
  let found = false;

  do {
    console.log(`${indent(2)}permute(arr:[${arr}], ${k})`);
    if (attemptPerm(arr, k) === true) {
      console.log(`found combo: ${arr}`);
      found = true;
    } else {
      // find largest x such that arr[x] < arr[x + 1]
      let largestX = -1;
      // [1, 2, 5, 3, 7, 8], start at end of arr
      for (let x = arr.length - 1; x > 0; x--) {
        if (arr[x] > arr[x - 1]) {
          largestX = x - 1;
          break;
        }
      }

      if (largestX === -1) {
        console.log('done');
        break;
      }

      console.log(`largestX: ${largestX}`);
      // find the largest y such that arr[largestX] < arr[y]
      for (let y = arr.length - 1; y > 0; y-- ) {
        if (arr[y] > arr[largestX]) {
          largestY = y;
          break;
        }
      }
      console.log(`largestY: ${largestY}`);

      // swap arr[largestX] and arr[largestY]
      swap(arr, largestX, largestY);

      // reverse arr[x+1...n]
      let subArr = arr.splice(largestX + 1);
      subArr.reverse();
      arr = [...arr, ...subArr];
      // console.log(arr);
      // const found = permute(arr, k);
    }
  } while (!found)
  return (found === true) ? arr : false;
}



function permutationK(n, k) {
  let arrN = [...Array(n).keys()].map(x => x +1);
  let result = permute(arrN, k);
  console.log(`result: ${result}`);
  return (result === false) ? [-1] : arrN;
}

const nItems = 3;
const k = 2;

console.log(permutationK(nItems, k));


