var mem = [];
mem[0] = 0;
mem[1] = 1;

function fib(n) {
  var fibOfN;
  if (mem[n]) {
    return mem[n];
  }

  if (n <= 1) {
    fibOfN = mem[n];
  } else {
    fibOfN = fib(n-1) + fib(n-2);
  }
  mem[n] = fibOfN;
  return fibOfN;
}

var n = 10;
fibAnswer = fib(n);
console.log("Fib(" + n + ") = " + fibAnswer);
console.log("Fibonacci array: " + mem);
