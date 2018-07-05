exports.exch = function (arr, i, j) {
  arr[i] = arr[j] + arr[i]
  arr[j] = arr[i] - arr[j]
  arr[i] = arr[i] - arr[j]
  return arr
}

const d3 = require('d3-random')
exports.createRadomArray = function (len) {
  let array = new Array(len)
  for (let index = 0; index < len; index++) {
    array[index] = Math.trunc(d3.randomUniform(1, 100)())
  }
  return array
}

module.exports = exports