
/**
 * 判断是否是大数
 * @param {Number} n 数值
 * @returns {Boolean}
 */
export const isBigNumber = n => {
  console.log(1, n)
  console.log(2, Number(n))
  console.log(3, Number(n).toString())
  return Number(n).toString().indexOf('e+') > -1
}

export const bigNumber2Array = n => {
  
}

