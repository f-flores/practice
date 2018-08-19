/*

  Implementation of Trie Data Structure

  */

  class TrieNode {
    constructor(letter = '') {
      this.letterKey = letter;
      this.children = new Map();
      this.end = false;
    }

    setEnd() {
      this.end = true;
    }

    unsetEnd() {
      this.end = false;
    }

    isEnd() {
      return this.end;
    }
  }


  class Trie {
    constructor() {
      this.root = new TrieNode();
    }

    insert(wrd, node = this.root) {
      if (wrd.length === 0) {
        node.setEnd();
        return;
      } else {
        // if letter node does not exist, create node and connect newly created child
        // node to trie structure
        if (!node.children.has(wrd[0])) {
          let childNode = new TrieNode(wrd[0]);
          node.children.set(wrd[0], childNode);
        }
        // insert 'remaining part' of the word into trie structure using substring method
        return this.insert(wrd.substring(1), node.children.get(wrd[0]));
      }
    }

    isWord(wrd, node = this.root) {
      // start searching for word at root
      // check current character against trie, if got to end of word return isEnd() boolean
      if (wrd.length === 0) {
        return node.isEnd();
      } else {
        // check wrd character by character by traversing trie
        if (node.children.has(wrd[0])) {
          return this.isWord(wrd.substring(1), node.children.get(wrd[0]));
        } else {
          return false;
        }
      }
    }

    // returns true if parent map could delete the entry;
    remove(wrd, node = this.root, index = 0) {
      // first, check if at end of word
      if (index === wrd.length) {
        if (!node.isEnd())
          return false;
      }
    }

    print() {

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
    trie.insert("help");

    console.log("==== trie ====");
    console.log(trie, null, 2);
    for (var [key, value] of trie.root.children.entries()) {
      console.log(`key ${key}: value -- ${value}`);
    }
    console.log(trie.isWord("not"));
    console.log(trie.isWord("note"));
  }

  testTrie();