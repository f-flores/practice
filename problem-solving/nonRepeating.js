// ---
// find first non repeating character in a string
// Example: non_repeating("bbyz") -> y
//          non_repeating("aabcb") -> c
// ---

nonRepeating = (s) => {
  let sMap = new Map();

  for (let ch of s)
    if (!sMap.has(ch))
      sMap.set(ch, 1);
    else 
      sMap.set(ch, sMap.get(ch) + 1);

  // console.log(sMap);

  for (const [key, value] of sMap) {
    if (value === 1)
      return key;
  }

  return null;
}

const str = "xxyz";

console.log(nonRepeating(str));
console.log(nonRepeating("abcab")); // should return 'c'
console.log(nonRepeating("abab")); // should return null
console.log(nonRepeating("aabbbc")); // should return 'c'
console.log(nonRepeating("aabbdbc")); // should return 'd'