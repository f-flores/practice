// ===========================================
//
// Graph data structure
// Adjacency list 
//
// ===========================================

//  node data structure
class Node {
  constructor(data, next = null) {
    this.value = data;
    this.next = next;
  }
}

// Linked List data structure with pointer to tail as well
class LinkedList {
  constructor() {
      this.head = null;
      this.length = 0;
  }

  add(value = '') {
    const newNode = new Node(value);
    newNode.next = this.head; // have new value point to current head
    this.head = newNode; // the head now becomes the new object

    this.length++;
    return this;
  }


  remove(val) {
    if (this.length === 0) return undefined;
    // have pointer to beginning of list
    let nodePtr = this.head;
    let prevPtr = null;

    // search for node
    while (nodePtr !== null && nodePtr.value !== val) {
      prevPtr = nodePtr;
      nodePtr = nodePtr.next;
    }


    if (prevPtr === null) {
      this.head = nodePtr.next;
      this.length--;
    } else {
      prevPtr.next = nodePtr.next;
      this.length--;
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

  print() {
    console.log(JSON.stringify(this, null, 2));
  }
}

// Build Linked List
let myList = new LinkedList();
myList.add("third");
myList.add("fourth");
myList.add("fifth");
myList.print();
myList.remove("third");
myList.print();


   // A user define class to represent a graph. 
    // A graph is an array of adjacency lists. 
    // Size of array will be V (number of vertices  
    // in graph) 
// ==================================================
// Implementation of Graph as an array of adjacency
// lists 
// ==================================================
  class Graph {
    constructor(Vertices) {
      this.Vertices = Vertices;
      this.adjacencyList = [];
      for (let i = 0; i < Vertices; i++) {
        this.adjacencyList[i] = new LinkedList();
      }
    }     

    // based on https://www.geeksforgeeks.org/graph-and-its-representations/
    addEdge(src, dest) {
      this.adjacencyList[src].add(dest);

      // since undirected graph, add src - dest AND dest - src edges
      this.adjacencyList[dest].add(src);
    }

    printGraph() {
      for (let v = 0; v < this.Vertices; v++) {
        process.stdout.write(`Vertex ${v} adjacency list\n head`);
        let currentList = this.adjacencyList[v].head;
        // console.log(currentList, null, 2);
        while (currentList !== null) {
          process.stdout.write(`-> ${currentList.value}`);
          currentList = currentList.next;
        }
        process.stdout.write(`\n`);
      }
    }

  } 

  
    // create the graph given in above figure 
    let V = 5; 
    let graph = new Graph(V); 
    graph.addEdge(0, 1); 
    graph.addEdge(0, 4); 
    graph.addEdge(1, 2); 
    graph.addEdge(1, 3); 
    graph.addEdge(1, 4); 
    graph.addEdge(2, 3); 
    graph.addEdge(3, 4); 
    
    // print the adjacency list representation of  
    // the above graph 
    graph.printGraph(); 
