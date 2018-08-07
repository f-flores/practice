var list1 = ["a", "b", "c","d","e","f"],
    list2 = [1, 2, 3],
    resultList = [];


function combineLists(arr1, arr2) {
  let resArr = [], index = 0;

  while (arr1[index] || arr2[index]) {
    if (arr1[index]) 
      resArr.push(arr1[index]);
    
    if (arr2[index])
      resArr.push(arr2[index]);

    index++;
  }
  return resArr;
}

resultList = combineLists(list1, list2);

console.log(resultList);