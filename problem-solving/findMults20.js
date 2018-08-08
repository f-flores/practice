arrNums = [3, 4, 2, 7, 9, 5, 6, 12, 76];

function findFactors(arr, product) {
  let  factors = {}, result = [];
  
  for (let i in arr) {
    if (product % arr[i] === 0)
      // add factor to dictionary
      factors[arr[i]] = -1;
      
      // look in dictionary for factor such that of arr[i] * otherFactor = product
      const otherFactor = product / arr[i];
      // console.log('factors: ', JSON.stringify(factors));
      if (factors[otherFactor]) {
        result.push(otherFactor);
        result.push(arr[i]);
        break;
      }

  }
  
	return result;
}


console.log(findFactors(arrNums, 20));