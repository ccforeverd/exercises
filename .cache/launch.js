'use strict';

/**
 * 判断是否是大数
 * @param {Number} n 数值
 * @returns {Boolean}
 */
const isBigNumber = n => {
  console.log(1, n);
  console.log(2, Number(n));
  console.log(3, Number(n).toString());
  return Number(n).toString().indexOf('e+') > -1
};

const bigNumber2Array = n => {
  
};

var utils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  isBigNumber: isBigNumber,
  bigNumber2Array: bigNumber2Array
});

// 位数数组

class BigNumberArray extends Array {
  constructor (number) {
    super(0);

    if (typeof number !== 'number') {
      throw new Error('request a number')
    }
    if (!isBigNumber(number)) {
      throw new Error('request a big number')
    }

    number = Number(number); // Number(1333e33) => 1.333e+36 相当于格式化
    number = number.toString(); // 字符串化 => "1.333e+36"
    number = number.split('e+'); // 分开数值和位数 => ["1.333", "36"]

    const figure = Number(number[1]); // 取到位数, e+右侧 => 36

    number = number[0]; // e+左侧 => "1.333"
    number = number.replace('.', ''); // 去掉小数点 => "1333"
    number = [...number]; // 数组化 => ["1", "3", "3", "3"]
    number = number.map((item, index) => [Number(item), figure - index]); // 位数化 => [[1, 36], [3, 35], [3, 34], [3, 33]]

    // this.concat(number)
    this.push(...number);

    console.log(JSON.stringify(this));
  }
}

Object.assign(BigNumberArray, utils);

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

console.log(new BigNumberArray(1333e33));
