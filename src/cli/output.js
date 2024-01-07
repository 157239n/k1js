
Array.prototype.pretty = function (delim="", inv=false) {
	let tables = inv ? this : [this];
	if (tables.length === 0) return [];
	if (tables[0].length === 0 && tables.length === 1) return inv ? [[]] : [];
	// there is a rare potential bug here, in which tables[0] has length 0. This doesn't happen on Python, and it's rare enough that I'm too lazy
	const widths = [...Array(tables[0][0].length).keys()].map((v) => 0); // list of ints for the widths of the columns
	
	tables = tables.map((table) => table.map((row) => row.map((e, i) => {
		const s = `${e}`;
		widths[i] = Math.max(s.length, widths[i]);
		return s
	})));

	const gen = (table) => table.map((row) => row.map((e, i) => e.rstrip(" ").ljust(widths[i]+3)).join(delim))
	if (inv) return tables.map(gen);
	else return gen(tables[0]);
};

export function outputDummy() {};
export default {outputDummy}



