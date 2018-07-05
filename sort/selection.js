const d3 = require('d3-random')

function selectionSort (arr) {
  function selectMin (arr, index) {
    if(index === arr.length - 1) return arr
    // 将 每轮最小的值 移动到当前轮次最前面
    let min = index
    for (let i = min; i < arr.length; i++) {
      if (arr[min] > arr[i]) {
         min = i
      }
    }

    if (min != index) {
      arr[min] += arr[index]
      arr[index] = arr[min] - arr[index]
      arr[min] = arr[min] - arr[index]
    }
    
    return selectMin(arr, ++index)
  }
  return selectMin(arr, 0)
}

module.exports.selectionSort = selectionSort

function createRadomArray (len) {
  let array = new Array(len)
  for (let index = 0; index < len; index++) {
    array[index] = Math.trunc(d3.randomUniform(1, 100)())
  }
  return array
}

function test () {
  
  const array = createRadomArray(10)
  console.log(array)
  const start = new Date().getTime()
  console.log(selectionSort(array))
  console.log(new Date().getTime() - start)
}

test()