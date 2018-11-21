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

function indent(l) {
  let indentStr = '';
  for (let j = 0; j < l; j++) {
    indentStr += ' ';
  }
  return indentStr;
}

function attemptRecent(chosen, k, index) {
  // console.log(`attemptRecent: ch[ind]: ${chosen[index]}, index+1: ${index+1}`);
  return Math.abs(chosen[index] - (index + 1)) === k;
}

/* function attemptPerm(chosen, k) {
  for (let ind = 0; ind < chosen.length; ind++) {
    if (Math.abs(chosen[ind] - (ind + 1)) !== k)
      return false;
  }
  return true;
} */

// start check at end of array
function attemptPerm(arr, k) {
  for (let ind = arr.length - 1; ind > 0; ind--) {
    if (Math.abs(arr[ind] - (ind + 1)) !== k)
      return false;
  }
  return true;
}

// find all permutations
function permute(arr, chosen, left, k) {
  // console.log(`${indent(chosen.length)}permute(arr:[${arr}], ch:[${chosen}], ${k}, left: ${left})`);
  if (arr.length === 0) {
      if (attemptPerm(chosen, k) === true) {
        // console.log(`chosen: ${chosen.join(" ")}, arr: ${arr}, left: ${left}`);
        return true;
      }

  }  else if (attemptRecent(chosen, k, chosen.length -1) === false && chosen.length > 0) {
    return false;
  } 
  else {
    for (let i = 0; i < arr.length; i++) {
      // choose
      let choose = arr[i];
      chosen.push(choose);
      arr.splice(i, 1);

      // explore
      const found = permute(arr, chosen, i, k);

      if (found) {
        return chosen;
      } else {
        // unchoose -- backtrack
        arr.splice(i, 0, choose);
        chosen.pop();
      } 
    }
  }
  return false;
}



function permutationK(n, k) {
  const arrN = [...Array(n).keys()].map(x => x +1);
  let chosen = [];
  let result = permute(arrN, chosen, 0, k);
  return (result === false) ? [-1] : chosen;
}

const nItems = 5;
const k = 0;

console.log(permutationK(nItems, k));