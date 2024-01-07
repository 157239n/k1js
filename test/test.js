
import k1js, {utils as k1u} from 'k1js'; // Example import

console.log("abc")
console.log(k1u.range(10).head(3).len())
console.log(k1u.range(10).toStd())
console.log((await k1u.range(10).apply_async(async (x) => x*2)).toStd())
console.log(await k1u.range(10).filt_async(async (x) => x % 2 == 0));
console.log(await k1u.range(10).randomize().sortF_async(async (x) => Math.abs(5.4-x)));
console.log(k1u.range(10).randomize().map((x) => [Math.round(Math.abs(5.4-x)*100)/100, x]).ksort(0))
console.log([[1, 2]].transpose())
console.log([[]].transpose())
console.log([].map((arr) => arr.length).toMin())
console.log(Math.min())
console.log(Math.max())
console.log([].transpose())
console.log([[1, 2], [3, 4]].cut(1))
console.log([[1, 2], [3, 4]].cutInv(1))
let a = [[2.3, 5],[3.4, 2],[4.5, 2],[5.6, 5],[6.7, 1]]
console.log(a.groupBy(1))
console.log(a.groupBy(1, true))
console.log(a.groupBy(1, true, false))
// returns [[3, 1.2], [3, 3.4], [5, 6], [5, 8], [5, 11]]
console.log([[3, [1.2, 3.4]], [5, [6, 8, 11]]].ungroup())
// returns [[3, 1.2], [3, 3.4], [5, 6], [5, 8], [5, 11]]
console.log([[3, [[1.2], [3.4]]], [5, [[6], [8], [11]]]].ungroup(false))
// returns [[1.2, 3], [3.4, 3], [6, 5], [8, 5], [11, 5]]
console.log([[3, [1.2, 3.4]], [5, [6, 8, 11]]].ungroup(true, false))
console.log([[[1, 2], [3, 4]], [[], [5, 6, 7]]].joinSt(2))
// k1js.log("abc/some", {a: 3, b: 4});
// k1js.log("abc/some", "msg 4");
