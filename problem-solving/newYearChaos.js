/*
It's New Year's Day and everyone's in line for the Wonderland rollercoaster ride! There are a number of people queued up, and each person wears a sticker indicating their initial position in the queue. Initial positions increment by  from  at the front of the line to  at the back.

Any person in the queue can bribe the person directly in front of them to swap positions. If two people swap positions, they still wear the same sticker denoting their original places in line. One person can bribe at most two others. For example, if and  bribes , the queue will look like this: .

Fascinated by this chaotic queue, you decide you must know the minimum number of bribes that took place to get the queue into its current state!

Function Description

Complete the function minimumBribes in the editor below. It must print an integer representing the minimum number of bribes necessary, or Too chaotic if the line configuration is not possible.

minimumBribes has the following parameter(s):

q: an array of integers
Input Format

The first line contains an integer , the number of test cases.

Each of the next  pairs of lines are as follows: 
- The first line contains an integer , the number of people in the queue 
- The second line has  space-separated integers describing the final state of the queue.

Constraints

Subtasks

For  score 
For  score 

Output Format

Print an integer denoting the minimum number of bribes needed to get the queue into its final state. Print Too chaotic if the state is invalid, i.e. it requires a person to have bribed more than  people.

Sample Input

2
5
2 1 5 3 4
5
2 5 1 3 4
Sample Output

3
Too chaotic
Explanation

Test Case 1

The initial state:

pic1(1).png

After person  moves one position ahead by bribing person :

pic2.png

Now person  moves another position ahead by bribing person :

pic3.png

And person  moves one position ahead by bribing person :

pic5.png

So the final state is  after three bribing operations.

Test Case 2

No person can bribe more than two people, so its not possible to achieve the input state.

*/

// check for ascending order array
function isSorted(arr, pos) {
  // console.log(`isSorted: pos: ${pos} arr: ${arr}`);
  if (arr.length > 1) {
    if (pos >= arr.length - 1) pos = 0;
    for (let i = pos; i < arr.length - 1 ; i++) {
      if (arr[i] > arr[i+1]) {
        // console.log(`in isSorted, pos: ${pos} i: ${i}, arr[i]: ${arr[i]}`);
        return false;
      }
    }
    // check if whole list is sorted
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] + 1 !== arr[j+1]) {
        // console.log(`*** 2nd is sorted check ***`);
        return false;
      }
    }
  }
  return true;
}

function mySwap(arr, ind1, ind2) {
  const tmp = arr[ind1];

  arr[ind1] = arr[ind2];
  arr[ind2] = tmp;
}

function minimumBribes(q) {
  let nSwaps = 0, currSwaps = 0, pos = 0; // swaps
  let lineInOrder = false, swapped = false;

  if (q.length > 1) {
    while (!lineInOrder) {
      if (pos + 1 <= q.length) {
        if (q[pos] > q[pos + 1]) {
          mySwap(q, pos, pos + 1);
          swapped = true;
          currSwaps++;
          console.log(`SWAPPED currSwaps: ${currSwaps}, pos: ${pos}, q: ${q}`);
          if (currSwaps > 2) {
            console.log("Too chaotic");
            break;
          }
          
        } else {
          nSwaps += currSwaps;
          currSwaps = 0;
        }
      }
      pos++;
      if (swapped || pos === q.length) {
        lineInOrder = isSorted(q, pos);
        swapped = false;
        console.log(`lineInOrder: ${lineInOrder}`);
      }
      if (pos === q.length && !lineInOrder) {
        pos = 0;
        console.log(`restart line`);
      } else if (lineInOrder) {
        nSwaps += currSwaps;
        console.log(nSwaps);
      }
    }
 
  }

}

const qArray = [1,2,5,3,7,8,6,4];
// const qArray = [1,2,3,4,5,6,7,9,8,11,10];
// const qArray = [2, 5, 1, 3, 4];
// const qArray = [2, 1, 5 ,3 ,4];
// const qArray = [1,2,5,3,4,7,8,6];
// const qArray = [1,2,3,4,5];
// const qArray = [2,1];

// console.log(minimumBribes(qArray));
minimumBribes(qArray);