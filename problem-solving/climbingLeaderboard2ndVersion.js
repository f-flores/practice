/*

Alice is playing an arcade game and wants to climb to the top of the leaderboard. Can you help her track her ranking as she plays? The game uses Dense Ranking, so its leaderboard works like this:

The player with the highest score is ranked number  on the leaderboard.
Players who have equal scores receive the same ranking number, and the next player(s) receive the immediately following ranking number.
We want to determine Alice's rank as she progresses up the leaderboard. For example, the four players on the leaderboard have high scores of , , , and . Those players will have ranks , , , and , respectively. If Alice's scores are , and , her rankings after each game are ,  and .

You are given an array, , of monotonically decreasing leaderboard scores, and another array, , of Alice's scores for the game. You must print  "number"s. The  "number" should indicate the current rank of alice after her  game.

Input Format

The first line contains an "number" , the number of players on the leaderboard. 
The next line contains  space-separated "number"s , the leaderboard scores in decreasing order. 
The next line contains an "number", , denoting the number games Alice plays. 
The last line contains  space-separated "number"s , her game scores.

Constraints

 for 
 for 
The existing leaderboard, , is in descending order.
Alice's scores , are in ascending order.
Subtask

For  of the maximum score:

Output Format

Print  "number"s. The  "number" should indicate the rank of alice after playing the  game.

  Sample Input:
  7
  100 100 50 40 40 20 10
  4
  5 25 50 120

  Expected Output:
  6
  4
  2
  1


 */

 function binarySearch(val, arr, left, right) {
   let mid = Math.trunc((left + right) / 2);
   // console.log(`left: ${left}, right: ${right}, mid ${mid}, arr[mid] = ${arr[mid]}`);
   // console.log(`val: ${val}`);
   // console.log(arr);

   if (val === arr[mid]) {
     return mid + 1;
   }

   if (left > right) {
     // console.log(`val: ${val}`);
     return left + 1;
   } else if (val > arr[mid]) {
     return binarySearch(val, arr, left, mid - 1);
   } else {
     return binarySearch(val, arr, mid + 1, right);
   }
 }

 function climbingLeaderboard(scores, alice) {
  // attach places to scores, scores are passed in decreasing order
  let arrScores = [];
  for (let ind = 1; ind <= scores.length; ind++) {
    // remove duplicates from array
    if (scores[ind] !== scores[ind - 1]) {
      arrScores.push(scores[ind - 1]);
    }
  } 

  // console.log("scoreBoard: ", JSON.stringify(scoreBoard, null, 2));
  // console.log("arrScores: ", arrScores);
  let alicePlaces = [];
  for (let j = 0; j < alice.length; j++) {
    // compare alice's scores against scoreBoard
    // assumption is that alice's scores are in increasing order
    // figure out what place alice 
    // console.log("Scoreboard: ", arrScores, " scoreBoard.length: ", arrScores.length);
    let tmpPlace = binarySearch(alice[j], arrScores, 0, arrScores.length -1);
    // console.log(`tmpPlace: ${tmpPlace}`);
    alicePlaces.push(tmpPlace);
    if (tmpPlace < arrScores.length) {
      arrScores = arrScores.slice(0, tmpPlace - 1);
    }
  }

   return alicePlaces;
 }


 const highScores = [100, 100, 50, 40, 40, 20, 10];
 const alice = [5, 25, 50, 120];
 // const alice = [5, 25, 50, 120];
 // const alice = [30, 30, 50, 120];
 // const highScores = [110, 101, 100, 100, 99, 98, 97, 96, 95, 80, 70, 65, 50, 42, 41, 40, 20, 10, 10];
 // const alice = [9, 10, 25, 35, 50, 55, 56, 62, 75, 99, 100, 101, 120];
 // const highScores = [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9];
 // const alice = [0, 1, 1, 1, 1, 1, 2, 2, 9, 11, 25];
 // const highScores = [7100, 100, 50, 40, 40, 20, 10];
 // const alice = [25, 45, 50, 120];
 // const highScores = [9, 8, 7];
 // const alice = [5, 7, 8, 9, 10];
 // const highScores = [3];
 // const alice = [1, 1, 1, 1, 1, 2];
 // const alice = [1, 2, 3, 4];

 console.log(climbingLeaderboard(highScores, alice));
