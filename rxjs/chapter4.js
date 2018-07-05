var rxjs = require("rxjs")
var operators = require("rxjs/operators")
import EventEmitter from 'events'

const {from, defer, of, generate, interval, timer, fromEvent, fromEventPattern} = rxjs
const { repeat, repeatWhen } = operators

const subscribeParams = [
  console.log.bind(console),
  err => console.log(err),
  () => console.log("complete")
]

const generateSource$ = generate(
  '初始值',
  value => value.length < 15, // 继续条件
  value => value + value, // 值的递增
  value => value.length // 产生的结果 
)
// generateSource$.subscribe(...subscribeParams)

const repeatSource$ = of(1,2).pipe(repeat(2))
// repeatSource$.subscribe(...subscribeParams)

const intervalSource$ = interval(1000)
// intervalSource$.subscribe(...subscribeParams)

const timerSource$ = timer(3000, 1000)
// timerSource$.subscribe(...subscribeParams)


function* generateNumber(max) {
  for (let i = 0; i < max; i++) {
    yield i;    
  }
}

const fromSource$ = from(generateNumber(2))
// fromSource$.subscribe(...subscribeParams)

const fromPromise = from(Promise.resolve('heihei'))
// fromPromise.subscribe(...subscribeParams)

const emitter = new EventEmitter()
// const eventSource$ = fromEvent(emitter, 'lababa')
const eventSource$ = fromEventPattern(
  handler => emitter.addListener('lababa', handler),
  handler => emitter.removeListener('lababa', handler)
)
// eventSource$.subscribe(...subscribeParams)
// emitter.emit('lababa', 123)

const notifier = notification$ => notification$.delay(2000)
const repeated$ = from(
  new Promise((resolve) => {
    setTimeout(() => resolve(111), 1000)
  })
).pipe(repeatWhen(notifier))
// repeated$.subscribe(...subscribeParams)

const deferSource$ = defer(() => of(1,2,3))
deferSource$.subscribe(...subscribeParams)
 


