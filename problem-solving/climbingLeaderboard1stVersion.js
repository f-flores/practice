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

 function climbingLeaderboard(scores, alice) {
  // attach places to scores, scores are passed in decreasing order
  let scoreBoard = {}, place = 1, maxScore = -1;
  for (let score of scores) {
    if (!scoreBoard[score]) {
      scoreBoard[score] = place++;
    }
  } 
  console.log("scoreBoard: ", JSON.stringify(scoreBoard, null, 2));
  let alicePlaces = [];
  for (let scoreAlice of alice) {
    // compare alice's scores against scoreBoard
    // assumption is that alice's scores are in increasing order
    if (!scoreBoard[scoreAlice]) {
      // figure out what place alice 
      let tmpPlace = -1, tmpIndex = 0;
      let foundLesser = false, foundGreater = false;

      for (let score in scoreBoard) {
        console.log(`aliceScore: ${scoreAlice}, score: ${score}, place compared: ${scoreBoard[score]}, tmpPlace: ${tmpPlace}`);
        console.log("scoreBoard: ", JSON.stringify(scoreBoard, null, 2));
        if (scoreAlice < score) {
          tmpPlace = scoreBoard[score] + 1;
          foundLesser = true;
          // if on first element in board, low score, break out of loop
          if (tmpIndex === 0) {
            break;
          }
        } else if (scoreAlice > score) {
          // if first place, break out of loop
          if (scoreBoard[score] === 1) {
            tmpPlace = 1;
            break;
          } else {
            tmpPlace = scoreBoard[score] - 1;
            delete scoreBoard[score];
          }
          foundGreater = true;
        }
        if (foundLesser && foundGreater) {
          delete scoreBoard[score];
          break;
        }
      }
      alicePlaces.push(tmpPlace);
      tmpIndex++;
    } else {
      // alice tied with other player
      alicePlaces.push(scoreBoard[scoreAlice]);
    }
  }

   return alicePlaces;
 }


 // const highScores = [100, 100, 50, 40, 40, 20, 10];
 // const alice = [5, 25, 50, 120];
 // const alice = [30, 30, 55];
 // const highScores = [110, 101, 100, 100, 99, 98, 97, 96, 95, 80, 70, 65, 50, 42, 41, 40, 20, 10, 10];
 // const alice = [9, 10, 25, 35, 50, 55, 56, 62, 75, 99, 100, 101, 120];
 const highScores = [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9];
 const alice = [0, 1, 1, 1, 1, 1, 2, 2, 9, 11, 25];
 // const highScores = [7100, 100, 50, 40, 40, 20, 10];
 // const alice = [25, 45, 50, 120];

 console.log(climbingLeaderboard(highScores, alice));
