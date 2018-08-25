// -------------------------------------------------
// 
// Implementation of Queue Data structure
// using Linked List in Javascript
//
// -------------------------------------------------

// ----
// node for linked list, note that node has a 
// next and previous pointer
// -------------------------------------------------
class LinkNode {
  constructor(val = '') {
    this.value = val;
    this.next = null;
    this.prev = null;
  }

}

// ----
// Stack as a Linked List
// -------------------------------------------------
class Queue {
  constructor(value = '') {
    this.head = value === '' ? null : new LinkNode(value);
    this.tail = value === '' ? null : this.head;
    this.size = value === '' ? 0 : 1;
  }

  isEmptyQueue() {
    return this.size === 0;
  }

  // enqueue
  enqueue(value) {
    let newNode = new LinkNode(value);

    if (newNode === null) {
      console.log('Insufficient memory.');
      process.exit(1);
    }

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // have new node's prev point to existing tail, queue is FIFO structure
      newNode.prev = this.tail; 
      this.tail.next = newNode;
      this.tail = newNode; // the added node becomes the new tail
    }

    this.size++;
  }

  // dequeue removes from head of list
  dequeue() {
    if (this.isEmptyQueue()) {
      console.log("no items left in queue");
      return undefined;
    }

    const newHead = this.head.next;  // have a holder point to next value
    const dequeuedItem = this.head.value;


    delete this.head; // free up memory
    this.head = newHead;
    if (this.head !== null) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }

    this.size--;
    return dequeuedItem;
  }

  peek() {
    return this.head.value;
  }

  getSize() {
    return this.size;
  }
}

// Build Linked List
let myQueue = new Queue();
myQueue.enqueue("first element");
myQueue.enqueue("second element");
myQueue.enqueue("third element");
myQueue.enqueue("fourth element");
let abandonedQueue = myQueue.dequeue();
myQueue.enqueue("fifth element");

// Print out linked list
console.log(myQueue);
console.log(`abandoned queue: ${abandonedQueue}`);