type tCol = number|number[]|null|undefined;

declare global {
  interface Array<T> {
    filt(f: ((x:T) => boolean), col: tCol, inv: boolean): T[];
    filt_async(f: ((x:T) => Promise<boolean>), col: tCol, inv: boolean): Promise<T[]>;
    inSet(s:T[]|Set<T>, col:tCol, inv:boolean): T[];
    contains(s:any, col:tCol, inv:boolean):any;
    containsRange(x:number): boolean;
    head(n:number, inv:boolean): T[];
    tail(n:number): T[];
    cut<U>(): U[];
    cutInv<U>(): U[];
    rows():T[];
    intersection(): any;
    union(): any;
    unique(): T[];
    breakIf(f:((x:T) => boolean)): T[];
  }
}

Array.prototype.filt = function (f = (x) => x, col:tCol = null, inv:boolean=false) {
  const oldF = f;
  if (inv) f = (x) => !oldF(x);
  if (col === null || col === undefined) return this.filter(f);
  else if (typeof(col) === "number") {
    const ans = [];
    for (const row of this) if (f(row[col])) ans.push(row);
    return ans;
  } else {
    let ans = this;
    for (const c of col) ans = ans.filt(f, c)
    return ans;
  }
};
Array.prototype.filt_async = async function (f = (x) => x, col:tCol = null, inv:boolean=false) {
  const oldF = f;
  if (inv) f = async (x) => !(await oldF(x));
  if (col === null || col === undefined) {
    const ans = [];
    for (const e of this)
      if (await f(e)) ans.push(e);
    return ans;
  }
  else if (typeof(col) === "number") {
    const ans = [];
    for (const row of this) if (await f(row[col])) ans.push(row);
    return ans;
  } else {
    let ans = this;
    for (const c of col) ans = ans.filt_async(f, c)
    return ans;
  }
};
Array.prototype.inSet = function(_set, col=null, inv=false) {
  _set = new Set(_set);
  if (inv) return this.filt((e) => !_set.includes(e), col);
  else return this.filt((e) => _set.includes(e), col);
}
Array.prototype.contains = function(s, col=null, inv=false) {
  if (inv) return this.filt((e) => !e.includes(s),  col);
  else return this.filt((e) => e.includes(s),  col);
}
Array.prototype.containsRange = function (x) {
  if (this.length !== 2)
    throw new Error(
      "`arr.contains()` must have exactly 2 number inside of `arr`, else it doesn't mean anything"
    );
  return this[0] <= x && x <= this[1];
};
Array.prototype.head = function (n, inv=false) {
  if (n === null || n === undefined) return inv ? [] : this;
  if ((n > 0 && n < 1) || (n < 0 && n > -1)) { // fractional mode
    n = Math.round(n * this.length)
  }

  n = Math.min(n, this.length); // pruning
  return inv ? this.slice(n) : this.slice(0, n);
};
Array.prototype.tail = function (n) {
  return this.head(-n, true);
};
Array.prototype.cut = function () { // cut(1, 2), cut(0)
  if (arguments.length === 1) {
    const c = arguments[0];
    return this.map((arr) => arr[c]);
  }
  const args = Array.from(arguments);
  return this.map((arr) => args.map((i) => arr[i]));
};
Array.prototype.cutInv = function () { // cut(1, 2), cut(0)
  if (this.length === 0) return [];
  const _args = new Set(Array.from(arguments))
  const args = []; const n = this[0].length;
  for (let i = 0; i < n; i++) {
    if (!_args.has(i)) args.push(i);
  }
  return this.map((arr) => args.map((i) => arr[i]));
};
Array.prototype.rows = function () {
  return Array.from(arguments).map((i) => this[i]);
};
Array.prototype.intersection = function () {
  const arrays = this.map((arr) => new Set(arr));
  if (!arrays || arrays.length === 0) return [];
  const arr = arrays[0];
  const ans = [];
  for (const e of arr)
    if (arrays.every(array => array.includes(e))) ans.push(e);
  return ans;
}
Array.prototype.union = function() {
  return Array.from(new Set(this.joinSt()))
}
Array.prototype.unique = function(column=null) {
  const ans = [];
  const visited = new Set();
  const noCol = column === null || column === undefined;
  for (const row of this) {
    const e = noCol ? row : row[column];
    if (!visited.has(e)) {
      ans.push(row);
      visited.add(e);
    }
  }
  return ans;
}
Array.prototype.breakIf = function(f) {
  const ans = [];
  for (const e of this) {
    if (f(e)) break;
    ans.push(e);
  }
  return ans;
}



export function filtDummy() {};
export default {filtDummy}

