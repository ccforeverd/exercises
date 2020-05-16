
// 5个球
const fiveBalls = () => {
  let index = 0
  let length = 5
  const result = []
  while (index < length) {
    if (!result.length) {
      // 放入第一个球
      result.push(['黑'], ['红'])
    } else {
      for (let i = 0; i < result.length; i++) {
        const item = result[i]
        const last1 = item[item.length - 1]
        const last2 = item[item.length - 2]
        // 前两个颜色相同
        if (last1 === last2) {
          item.push(last1 === '黑' ? '红': '黑')
        } else {
          // 不相同时增加两种可能
          const copyItem = item.map(_ => _)
          item.push('黑')
          copyItem.push('红')
          result.splice(i + 1, 0, copyItem)
          i++ // 数组插入一项后, i需要加1
        }
      }
    }
    index++
  }
  return result
}

const log = result => console.log(JSON.stringify(result.map(_ => _.join(', ')), null, 2))

// log(fiveBalls())

// n个球
const nBalls = n => {
  let index = 0
  let length = n
  const result = []
  while (index < length) {
    if (!result.length) {
      // 放入第一个球
      result.push(['黑'], ['红'])
    } else {
      for (let i = 0; i < result.length; i++) {
        const item = result[i]
        const last1 = item[item.length - 1]
        const last2 = item[item.length - 2]
        // 前两个颜色相同
        if (last1 === last2) {
          item.push(last1 === '黑' ? '红': '黑')
        } else {
          // 不相同时增加两种可能
          const copyItem = item.map(_ => _)
          item.push('黑')
          copyItem.push('红')
          result.splice(i + 1, 0, copyItem)
          i++ // 数组插入一项后, i需要加1
        }
      }
    }
    index++
  }
  return result
}

// log(nBalls(1))
// log(nBalls(2))
// log(nBalls(3))
// log(nBalls(5))
// log(nBalls(10))

const checkEquals = (...args) => {
  return args.findIndex((item, index) => {
    if (index < args.length - 1) {
      return item !== args[index + 1]
    }
    return false
  }) === -1
}

// console.log(checkEquals('黑', '黑', '黑', '黑'))
// console.log(checkEquals('红', '黑', '黑', '黑'))
// console.log(checkEquals('黑', '红', '黑', '黑'))
// console.log(checkEquals('黑', '黑', '红', '黑'))
// console.log(checkEquals('黑', '黑', '黑', '红'))

// n个球 n个颜色
const nBallsNColors = (n, colors = ['黑', '红']) => {
  let index = 0
  let length = n
  const result = []
  while (index < length) {
    if (!result.length) {
      // 放入第一个球
      // result.push(['黑'], ['红'])
      result.push(...colors.map(_ => [_]))
    } else {
      for (let i = 0; i < result.length; i++) {
        const item = result[i]
        const last1 = item[item.length - 1]
        const last2 = item[item.length - 2]
        const colorIndex = colors.findIndex(_ => checkEquals(last1, last2, _)) // 找到相同颜色
        const copyColors = colors.map(_ => _)
        if (colorIndex > -1) {
          // 去掉相同的颜色
          copyColors.splice(colorIndex, 1)
        }
        // 将其余颜色插入到结果中 (要将上一次的结果替换)
        result.splice(i, 1, ...copyColors.map(color => {
          const copyItem = item.map(_ => _)
          copyItem.push(color)
          return copyItem
        }))
        i += copyColors.length - 1 // i值需要更新
      }
    }
    index++
  }
  return result
}

// log(nBallsNColors(5))
// log(nBallsNColors(5, ['红', '黄', '蓝']))

// n个球 n个颜色 n长度
const nBallsNColorsNLength = (
  n,
  colors = ['黑', '红'],
  length = 3
) => {
  let index = 0
  const result = []
  while (index < n) {
    if (!result.length) {
      // 放入第一个球
      // result.push(['黑'], ['红'])
      result.push(...colors.map(_ => [_]))
    } else {
      for (let i = 0; i < result.length; i++) {
        const item = result[i]
        const lasts = item.slice(1 - length)
        const colorIndex = lasts.length < length - 1
          ? -1 // lasts长度不够指定长度的时候
          : colors.findIndex(_ => checkEquals(...lasts, _)) // 找到相同颜色
        const copyColors = colors.map(_ => _)
        if (colorIndex > -1) {
          // 去掉相同的颜色
          copyColors.splice(colorIndex, 1)
        }
        // 将其余颜色插入到结果中 (要将上一次的结果替换)
        result.splice(i, 1, ...copyColors.map(color => {
          const copyItem = item.map(_ => _)
          copyItem.push(color)
          return copyItem
        }))
        i += copyColors.length - 1 // i值需要更新
      }
    }
    index++
  }
  return result
}

log(nBallsNColorsNLength(5))
log(nBallsNColorsNLength(6, ['黑', '红'], 4))
