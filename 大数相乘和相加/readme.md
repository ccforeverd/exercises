# 大数相乘和相加

## 首先, 从测试开始

``` js
// 定义两个超大数
const test1 = 1.333e31
const test2 = 5.777e30

// 直接输出相加和相乘
console.log(test1 + test2) // 1.9107e+31
console.log(test1 * test2) // 7.700740999999999e+61

// 定义一个大数相加
const bigNumberAdd = (...numbers) => {
}

// 定义一个大数相乘
const bigNumberMultiply = (...numbers) => {
}

// 输出结果
console.log(bigNumberAdd(test1, test2))
console.log(bigNumberMultiply(test1, test2))

```

## 现在假设所有的大数直接相加和相乘都无法实现

要先有一个判断是否是大数的方法

``` js
// 1.3333e100 === 1.3333e+100
// > true
// 大数有两种写法, 值是相同的, 区别在有没有加号

// 判断是否是大数
const isBigNumber = n => {
  return Number(n).toString.indexOf('e') > -1
}

```

然后需要有一种方式来表示大数

``` js
// 定义一种数组格式, [[a1,b1],[a2,b2],...]
// 其中 a1,a2,... 表示位数上的值
// 其中 b1,b2,... 表示位数
// 比如 1.3333e100 => [[1,100],[3,99],[3,98],[3,97],[3,96]]
// 比如 123 => [[1,2],[2,1],[3,0]]
// 值为0的可以不用保留
// 比如 10203 => [[1,4],[2,2],[3,0]]



```
