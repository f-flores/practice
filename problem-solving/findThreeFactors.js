// ================================================
//
// finds three factors of a product of multiples
//
// =================================================

arrNums = [33, 1, 10, 3, 4, 2, 7, 9, 20, 5, 6, 12, 76, 10, 99, 1, 45, 7];

function findTwoFactors(arr, product) {
  let  factors = {}, result = [];
  
  for (let i in arr) {
    // add factor to dictionary
    if (product % arr[i] === 0)
      factors[arr[i]] = -1;
      
    // look in dictionary for factor such that of arr[i] * otherFactor = product
    const otherFactor = product / arr[i];
    if (factors[otherFactor]) {
      result.push(otherFactor, arr[i]);
      break;
    }
  }
  
	return result;
}

function findThreeFactors(arr, product) {
  let factorsList = [];

  for (let index = 0; index < arr.length; index++) {
    let tmpResult = [];
    if (product % arr[index] === 0) {
      tmpResult = findTwoFactors(arr.slice(index + 1), product / arr[index]);
      if (tmpResult.length > 0) {
        factorsList.push(arr[index]);
        let a, b;
        [a, b] = tmpResult;
        factorsList.push(a, b);
        break;
      }
    }
  }
  return factorsList;
}


console.log(findThreeFactors(arrNums, 300));