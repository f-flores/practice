// =============================================
//
// Implementation of Hash table in javascript
//    Hash Table with chaining
//
// ============================================


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
// linked list class
// -------------------------------------------------
class LinkedList {
  constructor(value = '') {
      this.head = value === '' ? null : new LinkNode(value);
      this.size = value === '' ? 0 : 1;
  }

  isEmptyList() {
    return this.size === 0;
  }

  addToHead(value) {
    const addedNode = new LinkNode(value);
    addedNode.next = this.head; // have new value point to current head
    this.head = addedNode; // the head now becomes the new object

    this.size++;
    return this;
  }

  removeFromHead() {
    if (this.size === 0) 
      return undefined;

    const newHead = this.head.next;  // have a holder point to next value

    delete this.head; // free up memory
    this.head = newHead;
    this.size--;

    return this;
  }


  remove(val) {
    if (this.size === 0) 
      return undefined;

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

        this.size--;
        delete nodePtr.value; // free up objected pointed to by nodePtr
        break; //removed node, break out of loop
      }
      
      prevPtr = nodePtr;
      nodePtr = nodePtr.next;

      if (nodePtr)
        nextPtr = nodePtr.next;
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
}

// ----
// 
// Hash table
//
// ----------------------------------------------
const HASH_MAP_SIZE = 10;
class HashTable {
  constructor() {
    // set array to maximum hash map size
    this.hashArr = new Array(HASH_MAP_SIZE);

    // each entry in the hash table is a linked list
    let index = 0;
    while (index < HASH_MAP_SIZE) {
      this.hashArr[index] = new LinkedList();
      index++;
    }
  }

  // =============================================================
  // Javascript verson of djb2 and deciToBin hash functions and
  // http://pmav.eu/stuff/javascript-hashing-functions/source.html
  //
  // Decimal to Binary
  // Source: http://www.hscripts.com/scripts/JavaScript/decimal-binary-convertor.php
  // =============================================================
  deciToBin(arg) {
    let res1 = 999;
    let args = arg;
    while (args > 1) {
      const arg1 = parseInt(args/2);
      const arg2 = args%2;
      args = arg1;
      if (res1 == 999) {
        res1 = arg2.toString();
      } else {
        res1 = arg2.toString() + res1.toString();
      }
    }
    if (args == 1 && res1 != 999) {
      res1 = args.toString() + res1.toString();
    } else if(args == 0 && res1 == 999) {
      res1 = 0;
    } else if(res1 == 999) {
      res1 = 1;
    }
    var ll = res1.length;
    while(ll % 4 != 0) {
      res1 = "0"+res1;
      ll = res1.length;
    }	
    return res1;
  }


  // ===============================================
  // djb2 Hash
  //  Source: http://www.cse.yorku.ca/~oz/hash.html
  // ===============================================
  djb2(s) {
    let b = '', i, hash = 5381;
    
    for (i = 0; i < s.length; i++) {
      b += this.deciToBin(s[i].charCodeAt());
    }
    
    for (i = 0; i < b.length; i++) {
      if (b[i] == '1') {
      hash = ((hash << 5) + hash) + 1;
      } else {
      hash = ((hash << 5) + hash) + 0;
      }
    }
    
    return Math.abs(hash) % HASH_MAP_SIZE;
  }
 

  // hash function returns index to hash table, employs djb2 algorithm
  hashFn(str) {
    return this.djb2(str);
  }

  hashInsert(value, key) {
    this.hashArr[key].addToHead(value);
  }

  getKey(value) {
    return this.contains(value) ? this.hashFn(value) : undefined;
  }

  contains(value) {
    const hashIndex = this.hashFn(value);
    return this.hashArr[hashIndex].hasVal(value);
  }

  remove(value) {
    const hashIndex = this.hashFn(value);
    return this.contains(value) ? this.hashArr[hashIndex].remove(value) : undefined;
  }


}

// Build Linked List
const myList = new LinkedList("second");
myList.addToHead("third");
myList.addToHead("fourth");
myList.removeFromHead(); myList.removeFromHead();myList.removeFromHead();

// console.log(JSON.stringify(myList, null, 2));

const myList2 = new LinkedList();
myList2.addToHead("hello");
myList2.addToHead("first");
console.log(JSON.stringify(myList2, null, 2));

const myHash = new HashTable();
let person1 = "Matt";
let person2 = "Kate";
let person3 = "Jen";
let person4 = "Matt";

let hInd = myHash.hashFn(person1);
myHash.hashInsert(person1, hInd);
hInd = myHash.hashFn(person2);
myHash.hashInsert(person2, hInd);
hInd = myHash.hashFn(person3);
myHash.hashInsert(person3, hInd);
myHash.remove(person2);
hInd = myHash.hashFn(person4);
myHash.hashInsert(person4, hInd);


console.log(JSON.stringify(myHash, null, 2));

