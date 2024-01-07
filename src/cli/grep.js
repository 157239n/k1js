
Array.prototype.grep = function (term, opts=null) {
	opts = opts ?? ({col: undefined, inv: false});
	const ans = [];
	const col = opts.col;
	const inv = opts.inv;
	if (col === undefined || col === null) {
		if (inv) {for (const e of this) if (!`${e}`.includes(term)) ans.push(e)}
		else {for (const e of this) if (`${e}`.includes(term)) ans.push(e)}
	} else {
		if (inv) {for (const e of this) if (!`${e[col]}`.includes(term)) ans.push(e)}
		else {for (const e of this) if (`${e[col]}`.includes(term)) ans.push(e)}
	}
	return ans;
};

export function grepDummy() {};
export default {grepDummy}


