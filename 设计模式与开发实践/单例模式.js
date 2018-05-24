var user = (function(){
  var _name = 'asdf',
    _age = 29;
    return {
      getUserInfo () {
        return _name + _age;
      }
    } 
})();

/**
 * 惰性单例
 */

 var getSingle = function (fn) {
  var result;
  return function () {
    return result ? result : result = fn.apply(this, arguments);
  }
 }

 var createArray = function () {
   var el = new Array();
   return el;
 }

 var createSingleArray = getSingle(createArray);
 var a = createSingleArray();
 var b = createSingleArray();

 console.log(a === b);