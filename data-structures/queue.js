// =======================================================
//
// Javascript implementation of a queue
//
// =======================================================

const MAX_CAPACITY = 14;

class Queue {
  constructor() {
    this.queue = new Array(MAX_CAPACITY);
    this.front = 0;
    this.size = 0;
  }

  // enqueue FIFO structure
  enqueue(value) {
    // check for overflow
    if (this.size + 1 === MAX_CAPACITY) {
      console.log(`Queue has reached MAX capacity of ${MAX_CAPACITY}`);
    } else if (this.size + 1 > MAX_CAPACITY) {
      console.log(`Max Capacity of ${MAX_CAPACITY} already reached. Cannot accept ${value} entry!`);
      return;
    }
    let pos = this.front + this.size;
    if (pos >= MAX_CAPACITY){
      pos %= MAX_CAPACITY;
    }

    this.queue[pos] = value;
    ++this.size;
  }

  // dequeue
  dequeue() {
    // check for underflow
    if (this.size < 0) {
      console.log("Queue is empty. No items to dequeue.")
      return;
    }

    this.size --;
    return this.queue[this.front++];
  }

  // returns top most element of queue without popping it off
  peek() {
    return this.queue[this.front];
  }

  isEmpty() {
    return this.size === 0;
  }

  getSize() {
    return this.size;
  }

}

let myqueue  = new Queue();

for (let index = 0; index < MAX_CAPACITY; index++) {
  myqueue.enqueue(Math.floor(Math.random() * MAX_CAPACITY + 1));
}
let topMost = myqueue.peek();


topMost = myqueue.dequeue();
topMost = myqueue.dequeue();
myqueue.enqueue(23);
myqueue.enqueue(45);
topMost = myqueue.dequeue();
myqueue.enqueue(36);

console.log(`dequeued element: ${topMost}`);
console.log(`peeking front of queue: ${myqueue.peek()}`);
console.log(JSON.stringify(myqueue, null, 2));