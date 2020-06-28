const test1 = (target) => {
  target.key1 = 1 // 扩展静态属性
  target.prototype.key1 = 2 // 扩展动态属性
}

@test1
class test1Class {}

let test1Obj = new test1Class()

// 结果
console.log('test1Class.key1', test1Class.key1)
console.log('test1Obj.key1', test1Obj.key1)


const test2 = (name) => {
  return (target) => {
    target.uname = 'aaa' // name是class的关键词, 不能使用
    target.prototype.name = name
  }
}

@test2('testname')
class test2Class {}

let test2Obj = new test2Class()

// 结果
console.log('test2Class.name', test2Class.name)
console.log('test2Class.uname', test2Class.uname)
console.log('test2Obj.name', test2Obj.name)