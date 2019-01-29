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

    return insert(elem.substring(1), node.children.get(elem[0]));
  }
}






