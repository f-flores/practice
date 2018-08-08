/*

Maria plays college basketball and wants to go pro. Each season she maintains a record of her play. She tabulates the number of times she breaks her season record for most points and least points in a game. Points scored in the first game establish her record for the season, and she begins counting from there.

For example, assume her scores for the season are represented in the array . Scores are in the same order as the games played. She would tabulate her results as follows:

                                 Count
Game  Score  Minimum  Maximum   Min Max
 0      12     12       12       0   0
 1      24     12       24       0   1
 2      10     10       24       1   1
 3      24     10       24       1   1
Given Maria's scores for a season, find and print the number of times she breaks her records for most and least points scored during the season.

Function Description

Complete the breakingRecords function in the editor below. It must return an integer array containing the numbers of times she broke her records. Index  is for breaking most points records, and index  is for breaking least points records.

breakingRecords has the following parameter(s):

scores: an array of integers
Input Format

The first line contains an integer , the number of games. 
The second line contains  space-separated integers describing the respective values of .

Constraints

Output Format

Print two space-seperated integers describing the respective numbers of times her best (highest) score increased and her worst (lowest) score decreased.

Sample Input 0

9
10 5 20 20 4 5 2 25 1
Sample Output 0

2 4


 */


// Complete the breakingRecords function below.
function breakingRecords(scores) {
  let result = [], minCtr = 0, maxCtr = 0;
  let currMin, currMax;
  
  // set default min and max scores to first score
  if (scores !== null) {
      currMin = scores[0];
      currMax = scores[0];
  }
  
  for (let score of scores) {
      if (score < currMin) {
          currMin = score;
          minCtr++;
      } else if (score > currMax) {
          currMax = score;
          maxCtr++;
      } 
  }

  result.push(maxCtr, minCtr);
  return result;
}

const scores = [10, 4, 9, 7, 5, 3, 7, 11];

console.log(breakingRecords(scores));