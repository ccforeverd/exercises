'use strict';

const number2Array = n => {
  const [number, figure] = Number(n).toString().split('e+');
  if (figure) {
    // 大数
    return [
      ...[...Array(parseInt(figure) - number.length + 2)].fill(0), // 小数点 + 小数点左侧固定的一位数 = 2
      ...[...number.replace('.', '')].reverse().map(item => parseInt(item))
    ]
  } else {
    return number.reverse().map(item => parseInt(item))
  }
};

const array2Number = a => {
  return Number(a.reverse().join(''))
};

const bigNumberAdd = (...numbers) => {
  const arrays = numbers.map(number2Array);
  const maxLength = Math.max(...arrays.map(item => item.length));
  const result = [];
  for (let index = 0; index < maxLength; index++) {
    const number = (result[index] || 0) + arrays.map(item => item[index] || 0).reduce((r, n) => (r + n), 0);
    result[index] = number % 10;
    result[index + 1] = Math.floor(number / 10);
  }
  return array2Number(result)
};

const bigNumberMultiply = (...numbers) => {
  return Number(numbers
    .map(n => Number(n).toString().split('e+'))
    .reduce((result, [number, figure]) => {
      return [result[0] * parseFloat(number), result[1] + parseInt(figure || 0)]
    }, [1, 0])
    .join('e+'))
};

const test1 = 1.333e31;
const test2 = 5.777e30;

console.log(test1 + test2);
console.log(test1 * test2);

console.log(bigNumberAdd(test1, test2));
console.log(bigNumberMultiply(test1, test2));
