// ================================================
//
// finds one or more pairs of factors that multiply
// to product
//
// =================================================

arrNums = [10, 3, 4, 2, 7, 9, 20, 5, 6, 12, 76, 10, 99, 1, 45, 7];

function findTwoFactors(arr, product) {
  let  factors = {}, result = [], pairsFound = {};
  
  for (let i in arr) {
    if (product % arr[i] === 0)
      // add factor to dictionary
      factors[arr[i]] = -1;
      
      // look in dictionary for factor such that of arr[i] * otherFactor = product
      const otherFactor = product / arr[i];
      console.log('factors: ', JSON.stringify(factors));

      if (factors[otherFactor]) {
        const pair = [];
        pair.push(otherFactor, arr[i]);
        
        // avoid placing duplicate pairs
        if (!pairsFound[otherFactor]) {
          result.push(pair);
          pairsFound[otherFactor] = -1;
          pairsFound[arr[i]] = -1;
        }
      }

  }
  
	return result;
}


console.log(findTwoFactors(arrNums, 36));