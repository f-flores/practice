

function fib(n, mem=[]) {
  var fibOfN;
  if (mem[n]) {
    return mem[n];
  }

  if (n <= 1) {
    mem[n] = 1;
    fibOfN = mem[n];
  } else {
    fibOfN = fib(n-1, mem) + fib(n-2, mem);
  }
  mem[n] = fibOfN;
  return fibOfN;
}

let n = 10, memArr=[];
fibAnswer = fib(n, memArr);
// let memArr = fibAnswer;
// console.log("Fib(" + n + ") = " + fibAnswer);
// console.log(`Fibonacci array [1..${n}]: ${memArr.slice(0, memArr.length - 1)}`);
console.log(`Fibonacci array [1..${n}]: ${memArr}`);
