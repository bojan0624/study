const _ = require('lodash')

function debounce(func, timeout) {
  if (typeof func !== 'function') return false

  let waitFunc

  // 在设定的延迟时间最后一毫秒的触发 也算作累积延迟
  timeout = +timeout || 0

  return function (...args) {
    if (waitFunc) clearTimeout(waitFunc)

    waitFunc = setTimeout(() => {
      func.apply(this, args)
      waitFunc = null
    }, timeout)
  }
}

// debounce = _.debounce

const clg = debounce(i => console.log('clg:', i), 500)

const now = new Date().getTime()

const timer = setInterval(() => {
  const time = new Date().getTime()
  clg(time - now)
  if (time - now > 5000) clearInterval(timer)
}, 499)