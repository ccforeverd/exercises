'use strict';

const number2Array = n => {
  // console.log(n)
};

const doubleStringAdd = (ns1, ns2) => {

};


const bigNumberAdd = (...numbers) => {
  return numbers.map(number2Array)
    .reduce(doubleStringAdd, '0')
};

const bigNumberMultiply = (...numbers) => {
  return numbers
};

const test1 = 1.333e31;
const test2 = 5.777e30;

console.log(test1 + test2);
console.log(test1 * test2);

console.log(bigNumberAdd(test1, test2));
console.log(bigNumberMultiply(test1, test2));
