/*

Bomberman lives in a rectangular grid. Each cell in the grid either contains a bomb or nothing at all.

Each bomb can be planted in any cell of the grid but once planted, it will detonate after exactly 3 seconds. Once a bomb detonates, it's destroyed — along with anything in its four neighboring cells. This means that if a bomb detonates in cell , any valid cells  and  are cleared. If there is a bomb in a neighboring cell, the neighboring bomb is destroyed without detonating, so there's no chain reaction.

Bomberman is immune to bombs, so he can move freely throughout the grid. Here's what he does:

Initially, Bomberman arbitrarily plants bombs in some of the cells, the initial state.
After one second, Bomberman does nothing.
After one more second, Bomberman plants bombs in all cells without bombs, thus filling the whole grid with bombs. No bombs detonate at this point.
After one more second, any bombs planted exactly three seconds ago will detonate. Here, Bomberman stands back and observes.
Bomberman then repeats steps 3 and 4 indefinitely.
Note that during every second Bomberman plants bombs, the bombs are planted simultaneously (i.e., at the exact same moment), and any bombs planted at the same time will detonate at the same time.

Given the initial configuration of the grid with the locations of Bomberman's first batch of planted bombs, determine the state of the grid after  seconds.

For example, if the initial grid looks like:

...
.O.
...
it looks the same after the first second. After the second second, Bomberman has placed all his charges:

OOO
OOO
OOO
At the third second, the bomb in the middle blows up, emptying all surrounding cells:

...
...
...
Function Description

Complete the bomberMan function in the editory below. It should return an array of strings that represent the grid in its final state.

bomberMan has the following parameter(s):

n: an integer, the number of seconds to simulate
grid: an array of strings that represents the grid
Input Format

The first line contains three space-separated integers , , and , The number of rows, columns and seconds to simulate. 
Each of the next  lines contains a row of the matrix as a single string of  characters. The . character denotes an empty cell, and the O character (ascii 79) denotes a bomb.

Constraints

Subtask

 for  of the maximum score.
Output Format

Print the grid's final state. This means  lines where each line contains  characters, and each character is either a . or an O (ascii 79). This grid must represent the state of the grid after  seconds.

Sample Input

6 7 3
.......
...O...
....O..
.......
OO.....
OO.....
Sample Output

OOO.OOO
OO...OO
OOO...O
..OO.OO
...OOOO
...OOOO
Explanation

The initial state of the grid is:

.......
...O...
....O..
.......
OO.....
OO.....
Bomberman spends the first second doing nothing, so this is the state after 1 second:

.......
...O...
....O..
.......
OO.....
OO.....
Bomberman plants bombs in all the empty cells during his second second, so this is the state after 2 seconds:

OOOOOOO
OOOOOOO
OOOOOOO
OOOOOOO
OOOOOOO
OOOOOOO
In his third second, Bomberman sits back and watches all the bombs he planted 3 seconds ago detonate. This is the final state after  seconds:

OOO.OOO
OO...OO
OOO...O
..OO.OO
...OOOO
...OOOO


*/
const getState1 = grid => grid;

const getState2 = (grid, nGrid) => {
  console.log('getState2');
  let row = 0,
      rows = grid.length,
      gridArr = []
      cols = grid[0].length;
  for (; row < rows; row++) {
    let rowStr = '', gridStr = grid[row];
    for (let col = 0; col < cols; col++) {
      // console.log(`gridStr.charAt(col): ${gridStr.charAt(col)}`);
      if (gridStr.charAt(col) !== 'O') {
        // col (i +- 1, )
        rowStr = `${rowStr}O`;
      } else {
        rowStr = `${rowStr}x`;
      }
      gridStr = gridStr.substring(0, col) + 'O' + gridStr.substring(col+1);
    }
    gridArr.push(gridStr);
    nGrid.push(rowStr);
  }
  return gridArr;
}

// create states --- based on time
// state(0, n) = 'o' or '.'
// state((i,j), n) = 'o' or '.'
const getState3 = (grid3, rows, cols) => {
  console.log(`in getState3, rows: ${rows}, cols: ${cols}`);
  for (let i = 0; i < rows; i++) {
    let rowStr = '', gridStr = grid3[i];
    console.log(`gridStr: ${gridStr}`);
    for (let j = 0; j < cols; j++) {
      if (gridStr.charAt(j) === 'x') {
        // console.log(`hello x`);
        if (j - 1 > 0) 
          gridStr = gridStr.substring(0, j - 1) + '.' + gridStr.substring(j);
        // gridStr = gridStr.substring(0, j) + '.' + gridStr.substring(j+1);
        if (j+1 < cols)
          gridStr = gridStr.substring(0, j+1) + '.' + gridStr.substring(j + 2);
      }
    }
    // console.log(grid3.splice(i, 0, rowStr));
  }
}

const bgrid = (n, gr) => {
  let rows = gr.length, cols = gr[0].length;
  let grState1 = getState1(gr);
  console.log(grState1);
  let grState3 = [];
  let grState2 = getState2(grState1, grState3);
  console.log('grState2');
  console.log(grState2.join('\n'));
  console.log('grState3');
  getState3(grState3, rows, cols);
  console.log(grState3.join('\n'), rows, cols);
  // if n == 1 or 2, return grid state one
  // if n == 3, return other grid
  // if n == 4, return other grid four
  return n === 1 ? gr.join('\n') : gr.join('\n');
}

const constructGrid = gr => {
  const grArr = [];
  for (let str of gr)
    grArr.push(str.split(''));
  return grArr;
}

const calcState = (gr, row, col, numSecs) => {
  const gridState = numSecs <= 3 ? 
          numSecs :
          numSecs % 2 === 0 ? 
            2 : 
            3;
  let val = gr[row][col], gridVal = val;
  // console.log(`gridState: ${gridState}`);
  switch(gridState) {
    case 0:
      break;
    case 1:
      gridVal = (val === 'O') ? 'O' : '.';
      break;
    case 2:
      gridVal = (val === 'O') ? 'O' : 'O';
      break;
    case 3:
      // gridVal = (val === 'O') ? '.' : 'O';
      if (val === 'O')
        gridVal = '.';
      else {
        // if (i+- 1, j) or (i, j+- 1) contain 'O' they're also cleared
        // if upper row (i - 1) within bound, test
        if (row - 1 >= 0 && gr[row -1][col] === 'O') {
          console.log(`before row: ${row} gr[row-1]: ${gr[row-1]}`);
          gr[row -1].splice(col, 1, '.');
          console.log(`after row: ${row} gr[row-1]: ${gr[row-1]}`);
        }
        // if lower row (i + 1) within bound, test
        gridVal = 'O';
        // if left column (j - 1) within bound, test
        // if right column (j + 1) within bound, test
      }
      break;
    default:
      break;
  }

  return gridVal;
}

const bgridTwo = (n, gr) => {
  const rows = gr.length, cols = gr[0].length;
  let grFinal = [...Array(rows)].map(x=>Array(cols).fill(0)),
      grArr = constructGrid(gr);
 //  console.log(`beginning grFinal: ${grFinal}`);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // console.log('--');
      // console.log(grArr[row][col]);
      grFinal[row].splice(col, 1, calcState(grArr, row, col, n));
    }
    // grFinal[row] = grFinal[row].join('');
  }

  // console.log(`grArr: ${grArr}`);
  console.log(`end n: ${n}, grFinal: ${grFinal}`);
  return grFinal;
}

let num = 3;
let grid = 
[ ".....",
  ".....",
  "..O..",
  ".....",
  "....."
];
let grid2 = ["O"];
let grid3 = 
[ ".......",
  "...O...",
  "....O..",
  ".......",
  "OO.....",
  "OO....."
];

// console.log(bgrid(num, grid2));
console.log(bgrid(0, grid3));
console.log(bgrid(1, grid3));
console.log(bgrid(2, grid3));
console.log(bgrid(3, grid3));
console.log(bgrid(4, grid3));
// console.log(bgridTwo(5, grid3));
// console.log(bgridTwo(6, grid3));
// console.log(bgridTwo(7, grid3));