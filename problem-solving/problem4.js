/*
  write a function that takes 2 strings, s1 and s2
  and returns the longest common subsequence of s1 
  
  Examples:
  "ABAZDC", "BACBAD" => "ABAD",
  "AGGTAB", "GXTXAYB" => "GTAB",
  "aaaa", "aa" => "aa"
  *
  */

  /*
   * a node in a trie has a letter key, children (represented by a hashmap)
   *  and and endWord boolean.
   */
  class TrieNode {
    constructor(nodeKey = ''){
      this.letterKey = nodeKey;
      this.children = new Map();
      this.endWord = false;
    }

    setEndWord() {
      this.endWord = true;
    }

    unsetEndWord() {
      this.endWord = false;
    }

    isEndWord() {
      return this.endWord;
    }
  
  }


class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(elem, node=this.root) {
    if (elem.length === 0) {
      node.setEndWord();
      return;
    }

    if (!node.children.has(elem[0])) {
      let childNode = new TrieNode(elem[0]);
      node.children.set(elem[0], childNode);
    } 

    return this.insert(elem.substring(1), node.children.get(elem[0]));
  }

  isWord(elem, node=this.root) {
    if (elem.length === 0) {
      return node.isEndWord();
    }

    if (node.children.has(elem[0])) {
      return this.isWord(elem.substring(1), node.children.get(elem[0]));
    } else {
      return false;
    }
  }

  remove(elem, node=this.root, index = 0) {
    if (elem.length === index) {
      if (!node.isEndWord()) {
        return false;
      } 

      node.unsetEndWord();

      return node.children.size === 0;
    }

    // check current character
    const curCh = elem[index];
    if (!node.children.has(curCh)) {
      return false;
    }

    // determine whether node should be deleted
    const shouldDelete = this.remove(elem, node.children.get(curCh), index+1);
    if (shouldDelete) {
      node.children.delete(curCh);

      // next line returns true if no child is left in char map 
      return node.children.size === 0;
    }
    return false;
  }

  print(str="", node=this.root) {
    if (node === null) {
      return;
    }

    if (node.isEndWord() === true) {
      console.log(str);
    }

    for (let key of node.children.keys()) {
      this.print(str.concat(key), node.children.get(key));
    }
  }
}

function testTrie() {
  let trie = new Trie();

 // console.log(JSON.stringify(trie, null, 2));
  trie.insert("net");
  trie.insert("nob");
  trie.insert("nag");
  trie.insert("not");
  trie.insert("no");
  trie.insert("new");
  trie.insert("help");
  trie.insert("note");
  trie.remove("not");

  console.log(trie.isWord("not"));
  console.log(trie.isWord("note"));
  // trie.remove("help");
  console.log(trie.isWord("help"));
  

  for (var [key, value] of trie.root.children.entries()) {
    console.log(`key ${key}: value -- ${JSON.stringify(value, null, 2)}`);
  }

  console.log("==== trie ====");
  console.log(trie);
  trie.print();
}

testTrie();

/*
 * s1 and s2
 *   Examples:
 * "ABAZDC", "BACBAD" => "ABAD",
 * "AGGTAB", "GXTXAYB" => "GTAB",
 * "aaaa", "aa" => "aa"
 */

//  "ABAZDC", "BACBAD" => "ABAD",
//  s1, s2 
function gcSubstring(str1, str2, gSub) {
  let s1Pos = 0, s2Pos = 0;

  while (s1Pos < str1.length) {
    // if chars are equal, add to substring and advance both s1 and s2 pos
    if (str1[s1Pos] === str2[s2Pos]) {
      gSub.push(str1[s1Pos]);
      s1Pos++;
      s2Pos++;
    } else {
      for (let tPos = s2Pos; tPos < str2.length; tPos++) {
        if (str1[s1Pos] === str2[tPos]) {
          gSub.push(str2[tPos]);
          s2Pos = tPos;
          break;
        }
      }
      s1Pos++;
    }
  }

  return gSub.join('');
}

const getMaxStr = arr => {
  let maxStr = "";

  for (str of arr) {
    if (str.length > maxStr.length)
      maxStr = str;
  }

  return maxStr;
}


const getGcSubstring = (s1, s2) => {
  let arrStr = [];

  arrStr.push(gcSubstring(s1, s2, []));
  arrStr.push(gcSubstring(s2, s1, []));

  return getMaxStr(arrStr);
}

const s1 = "AGGTAB";
const s2 = "GXTXAYB";
// const s2 = "aaaa";
// const s1 = "aa"
// const s1 = "GXTXAYB";
// const s2 = "AGGTAB";
// const s2 = "ABAZDC";
// const s1 = "BACBAD";

console.log(getGcSubstring(s1, s2));

