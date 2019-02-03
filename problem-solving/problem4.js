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

    if (node.isEndWord()) {
      console.log(str);
    }

    for (let key of node.children.keys()) {
      this.print(node.children.get(key), str.concat(key));
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
  console.log(trie, null, 2);
  // trie.print();
}

testTrie();




