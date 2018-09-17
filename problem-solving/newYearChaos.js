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

function inOrder(arr, index, next) {
  let inOrder = true;

  if (index === 0 && arr.length > 1) {
    console.log(`index + 1, arr[index]: ${arr[index]}`);
    if (arr[index] > arr[index + 1])
      inOrder = false;
  } else if (index === arr.length - 1) {
    console.log(`index - 1, arr[index]: ${arr[index]}`);
    if (arr[index] < arr[index - 1])
      inOrder = false;
  } else if (arr[index] < arr[index - 1] || arr[index] > arr[index + 1]) {
    console.log(`normal case, arr[index]: ${arr[index]}`);
    inOrder = false;
  }

  if (!next.includes(arr[index]) && Math.abs(arr[index] - next[next.length - 1]) <= 1) {
    next.push(arr[index]);
  }

  return inOrder;
}

function outOfOrder(arr, index, next) {
  let outOfOrder = false;
  if (!next.includes(arr[index]) ) {
    if (arr[index] <= next[next.length - 1] + 2) {
      next.push(arr[index]);
      // test that arr[index + 1] is within array range
      if (index + 1 < arr.length) {
        if (arr[index] > arr[index + 1]) {
          console.log(`out of order here ${arr[index]}`);
          outOfOrder = true;
        }
      }
    } else {
      console.log(`out of order here ${arr[index]}`);
      outOfOrder = true;
    }
  } 

  return outOfOrder;
}

function minimumBribes(q) {
  let rSum = 0; // running sum
  let nextNum = [1];

  for (let i = 0; i < q.length; i++) {
    if (!inOrder(q, i, nextNum)) {
      const diff = Math.abs(i + 1 - q[i]);
      rSum += diff;
      if (diff > 2) {
        return "Too chaotic";
      }
       console.log(`diff: ${diff}`);
    }
    console.log(`nextNum: ${nextNum}`);
  }

  return rSum;
}

// const qArray = [1,2,5,3,7,8,6,4];
// const qArray = [2, 5, 1, 3, 4];
const qArray = [2, 1, 5 ,3 ,4];
// const qArray = [1,2,5,3,4,7,8,6]

console.log(minimumBribes(qArray));