function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('need int');
  }
  return a + b;
}

module.exports = sum;
