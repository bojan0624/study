Object.cretae = Object.create || function (proto) {
    var F = function () { };
    F.prototype = proto;
    return new F();
}

/**
 * 原型编程泛型规则
 * 
 * 所有的数据都是对象
 * 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它
 * 对象会记住它的原型
 * 如果对象无法响应某个请求，它会把这个请求委托给他自己的原型
 */

const objectFactory = function (Constructor, ...args) {
    let obj = new Object();
    obj.__proto__ = Constructor.prototype;
    let ret = Constructor.apply(obj, args);
    return typeof ret === 'object' ? ret : obj
}

function Person(name) {
    this.name = name;
}

Person.prototype.sayName = function () {
    console.log(this.name);
}

let pa = new Person('pa');
let pb = objectFactory(Person, 'pb');
console.log(pa.__proto__ === pb.__proto__);

// 原型继承
var A = function () { };
A.prototype = { name: 'sven' };

var B = function () { };
B.prototype = new A();

var b = new B();

/**
 * 首先尝试遍历对象b中的所有属性，但没有找到name这个属性
 * 查找name属性的请求被委托给对象b的构造器的原型，它被b.__proto__记录着并且指向B.prototype,而B.prototype被设计为一个通过new A()创建出来的对象
 * 在该对象中依然没有找到name属性，于是求情被继续委托给这个对象构造器的原型A.prototype
 * 在A.prototype中找到了name属性，并返回它的值
 */

 /**
  * Object.create 在js引擎下 效率不如 构造函数
  * 除了Object.prototype 以外 任何对象都有 prototype
  */