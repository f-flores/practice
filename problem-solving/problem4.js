/*


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

    isEndWord = () => this.endWord
  
  }







