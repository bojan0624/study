import EventEmitter from 'events'
import { concat, map, take, withLatestFrom, startWith } from "../node_modules/rxjs/operators";
import { of, merge, timer, zip, never, combineLatest, range, race, forkJoin } from "../node_modules/rxjs";

const subscribeParams = [
  x => console.log(x, Object.prototype.toString.call(x)),
  err => console.log(err),
  () => console.log("complete")
]

/**
 * concat 在当前上游数据流complete后，才会去订阅下一个上游数据流
 * 要求所有上游数据流必须可以complete
 */
let concatSource1$ = of(1,2,3)
let concatSource2$ = of(4,5,6)
// concatSource1$.pipe(concat(concatSource2$)).subscribe(...subscribeParams)

/**
 * merge 逐个订阅上游，上游推一个数据就传递给下游，所有上游complete时 自身complete
 */
let mergeSource1$ = timer(0, 1000).pipe(map(x => x + 'A'), take(3))
let mergeSource2$ = timer(500, 1000).pipe(map(x => x + 'B'), take(3))
// merge(mergeSource1$, mergeSource2$).subscribe(...subscribeParams)

/**
 * zip 将所有上游推过来的数据对齐成数组, 在数据量最小的上游complete时 及自身complete
 */
let zipSource1$ = timer(0, 1000).pipe(map(x => x + 'A'), take(3))
let zipSource2$ = timer(500, 1000).pipe(map(x => x + 'B'), take(15))
// zip(zipSource1$, zipSource2$).subscribe(...subscribeParams)


/**
 * 当所有上游都推过数据时，每次数据推来将所有上游最新的数据拼合在一起，所有上游complete后，自身complete
 */
let combineLatestSource1$ = timer(0, 1000).pipe(map(x => x + 'A'), take(3))
let combineLatestSource2$ = timer(500, 1000).pipe(map(x => x + 'B'), take(5))
// combineLatest(combineLatestSource1$, combineLatestSource2$, (a,b) => `${a} - ${b}`).subscribe(...subscribeParams)

/**
 * 演示由多重依赖引起的glitch，combineLatest 会被每个上游驱动， 尽管逻辑上上游数据都是来自source3$
 */
let combineLatestSource3$ = timer(0, 1000).pipe(map(x => x + 'A'), take(3))
// combineLatest(combineLatestSource3$.pipe(map(x => x + 'a')), combineLatestSource3$.pipe(map(x => x + 'b'))).subscribe(...subscribeParams)


/**
 * withLatestFrom 调用api的 observable 起控制节奏作用，只有此observable推数据时 withLatestFrom 才会产生数据
 * 同步依然会正常执行
 */
let withLatestFromSource1$ = range(0, 1000).pipe(map(x => x + 'A'), take(3))
// withLatestFromSource1$.pipe(withLatestFrom( withLatestFromSource1$.pipe(map(x => x + 'a')))).subscribe(...subscribeParams)

/**
 * race 只对第一个推数据的流有反应
 */
let raceSource1$ = timer(0, 1000).pipe(map(x => x + 'A'), take(3))
let raceSource2$ = timer(500, 1000).pipe(map(x => x + 'B'), take(5))
// race(raceSource1$, raceSource2$).subscribe(...subscribeParams)


/**
 * startWith 在数据流最前面添加数据
 */
// timer(0,2000).pipe(take(4), startWith('start', 8)).subscribe(...subscribeParams)

/** 
 * forkJoin等待所有上游complete后 将每个流最后的数据合并
*/
forkJoin(timer(0,200).pipe(take(3)), timer(1000, 200).pipe(take(2))).subscribe(...subscribeParams)

