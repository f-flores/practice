testWord = process.argv[2];

function isPalindrome(s) {
  // compare first and last chars
	// check if string is nonempty
	if (s) {
		for (let i  = 0, j=s.length - 1; i !== j; i++, j--) {  
			if (s[i] !== s[j])
				return false;
		}
	}
  
  return true;
}


console.log(isPalindrome(testWord));