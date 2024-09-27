
Array.prototype.grep = function (term, opts=null) {
	opts = opts ?? ({col: undefined, inv: false, lower: false});
	const ans = [];
	const col = opts.col;
	const inv = opts.inv;
	const lower = opts.lower;
	if (col === undefined || col === null) {
		if (inv) {
			if (lower) { for (const e of this) if (!`${e}`.toLowerCase().includes(term)) ans.push(e); }
			else { for (const e of this) if (!`${e}`.includes(term)) ans.push(e); }
		} else {
			if (lower) { for (const e of this) if (`${e}`.toLowerCase().includes(term)) ans.push(e); }
			else { for (const e of this) if (`${e}`.includes(term)) ans.push(e); }
		}
	} else {
		if (inv) {
			if (lower) { for (const e of this) if (!`${e[col]}`.toLowerCase().includes(term)) ans.push(e); }
			else { for (const e of this) if (!`${e[col]}`.includes(term)) ans.push(e); }
		} else {
			if (lower) { for (const e of this) if (`${e[col]}`.toLowerCase().includes(term)) ans.push(e) }
			else { for (const e of this) if (`${e[col]}`.includes(term)) ans.push(e) }
		}
	}
	return ans;
};

export function grepDummy() {};
export default {grepDummy}


