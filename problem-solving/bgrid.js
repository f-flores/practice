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


const getFullGrid = (grid, nGrid) => {
  let gridArr = [];
  const cols = grid[0].length,
        rows = grid.length;

  for (let row = 0; row < rows; row++) {
    let gridStr = grid[row];
    for (let col = 0; col < cols; col++) {
      if (gridStr.charAt(col) !== 'O') {
        nGrid[row][col] = 'O';
      } else {
        nGrid[row][col] = 'x';
      }
      gridStr = gridStr.substring(0, col) + 'O' + gridStr.substring(col+1);
    }
    gridArr.push(gridStr);
  }
  return gridArr;
}

const getExplodeResult = (grid, rows, cols) => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 'x') {
        if (j - 1 >= 0 && grid[i][j-1] !== 'x') 
          grid[i][j - 1] = '.';
        if (j+1 < cols && grid[i][j+1] !== 'x')
          grid[i][j + 1] = '.';
        if (i - 1 >= 0 && grid[i - 1][j] !== 'x')
          grid[i - 1][j] = '.';
        if (i + 1 < rows && grid[i + 1][j] !== 'x')
          grid[i + 1][j] = '.';
      }
    }
    // set 'x' placeholders to '.'
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 'x')
        grid[i][j] = '.';
    }
  }

  // set grid back to array of strings format
  for (let index = 0; index < rows; index++) {
    grid[index] = grid[index].join('');
  }
}

const bgrid = (n, gr) => {
  let rows = gr.length, cols = gr[0].length;

  if (n === 0 || n === 1) {
    return gr.join('\n');
  } 

  let grState3 = [...Array(rows)].map(x=>Array(cols).fill(0));
  let grState2 = getFullGrid(gr, grState3);
  getExplodeResult(grState3, rows, cols);
  let grState4 = [...Array(rows)].map(x=>Array(cols).fill(0));
  getFullGrid(grState3, grState4);
  getExplodeResult(grState4, rows, cols);
  if (n % 2 === 0) {
    return grState2.join('\n');
  } else if (n % 4 === 1) {
    return grState4.join('\n');
  } else { 
    return grState3.join('\n');
  }
}



let grid3 = 
[ ".......",
  "...O...",
  "....O..",
  ".......",
  "OO.....",
  "OO....."
];
let grid4 = 
[ ".......",
  "...O.O.",
  "....O..",
  "..O....",
  "OO...OO",
  "OO.O...",
];

// test values
for (let x = 0; x < 11; x++) {
  console.log(`\n--- ${x} ---`);
  console.log(bgrid(x, grid3));
}

/*


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

const constructGrid = gr => {
  const grArr = [];
  for (let str of gr)
    grArr.push(str.split(''));
  return grArr;
}

const constructGrid = gr => {
  const grArr = [];
  let strArr = [];

  for (let str of gr) {
    strArr.push(str.split(''));
    grArr.push(strArr);
    strArr = [];
  }
  return grArr;
}


*/