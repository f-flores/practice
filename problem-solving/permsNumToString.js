const MaxAlph = 26;
const MaxAlphVal = '26';

// return permutations of values
// [122558] = abbeeh, lbeeh, lyeh, aveeh
	// start with small calculation
  // [1, 2] => [[1, 2], [12]] 
function permutations(n) {
	let tmpArr = [], prevArr = [], resultArr = [];
  let numString = n.toString().split("");
  let j;
  console.log('in permutations(): numString = ', numString);
	
  for (let i = 0; i < numString.length - 1; i++) {
  	if (!tmpArr[i])
    	tmpArr[i] = [];
    
    console.log("prevArr: ", prevArr);
      
		// if prev element is double digit skip current digit
    if (i === 0 || tmpArr[i].length !== 2) {
    	// if (i >= 1 && parseInt(numString[i - 1] + numString[i]) < parseInt('26'))
    		tmpArr[i].push(numString[i]);
    }
    // if (prevArr) tmpArr[i].push(prevArr);
    prevArr.push(tmpArr[i]);
      
  	for (j = i + 1; j < numString.length; j++) {
    	if (!tmpArr[j])
      	tmpArr[j] = [];
      
     // if (tmpArr[i].length !== 2)
      tmpArr[i].push(numString[j]);
     
      if (parseInt(numString[i] + numString[j]) < parseInt('26')) {
      	// concatenate
        console.log("hey");
        tmpArr[j].push(numString[i] + numString[j]);
      }
      // prevArr.push(tmpArr[i]);
    }  
  }
  
  return tmpArr;
}

// given an array of integer values
// return string of composed of those int values
// example: [1, 2] => "ab"
function getWord(arr) {
	let result = [];
  
	for (let i = 0; i < arr.length; i++) {
  	result.push(String.fromCharCode(parseInt(arr[i] - 1) + 97));
  }
  
  return result.join("");
}

function getPerms(num) {
	// read in arr of digits
  // calculate permutations
  // data structure will be an array of an array of integers
  // [1,2, 2, 5, 8] =>
  // perms = [[1, 2, 2, 5, 8], [1, 22, 5, 8], [12, 25, 8], [12, 2, 5, 8]]
	// start with small calculation
  // [1, 2] => [[1, 2], [12]] 
  // [1, 2, 5] => [[1,2,5], [12, 5], [1, 25]]
  let perms = [];
  let resultsArray = [];
  let result = [];
  perms = permutations(num);
  
  console.log("perms: ", perms);
  // for each permutation, calculate letter value
  for (const i in perms) {
    console.log("in print perms: ", perms[i]);
  	result = getWord(perms[i]);
    resultsArray.push(result);
  }
  
  // return array of strings
  return resultsArray;
}

let testNum = 123;

console.log(getPerms(testNum));