import { randomUniform } from "d3-random";

function sort (array) {
  let leftArr = [array.shift()]

  function insertArray (leftArr, rightArr) {
    if (rightArr.length === 0) return leftArr

    let num = rightArr.shift()
    let i = 0
    for (; i < leftArr.length; i++) {
      if (leftArr[i] > num) {
        // 向右移动数组 在i的位置插入新值
        for (let j = leftArr.length - 1; j >= i; j--) {
          leftArr[j + 1] = leftArr[j]
        }
        leftArr[i] = num
        break
      }
    }

    // 比当前left中任何值都大 直接插在末尾
    if(i === leftArr.length) leftArr.push(num)

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