/*

You will be given two arrays of integers and asked to determine all integers that satisfy the following two conditions:

    The elements of the first array are all factors of the integer being considered
    The integer being considered is a factor of all elements of the second array

These numbers are referred to as being between the two arrays. You must determine how many such numbers exist.

For example, given the arrays and , there are two numbers between them: and . , , and for the first value. Similarly, , and , .

Function Description

Complete the getTotalX function in the editor below. It should return the number of integers that are betwen the sets.

getTotalX has the following parameter(s):

    a: an array of integers
    b: an array of integers

Input Format

The first line contains two space-separated integers, and , the number of elements in array and the number of elements in array .
The second line contains distinct space-separated integers describing where .
The third line contains distinct space-separated integers describing where .

Constraints

Output Format

Print the number of integers that are considered to be between 'a' and 'b'.

Sample Input

2 3
2 4
16 32 96

Sample Output

3

Explanation

2 and 4 divide evenly into 4, 8, 12 and 16.
4, 8 and 16 divide evenly into 16, 32, 96.

4, 8 and 16 are the only three numbers for which each element of a is a factor and each is a factor of all elements of b. 



 */

/**
 * test isMultiple()
 */
function isMultiple(arr, num) {
  for (let elem of arr) {
      if (num % elem !== 0)
          return false;
  }
  return true;
}

/**
* test isFactor()
*/
function isFactor(arr, num) {
  for (let elem of arr) {
      if (elem % num !== 0)
          return false;
  }
  return true;
}



/*
* Complete the getTotalX function below.
*/
function getTotalX(a, b) {
  /*
   * Write your code here.
   */
  let between = [];
  let minOfb = 1001, maxOfa = -1; // max of a and  b is 100
  // find minimum of b
  for (let elem_b of b)
    minOfb = Math.min(elem_b, minOfb);
  
  // find maximum of a
  for (let elem_a of a)
    maxOfa = Math.max(elem_a, maxOfa);
  
  // find factors that are between a and b
  for (let i = maxOfa; i <= minOfb; i++) {
      if (isMultiple(a, i) && isFactor(b, i)) {
          between.push(i);
      }
  }
  console.log("max A, min B, between: ", maxOfa, minOfb, between);
  
  return between.length;
}

function main() {
  const a = [2, 4];
  const b = [16, 32, 96];

  let total = getTotalX(a, b);

  console.log(total + "\n");
}

main();