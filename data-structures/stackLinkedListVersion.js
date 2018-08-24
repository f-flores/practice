
// -------------------------------------------------
// 
// Implementation of Stack Data structure
// using Linked List in Javascript
//
// -------------------------------------------------

// ----
// node for linked list
// -------------------------------------------------
class LinkNode {
  constructor(val = '') {
    this.value = val;
    this.next = null;
  }

}

// ----
// Stack as a Linked List
// -------------------------------------------------
class Stack {
  constructor(value = '') {
      this.head = value === '' ? null : new LinkNode(value);
      this.size = value === '' ? 0 : 1;
  }

  isEmptyList() {
    return this.size === 0;
  }

  // push is 'like' addToHead
  push(value) {
    const addedNode = new LinkNode(value);

    if (addedNode === null) {
      console.log('Insufficient memory.');
      process.exit(1);
    }

    addedNode.next = this.head; // have new value point to current head
    this.head = addedNode; // the head now becomes the new object

    this.size++;
    return this;
  }

  // pop is 'like' remove from head
  pop() {
    if (this.size === 0) {
      console.log("stack underflow");
      return undefined;
    }

    const newHead = this.head.next;  // have a holder point to next value

    delete this.head; // free up memory
    this.head = newHead;
    this.size--;

    return this;
  }

  peek() {
    return this.head;
  }


  hasVal(val) {
    let listPntr = this.head;

    while (listPntr) {
      if (listPntr.value === val) {
        return true; // item was found
      }
      listPntr = listPntr.next;
    }
    return false; 
  }

  getSize() {
    return this.size;
  }
}
// Build Linked List
let myStack = new Stack();
myStack.push("first element");
myStack.push("second element");
myStack.push("third element");
myStack.push("fourth element");
let topElem = myStack.peek();
console.log(`topElem: ${topElem.value}`);
myStack.pop();

// Print out linked list
console.log(JSON.stringify(myStack, null, 2));