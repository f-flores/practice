// =======================================================
//
// Javascript implementation of stack
//
// =======================================================

const MAX_STACK_SIZE = 10;

class Stack {
  constructor() {
    this.stack = new Array(MAX_STACK_SIZE);
    this.top = 0;
  }

  // pushes value as top element of stack
  push(value) {
    // check for overflow
    if (this.top >= MAX_STACK_SIZE) {
      process.exit(1);
    }

    this.stack[this.top++] = value;
  }

  // pop returns top most element of stack
  pop() {
    // check for underflow
    if (this.top === 0) {
      process.exit(1);
    }

    return this.stack[--this.top];
  }

  // returns top most element of stack without popping it off
  peek() {
    return this.stack[this.top - 1];
  }

  isEmpty() {
    return this.top === 0;
  }

  getSize() {
    return this.top;
  }

}

let myStack  = new Stack();

for (let index = 0; index < MAX_STACK_SIZE - 3; index++) {
  myStack.push(Math.floor(Math.random() * MAX_STACK_SIZE + 1));
}
let topMost = myStack.peek();

console.log(`peeking topMost: ${topMost}`);

topMost = myStack.pop();
topMost = myStack.pop();

console.log(`topMost after popping twice: ${topMost}`);
console.log(JSON.stringify(myStack, null, 2));
