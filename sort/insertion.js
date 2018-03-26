const d3 = require("d3-random")
const randomUniform = d3.randomUniform

function sort (array) {
  let leftArr = [array.shift()]

  function insertArray (leftArr, rightArr) {
    if (rightArr.length === 0) return leftArr

    const len = leftArr.length
    let num = rightArr.shift()
    let target = 0
    // 定位目标位置
    for (let i = len - 1; i >= 0; i--) {
      if (leftArr[i] < num) {
        target =  i + 1
        break
      }
    }
    // 向右移动数组 
    for (let j = len - 1; j >= target; j--) {
      leftArr[j + 1] = leftArr[j]
    }
    // 在目标的位置插入新值
    leftArr[target] = num

    return insertArray(leftArr, rightArr)
  }

  return insertArray(leftArr, array)
}

function createRadomArray (len) {
  let array = new Array(len)
  for (let index = 0; index < len; index++) {
    array[index] = Math.trunc(randomUniform(1, 100)())
  }
  return array
}

function test () {
  const array = createRadomArray(10)
  console.log(array)
  console.log(sort(array))
}

test()