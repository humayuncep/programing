export const calc = () => ({
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
});
export const sqrt = Math.sqrt;
export const square = x => x * x;
export const  diag = (x, y) => sqrt(square(x) + square(y));
