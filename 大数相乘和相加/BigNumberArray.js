// 位数数组

import * as utils from './utils'

class BigNumberArray extends Array {
  constructor (number) {
    super(0)

    if (typeof number !== 'number') {
      throw new Error('request a number')
    }
    if (!utils.isBigNumber(number)) {
      throw new Error('request a big number')
    }

    number = Number(number) // Number(1333e33) => 1.333e+36 相当于格式化
    number = number.toString() // 字符串化 => "1.333e+36"
    number = number.split('e+') // 分开数值和位数 => ["1.333", "36"]

    const figure = Number(number[1]) // 取到位数, e+右侧 => 36

    number = number[0] // e+左侧 => "1.333"
    number = number.replace('.', '') // 去掉小数点 => "1333"
    number = [...number] // 数组化 => ["1", "3", "3", "3"]
    number = number.map((item, index) => [Number(item), figure - index]) // 位数化 => [[1, 36], [3, 35], [3, 34], [3, 33]]

    // this.concat(number)
    this.push(...number)

    console.log(JSON.stringify(this))
  }
}

Object.assign(BigNumberArray, utils)

export default BigNumberArray
