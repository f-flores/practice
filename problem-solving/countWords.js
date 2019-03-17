// =======================
// Given a string of words, calculate
// number of words.
// ==================================

function wordCount(str) {
  // split str into array of characters
  let words = str.split(' ');
  // from left to right, search for space characters
  // when encounter a space, loop through all contiguous
  // spaces and continue word count at next non-space
  // character
  return words.length;
}

function wordCount2(str) {
  let words = str.split('');
  let wordCount = 1;

  for (let i = 0; i < words.length; i++) {
    if (words[i] === ' ') {
      wordCount++;
      while (words[i + 1] === ' ') {
        i++;
      }
    }
  }
  return words.length === 0 ? 0 : wordCount;
}

let sentence="yesterday was   Thursday";

console.log(wordCount2(sentence));
