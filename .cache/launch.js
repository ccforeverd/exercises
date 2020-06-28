'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var _class, _dec, _class2;

var test1 = function test1(target) {
  target.key1 = 1; // 扩展静态属性

  target.prototype.key1 = 2; // 扩展动态属性
};

var test1Class = test1(_class = function test1Class() {
  _classCallCheck(this, test1Class);
}) || _class;

var test1Obj = new test1Class(); // 结果

console.log('test1Class.key1', test1Class.key1);
console.log('test1Obj.key1', test1Obj.key1);

var test2 = function test2(name) {
  return function (target) {
    target.uname = 'aaa'; // name是class的关键词, 不能使用

    target.prototype.name = name;
  };
};

var test2Class = (_dec = test2('testname'), _dec(_class2 = function test2Class() {
  _classCallCheck(this, test2Class);
}) || _class2);
var test2Obj = new test2Class(); // 结果

console.log('test2Class.name', test2Class.name);
console.log('test2Class.uname', test2Class.uname);
console.log('test2Obj.name', test2Obj.name);
