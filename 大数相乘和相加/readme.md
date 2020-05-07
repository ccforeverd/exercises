# 大数相乘和相加

## 准备

``` js
// 定义两个超大数
const test1 = 1.333e31
const test2 = 5.777e30

// 直接输出相加和相乘
console.log(test1 + test2) // 1.9107e+31
console.log(test1 * test2) // 7.700740999999999e+61

// 定义一个大数相加
const bigNumberAdd = (...numbers) => {}

// 定义一个大数相乘
const bigNumberMultiply = (...numbers) => {}

// 输出结果
console.log(bigNumberAdd(test1, test2))
console.log(bigNumberMultiply(test1, test2))

```

## 从加法开始

把数字转成数组

比如数字 `123`

转成数组是 `[3, 2, 1]`

数组的脚标表示当前的位数

比如大数 `123.45e15`, 转为数组是 `[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4, 3, 2, 1]`

``` js
// 定义一个方法
const number2Array = n => {}

// 定义一个反转
const array2Number = a => {}
```

经过尝试, 发现大数支持几种写法, 比如 `123e15`, `123.45e15`, `1.23e+45`

简单处理, 直接通过 `Number()` 做格式化

``` js
const number2Array = n => {
  return Number(n)
}
```

然后需要区分一下是否是大数, 如果不是大数的话很好处理, 直接转字符串并反转一下就可以

``` js
const number2Array = n => {
  const [number, figure] = Number(n).toString().split('e+')
  if (figure) {
    // 大数
    return []
  } else {
    return number.reverse().map(item => parseInt(item)) // 注意, 不能直接 map(parseInt) 会输出 NaN
  }
}
```

上面的 `figure` 表示大数的位数, 它加上1就是数组的长度

`number` 就是格式化后的数值, 比如 `1.23`, 带小数点, 左侧只有一位

这样创建数组, 数组左侧是补0, 右侧是数值的反转(去掉小数点)

``` js
const number2Array = n => {
  const [number, figure] = Number(n).toString().split('e+')
  if (figure) {
    // 大数
    return [
      ...[...Array(parseInt(figure) - number.length + 2)].fill(0), // 小数点 + 小数点左侧固定的一位数 = 2
      ...[...number.replace('.', '')].reverse().map(item => parseInt(item))
    ]
  } else {
    return number.reverse().map(item => parseInt(item)) // 注意, 不能直接 map(parseInt) 会输出 NaN
  }
}
```

这样数值转数组算完成了

数组转数值就很简单

``` js
const array2Number = a => {
  return Number(a.reverse().join(''))
}
```

然后是关键的数组相加方法

其实转成数组后, 思路就很明确了, 同位的数组的值相加, 除以十, 余数放在当前位置, 值放在下一个位置

``` js
const bigNumberAdd = (...numbers) => {
  const arrays = numbers.map(number2Array)
  const maxLength = Math.max(...arrays.map(item => item.length))
  const result = []
  for (let index = 0; index < maxLength; index++) {
    const number = (result[index] || 0) + arrays.map(item => item[index] || 0).reduce((r, n) => (r + n), 0)
    result[index] = number % 10
    result[index + 1] = Math.floor(number / 10)
  }
  return array2Number(result)
}
```

这个方法就不详细解释了, 扩展成了多个大数相加

测试一下

``` js
const test1 = 1.333e31
const test2 = 5.777e30

console.log(test1 + test2) // 1.9107e+31
console.log(bigNumberAdd(test1, test2)) // 1.9107e+31
```

## 大数相乘的思维误区

开始由于思维惯性, 也想转成数组, 然后同位相乘

一开始感觉思路没有问题, 但结果很尴尬, 就是一个 `0`

后来发现这违反了乘法原则, 它和加法不一样, 不是同位相乘的

只需要把所有大数格式化, 然后左侧相乘, 右侧相加即可

转成数组表示也很简单, 比如 `1.23e+45`, 转成 `[1.23, 45]`

## 大数相乘

直接上代码了

``` js
const bigNumberMultiply = (...numbers) => {
  return Number(
    numbers
      .map(n => Number(n).toString().split('e+'))
      .reduce((result, [number, figure]) => {
        return [result[0] * parseFloat(number), result[1] + parseInt(figure || 0)]
      }, [1, 0])
      .join('e+')
  )
}
```

其实就是将一堆数值左侧相乘, 右侧相加, 然后 `Number()` 格式化一下

突然感觉 `Number()` 好强大, 哈哈哈

今天就到这里, 886
