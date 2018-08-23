/*

  Implementation of Trie Data Structure

  */

  class TrieNode {
    constructor(letter = '') {
      this.letterKey = letter;
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

    insert(wrd, node = this.root) {
      if (wrd.length === 0) {
        // no more letters left in word, set end of word to true
        node.setEndWord();
        return;
      } 

      // if letter node does not exist, create node and connect newly created child
      // node to trie structure
      if (!node.children.has(wrd[0])) {
        let childNode = new TrieNode(wrd[0]);
        node.children.set(wrd[0], childNode);
      }
      // insert 'remaining part' of the word into trie structure using substring method
      return this.insert(wrd.substring(1), node.children.get(wrd[0]));
    }


    isWord(wrd, node = this.root) {
      // start searching for word at root
      // check current character against trie, if got to end of word return isEndWord() boolean
      if (wrd.length === 0) {
        return node.isEndWord();
      } 

      // check wrd character by character by following 'wrd' path
      if (node.children.has(wrd[0])) {
        return this.isWord(wrd.substring(1), node.children.get(wrd[0]));
      } else {
        return false;
      }
      
    }

    // Source of remove function (java version):
    // https://www.baeldung.com/trie-java
    // returns true if parent map could delete the entry;
    remove(wrd, node = this.root, index = 0) {
      // first, check if at end of word
      if (wrd.length === index) {
        if (!node.isEndWord()) {
          return false;
        }
        node.unsetEndWord();

        // if node has no other child mapping, next line returns true
        return node.children.size === 0;
      }

      // second, check current character
      let ch = wrd[index];

      if (node.children.has(ch) === false) {
        return false;
      }

      // determine whether node should be deleted
      let shouldDelete = this.remove(wrd, node.children.get(ch), index + 1);

      // third, if true, delete mapping of character and TrieNode map
      if (shouldDelete) {
        node.children.delete(ch);

        // return true if no mappings are left in the map
        return node.children.size === 0;
      }

      return false;
    }

    print(node = this.root, s = "") {
      if (node === null) {
        return;
      }

      // if end of word print word, note that this function keeps on looking for 
      // words on this path
      if (node.isEndWord()) {
        console.log(s);
      } 

      for (let key of node.children.keys()) {
        // concatenate key character to string, recurse
        this.print(node.children.get(key), s.concat(key));
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
      console.log(`key ${key}: value -- ${value}`);
    }

    console.log("==== trie ====");
    console.log(trie, null, 2);
    trie.print();
  }

  testTrie();