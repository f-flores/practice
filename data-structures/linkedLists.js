
// -------------------------------------------------
// 
// Implementation of Linked List in Javascript
//
// -------------------------------------------------

class LinkedList {
  constructor(value) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      this.addToHead(value);
  }

  addToHead(value) {
    const addedNode = {value};
    addedNode.next = this.head; // have new value point to current head
    this.head = addedNode; // the head now becomes the new object
    
    if (this.length === 0) {
      this.tail = addedNode;
    }

    this.length++;
    return this;
  }

  addToTail(value) {
    const newNode = {value};
    if (this.tail) {
      this.tail.next = newNode;
      this.tail = this.tail.next;
    }
    this.length++;
    return this;
  }

  removeFromHead() {
    if (this.length === 0) return undefined;

    let newHead = this.head.next;  // have a holder point to next value
    this.head = newHead;
    if (!this.head) this.tail = null; // empty list, set tail back to null
    this.length--;
    return this;
  }

  removeFromTail() {
    // empty list
    if (!this.tail) return undefined;
    if (this.length === 1) this.removeFromHead();

    let nodePtr = this.head;
    let prevPtr = null;

    if (nodePtr) {
      while (nodePtr) {
        if (nodePtr.next === this.tail) {
          this.tail = {value: nodePtr.value};
          prevPtr.next = this.tail;

          this.length--;
          break;
        }
        prevPtr = nodePtr;
        nodePtr = nodePtr.next;
      }
    }

    return this;
  }

  remove(val) {
    if (this.length === 0) return undefined;
    // have pointer to beginning of list
    let nodePtr = this.head;
    let prevPtr = nodePtr;
    let nextPtr;

    // initialize next pointer, useful if removing first element
    nextPtr = (nodePtr) ? nodePtr.next : null;

    // search for node
    while (nodePtr) {
      if (nodePtr.value === val) {
        // remove node from list by having prev pointer skipping over 'val' and
        // connect with next element
        prevPtr.next = nextPtr;
        // special case if removing first element
        if (nodePtr === this.head) {
          this.head = nextPtr;
        }
        if (nodePtr === this.tail) {
          this.tail = nextPtr;
        }
        this.length--;
        break; //removed node, break out of loop
      }
      prevPtr = nodePtr;
      nodePtr = nodePtr.next;
      if (nodePtr) nextPtr = nodePtr.next;
    }

    return this;
  }

  findVal(val) {
    let listPntr = this.head;

    while (listPntr) {
      if (listPntr.value === val) {
        return listPntr; // item was found
      }
      listPntr = listPntr.next;
    }
    return listPntr;
  }

}
// Build Linked List
let myList = new LinkedList("second");
myList.addToTail("Hello");
myList.addToHead("third");
myList.addToTail("fourth");
myList.addToTail("fifth");
myList.addToHead("sixth");
myList.addToTail("99");
// myList.removeFromTail();
myList.removeFromTail();
myList.addToTail("55");

// remove from Head
// myList.removeFromHead();

// search for value
// let foundElem = myList.findVal("third");
// console.log("Found?: " + JSON.stringify(foundElem));

// remove value from list
// myList.remove("second");
// myList.removeFromHead();

// Print out linked list
console.log(JSON.stringify(myList));