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



const swap = (arr, i, j) => {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

// test k against permutations
function permute(arr, k) {
  let arrSize = arr.length;

  let permutation = new Array(arrSize).fill(-1);
  for (let i = 0; i < arrSize; i++) {
    if(arr[i] === Math.abs(arr[i+k]-k) && permutation[i] === -1) {
      permutation[i] = arr[i+k];
      permutation[i+k] = arr[i];
    } else if (permutation[i] === -1) {
      // permutation is not possible if i'th value is still -1
      return [-1];
    }
  }
  return permutation;
}



function permutationK(n, k) {
  let arrN = [...Array(n).keys()].map(x => x +1);
  let result = permute(arrN, k);
  return result;
}

const nItems = 80;
const k = 4;

console.log(permutationK(nItems, k));
