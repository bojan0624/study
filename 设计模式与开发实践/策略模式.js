// 策略模式实现表单校验类

const strategies = {
  isNonEmpty(value, errorMsg) {
    if (value === '') {
      return errorMsg;
    }
  },
  minLength(value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg;
    }
  },
  isMobile (value, errorMsg) {
    
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg;
    }
  }
}

const Validator = function(){
  this.cache = [];
}

Validator.prototype.add = function(dom, rules) {
  rules.map(({strategy, errorMsg}) => {
    const _strategyArr = strategy.split(':');
    const _strategyName = _strategyArr.shift();
    const _params = [dom.value, ..._strategyArr, errorMsg];
    
    this.cache.push(() => strategies[_strategyName].apply(dom, _params))
  })
}

Validator.prototype.start = function(){
  return this.cache.map(validatorFunc => {
    const errorMsg = validatorFunc();
    if (errorMsg){
      return errorMsg;
    }
  })
}

const validatorFunc = function () {
  const validator = new Validator();

  validator.add({value: '11552836768'}, [{
    strategy: 'isMobile',
    errorMsg: '不是一个有效的手机号'
  }])

  var errorMsg = validator.start();
  return errorMsg;
}

console.log(validatorFunc());
