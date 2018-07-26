arrNums = [3, 23, 5, 7, 8, 9, 23, 5, 9, 5, 9];

// return first duplicate
function findDups(arr) {
	// put non-duplicate elements into dictionary
  let numsPresent = {};
  let allDups = [];
  
  for (let i in arr) {
  	// if number is not in array already put it in the numsPresent dictionary
  	if (!numsPresent[arr[i]])
    	numsPresent[arr[i]] = -1;
    else {
    	// return duplicates
    	if (!allDups.includes(arr[i]))
      	allDups.push(arr[i]);
     }
  }
  
	return allDups;
}


console.log(findDups(arrNums));