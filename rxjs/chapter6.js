import { of, empty } from "../node_modules/rxjs";
import { count, concat, max, min, reduce, every, find, findIndex, isEmpty, defaultIfEmpty } from "../node_modules/rxjs/operators";

const subscribeParams = [
  x => console.log(x, Object.prototype.toString.call(x)),
  err => console.log(err),
  () => console.log("complete")
]

const source$ = of(1,2,3).pipe(concat(of(4,5,6)))

const count$ = source$.pipe(count())
count$.subscribe(...subscribeParams)

const max$ = source$.pipe(max())
max$.subscribe(...subscribeParams)

source$.pipe(min()).subscribe(...subscribeParams)

source$.pipe(reduce((acc, v, i) => acc * v)).subscribe(...subscribeParams)

const isEven = (v, i, source$) => v % 2 === 0

source$.pipe(every(isEven)).subscribe(...subscribeParams)

source$.pipe(find(isEven)).subscribe(...subscribeParams)

source$.pipe(findIndex(isEven)).subscribe(...subscribeParams)

empty().pipe(isEmpty()).subscribe(...subscribeParams)

empty().pipe(defaultIfEmpty('default value')).subscribe(...subscribeParams)




