
Array.prototype.shape = function () {
	try {
		return [this.length, ...this[0].shape()];
	} catch (e) {
		return [this.length]
	}
};
String.prototype.shape = function () {
  return [this.length];
};
Array.prototype.wrapList = function() {
	return [this];
}
Array.prototype.kreverse = function() { // `kreverse` to avoid collision with builtin
	const ans = [...this]
	return ans.reverse()
}
Array.prototype.smooth = function(consecutives) {
	return this.batched(consecutives < 1 ? 10 : consecutives).apply((x) => x.toMean());
}
Array.prototype.lookup = function (d, col=null, fill=null, mode="fill") {
	if (mode == "fill") {
		return this.apply((e) => d[e] ?? fill, col);
	} else if (mode == "input") {
		const ans = [];
		if (col === null) {
			for (const e of this) ans.push((e in d) ? d[e] : e);
		} else {
			for (const e of this) {
				if (e[col] in d) e[col] = d[e[col]];
				ans.push(e);
			}
		}
		return ans;
	} else if (mode == "rm") {
		const ans = [];
		if (col === null) {
			for (const e of this) {
				if (e in d) ans.push(d[e]);
			}
		} else {
			for (const e of this) {
				if (e[col] in d) {
					e[col] = d[e[col]];
					ans.push(e);
				}
			}
		}
		return ans;
	} else { throw new Error("lookup() only accept mode of 'fill', 'input' or 'rm'"); }
};



export function utilsDummy() {};
export default {utilsDummy}


