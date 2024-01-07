
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
Array.prototype.lookup = function (d, col=null, fill=null) {
  return this.apply((e) => d[e] ?? fill, col)
};



export function utilsDummy() {};
export default {utilsDummy}


