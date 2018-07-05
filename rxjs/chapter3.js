var rxjs = require("rxjs")
var operators = require("rxjs/operators")

const {of} = rxjs
const {filter, map} = operators

const source$ = of(1,2,3)
 
source$.pipe(
  filter(n => n>1), 
  map(n => n+3)
).subscribe(console.log.bind(console))

