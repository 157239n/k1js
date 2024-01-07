Array.prototype.transpose = function (fill=null) {
  if (this.length === 0) return [];
  const ans = [];
  if (fill === null || fill == undefined) {
    const n = this.map((arr) => arr.length).toMin();
    for (let i = 0; i < n; i++) ans.push(this.map((arr) => arr[i]));
  } else {
    const n = this.map((arr) => arr.length).toMax();
    for (let i = 0; i < n; i++) ans.push(this.map((arr) => arr[i] ?? fill));
  }
  return ans;
};
Array.prototype.insert = function (e, begin=true) {
	if (begin) return [e, ...this]
	else return [...this, e]
}
Array.prototype.splitW = function () {
  const n = this.length; let ws = Array.from(arguments);
  const sum = ws.toSum();
  let c = 0; ws = ws.map((v) => Math.floor(v * n / sum));
  console.log(ws);
  const ans = [];
  for (const w of ws.slice(0, -1)) {
    ans.push(this.slice(c, c+w))
    c += w;
  }
  ans.push(this.slice(c));
  return ans;
}
Array.prototype.splitC = function () {
  const n = this.length;
  let cs = Array.from(arguments);
  const intMode = cs.every((v) => Math.abs(Math.floor(v) - v) < 1e-9);
  if (!intMode) cs = cs.map((c) => Math.round(c * n));
  cs = cs.sort((a, b) => a-b);
  const ans = [this.slice(0, cs[0])];
  for (let i = 0; i < cs.length - 1; i++)
    ans.push(this.slice(cs[i], cs[i+1]));
  ans.push(this.slice(cs.at(-1)));
  return ans;
}
Array.prototype.joinSt = function (dims=1) {
  if (dims !== 1) {
    let ans = this;
    for (let i = 0; i < dims; i++) ans = ans.joinSt();
    return ans;
  }
  const ans = [];
  for (const arr of this) ans.push(...arr);
  return ans;
};
Array.prototype.joinStreamsRandom = function (seed = null) {
  return this.joinSt().randomize(seed)
};
Array.prototype.batched = function (bs, includeLast=false) {
	if (!bs) throw new Error(`Batch size (${bs}) must not be empty, or else it will loop forever`)
	const ans = [];
	const n = Math.floor(this.length / bs);
	for (let i = 0; i < n; i++)
		ans.push(this.slice(i*bs, (i+1)*bs));
	if (includeLast && n * bs < this.length)
		ans.push(this.slice(n*bs, this.length));
	return ans;
}
Array.prototype.window = function (w) {
  const n = this.length;
  const ans = [];
  for (let i = 0; i < n - w + 1; i++) ans.push(this.slice(i, i + w));
  return ans;
};
Array.prototype.groupBy = function (column, separate=false, removeCol=null) {
	if (removeCol === null || removeCol === undefined) { removeCol = separate }
	const c = column; const it = this.ksort(c, false);
	if (it.length === 0) return [];
	let a = [it[0]]; let v = a[0][c]; const ans = [];
	for (const e of it.slice(1)) {
		if (e[c] === v) a.push(e)
		else {
			if (removeCol) a = a.cutInv(c)
			ans.push(separate ? [v, a] : a); a = [e]; v = a[0][c];
		}
	}
	if (a.length > 0) {
		if (removeCol) a = a.cutInv(c)
		ans.push(separate ? [v, a] : a)
	}
	return ans;
}
Array.prototype.ungroup = function (single=true, begin=true, insertCol=true) {
	let it = this;
	if (single) it = it.apply((e) => e.map((x) => [x]), 1);
	if (insertCol) return it.map(([x, arr]) => arr.map((e) => begin ? [x, ...e] : [...e, x])).joinSt()
	return it.cut(1).joinSt()
}
Array.prototype.insertColumn = function () {
	throw new Error("Not implemented yet"); // TODO
}
Array.prototype.insertIdColumn = function (table=false, begin=true) {
	const ans = [];
	if (table) {
		if (begin) {
			for (let i = 0; i < this.length; i++) ans.push([i, ...this[i]]);
		} else {
			for (let i = 0; i < this.length; i++) ans.push([...this[i], i]);
		}
	} else {
		if (begin) {
			for (let i = 0; i < this.length; i++) ans.push([i, this[i]]);
		} else {
			for (let i = 0; i < this.length; i++) ans.push([this[i], i]);
		}
	}
	return ans;
}
Array.prototype.count = function () {
	const d = {};
	const ans = [];
	for (const e of this) d[e] = (d[e] ?? 0) + 1;
	for (const [k, v] of Object.entries(d))
		ans.push([v, k, `${Math.round(100*v/this.length)}%`]);
	return ans;
}
Array.prototype.permute = function () {
	const ans = [];
	for (const row of this) {
		const newRow = [];
		for (const i of arguments) newRow.push(row[i]);
		ans.push(newRow);
	}
	return ans;
}
Array.prototype.repeat = function (limit) {
	const ans = [];
	for (let i = 0; i < limit; i++) ans.push(this)
	return ans;
}
Array.prototype.repeatFrom = function (limit) {
	const ans = [];
	for (let i = 0; i < limit; i++) ans.push(...this);
	return ans;
}

/**
 * Similar to head(n).split()
 * 
 * Splits a list up into 2 sub list at a specific
 * split point. Example::
 *
 *    // returns [[0, 1], [2, 3]]
 *    [0, 1, 2, 3].split()
 *
 * @param {float} n split point, from 0 to 1
 */
Array.prototype.split = function (n = 0.5) {
  n = Math.round(this.length * n);
  return [this.slice(0, n), this.slice(n)];
};


export function structuralDummy() {};
export default {structuralDummy}



