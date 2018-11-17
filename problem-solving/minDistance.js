/* ========================================================
We define the distance between two array values as the number of indices between the two values. Given , find the minimum distance between any pair of equal elements in the array. If no such value exists, print .

For example, if , there are two matching pairs of values: . The indices of the 's are and , so their distance is . The indices of the 's are  and , so their distance is .

Function Description

Complete the minimumDistances function in the editor below. It should return the minimum distance between any two matching elements.

minimumDistances has the following parameter(s):

a: an array of integers
Input Format

The first line contains an integer , the size of array . 
The second line contains  space-separated integers .

Constraints

Output Format

Print a single integer denoting the minimum  in . If no such value exists, print .

Sample Input

6
7 1 3 4 1 7
Sample Output

3
Explanation 
Here, we have two options:

 and  are both , so .
 and  are both , so .
The answer is .
*/

// get repeated elements
function getRepeated(a) {
  let rMap = new Map();

  for (let i = 0; i < a.length; i++) {
    if (!rMap.has(a[i])) {
      const subscriptArr = [];
      subscriptArr.push(i);
      rMap.set(a[i], subscriptArr);
    } else {
      // retrieve array and append new location to key value pair
      const arr = rMap.get(a[i]);
      const newArr = [...arr, i];
      rMap.set(a[i], newArr);
    }
  }
  return rMap;
}

// get distances
function getDistances(m) {
  let distances = [];

  for (let vals of m.values()) {
    if (vals.length > 1) {
      for (let ind = 1; ind < vals.length; ind++) {
        distances.push(Math.abs(vals[ind] - vals[ind - 1]));
      }
    }
  }

  return distances;
}


// Complete the minimumDistances function below.
function minimumDistances(a) {
  // first get map of distances for each repeated element
  let numMap = getRepeated(a);
  console.log(numMap);
  let distances = getDistances(numMap);
  console.log(`distances: ${distances}`);

  // get minimum distance
  let minDistance = Math.min(...distances);

  return distances.length === 0 ? -1 : minDistance;
}


const arr = [7, 1, 3, 4, 1, 7, 19, 1, 1];
console.log(`minimumDistance: ${minimumDistances(arr)}`);