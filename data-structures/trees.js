// -------------------------------------------------
// 
// Implementation of Trees in Javascript
//
// -------------------------------------------------



// node represents a leaf in a tree
class Node {

  // initialize node
  constructor(val) {
    this.data = val;
    this.left = null;
    this.right = null;
  }

  contains(val) {
    if (val === this.data) {
      return true;
    } else if (val < this.data) {
      if (this.left) {
        return this.left.contains(val);
      } else {
        return false;
      }
    } else {
      if (this.right) {
        return this.right.contains(val);
      } else {
        return false;
      }
    }
  }

  insert(val) {
    if (val <= this.data) {
      if (!this.left) {
        this.left = new Node(val);
      } else {
        this.left.insert(val);
      }
    } else {
      if (!this.right) {
        this.right = new Node(val);
      } else {
        this.right.insert(val);
      }
    }
  }

  printTree() {
    console.log(JSON.stringify(this, null, 2));
  }

  printInOrder() {
    if (this.left) {
      this.left.printInOrder();
    }
    console.log(this.data);
    if (this.right) {
      this.right.printInOrder();
    }
  }

  printPreOrder() {
    console.log(this.data);
    if (this.left) {
      this.left.printPreOrder();
    }
    if (this.right) {
      this.right.printPreOrder();
    }
  }

  printPostOrder() {
    if (this.left) {
      this.left.printPostOrder();
    }
    if (this.right) {
      this.right.printPostOrder();
    }
    console.log(this.data);
  }
}

// ----------------------------------------------------------
// Tree constructor function
//
function Tree() {
  // initialize root to null
  this.root = null;
}

Tree.prototype.insertVal = function(val) {
  let node = new Node(val);

  if (!this.root) {
    this.root = node;
  } else {
    this.root.insert(val);
  }
}

Tree.prototype.printTree = function() {
  console.log("==== tree structure ====");
  return this.root.printTree();
}

Tree.prototype.printInOrder = function() {
  console.log("==== tree printInOrder ====");
  return this.root.printInOrder();
}

Tree.prototype.printPreOrder = function() {
  console.log("==== tree printPreOrder ====");
  return this.root.printPreOrder();
}

Tree.prototype.printPostOrder = function() {
  console.log("==== tree printPostOrder ====");
  return this.root.printPostOrder();
}

Tree.prototype.contains = function(val) {
  return this.root.contains(val);
}

function main() {
  console.log("in main");
  const MaxTreeNum = 99;
  const NumNodes = 20;
  const tree = new Tree();

  for (let i = 0; i < NumNodes; i++) {
    tree.insertVal(Math.floor(Math.random() * MaxTreeNum) + 1);
  }

  tree.printTree();
  tree.printInOrder();

  let searchVal = Math.floor(Math.random() * MaxTreeNum) + 1;
  console.log(`tree contains ${searchVal} ? : ${tree.contains(searchVal)}`);
  // tree.printPostOrder();
  // tree.printPreOrder();
  console.log(`root value: ${tree.root.data}, root left: ${tree.root.left}, root right: ${tree.root.right}`);

}

main();