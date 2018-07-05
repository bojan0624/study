const d3 = require('d3-random')
const randomUniform = d3.randomUniform

const { selectionSort } = require('./selection')

const { exch, createRadomArray } = require('./utils')

function sort (array) {
  // 切分数组
  function partition(arr, lo, hi) {
    let i = lo, j = hi

    while (true) {
      // 左侧扫描比切分元素大的第一个元素
      for (; i < hi; i++) {
        if (arr[i] > arr[lo]) break
      }
      // 又侧扫描比切分元素小的第一个元素
      for (; j > lo; j--) {
        if (arr[j] < arr[lo]) break
      }
      // 交换 扫描的两个元素位置
      exch(arr, i, j)
      if (i >= j) break
    }
    // 右侧扫描的j 一定比 lo小 所以使用 j 不使用 i
    exch(arr, lo, j)
    // 返回切分元素的索引
    return j
  }

  function quickSort (arr, lo, hi) {
    if (hi <= lo) return

    const j = partition(arr, 0 , arr.length)
    const left = selectionSort(arr.slice(0, j - 1))
    const right = selectionSort(arr.slice(j + 1, arr.length))
    return [...left, arr[j], ...right]
  }

  return quickSort(array, 0, array.length)
}

function test () {
  const array = createRadomArray(10)
  console.log(sort(array))
}

test()
