/*

  Implementation of Trie Data Structure

  */

  class TrieNode {
    constructor() {
      this.tkeys = new Map();
      this.end = false;
    }

    setEnd = () => this.end = true;

    unsetEnd = () => this.end = false;

    isEnd = () => this.end;

  }


  class Trie {
    constructor() {
      this.root = new TrieNode();
    }

    insert(wrd, node = this.root) {
      if (wrd === null) {
        node.setEnd();
        return;
      } else {
        // if letter node does not exist, create it
        if (!node.tkeys.has(wrd[0])) {
          node.tkeys.set(wrd[0], new TrieNode());
        }
        // insert 'rest' of string into trie structure
        return this.insert(wrd.substring(1), node.tkeys.get(wrd[0]));
      }
    }

    isWord(wrd) {
      return false;
    }

    remove(wrd) {

    }

    print() {

    }
  }