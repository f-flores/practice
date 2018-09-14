let expect = require("chai").expect;

var multiply = function(x, y) {
  if (typeof x !== "number" || typeof y !== "number") {
    throw new Error("x or y is not a number. Cannot complete operation");
  }
  else
    return x * y;
}

// chai test routine
// describe test to be performed
// ======================================================
describe("Multiply", function() {
  it ("should properly multiple when passed numbers", function(){
    expect(multiply(2,4)).to.equal(8);
  });
  it ("should throw error when not passed numbers", function(){
    expect(multiply(2,"4")).to.throw(Error);
  });
});
