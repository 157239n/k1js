// reverify args and kwargs for aS() and apply()
Array.prototype.aS = function () {
  const args = [...arguments];
  const f = args[0];
  return f(this, ...args.slice(1));
};
Array.prototype.aS_async = async function () {
  const args = [...arguments];
  const f = args[0];
  return await f(this, ...args.slice(1));
};
Array.prototype.aSInv = function () {
  const args = [...arguments];
  const f = args[0];
  return f(...this, ...args.slice(1));
};
Array.prototype.aSInv_async = async function () {
  const args = [...arguments];
  const f = args[0];
  return await f(...this, ...args.slice(1));
};
Array.prototype.apply = function (f, col=null, kwargs=null, inv=false) {
  const args = Object.values(kwargs ?? {});
  if (col === null || col === undefined) {
    if (args.length === 0 && !inv) return this.map(f); // is this optimization worth it? You tell me
    if (inv) return this.map((v) => f(...v, ...args));
    else return this.map((v) => f(v, ...args));
  }
  if (typeof(col) === "number") {
    const ans = [];
    for (let row of this) {
      row = [...row];
      if (inv) row[col] = f(...row[col], ...args);
      else row[col] = f(row[col], ...args);
      ans.push(row);
    }
    return ans;
  } else {
    let ans = this;
    for (const c of col) ans = ans.apply(f, c, kwargs)
    return ans;
  }
};
Array.prototype.apply_async = async function (f, col=null, kwargs=null, inv=false) {
  const args = Object.values(kwargs ?? {});
  if (col === null || col === undefined) {
    const ans = [];
    if (args.length === 0 && !inv) { // is this optimization worth it? You tell me
      for (let e of this) ans.push(await f(e))
    } else if (inv) {
      for (let e of this) ans.push(await f(...e, ...args));
    } else {
      for (let e of this) ans.push(await f(e, ...args));
    }
    return ans;
  }
  if (typeof(col) === "number") {
    const ans = [];
    for (let row of this) {
      row = [...row];
      if (inv) row[col] = await f(...row[col], ...args);
      else row[col] = await f(row[col], ...args);
      ans.push(row);
    }
    return ans;
  } else {
    let ans = this;
    for (const c of col) ans = ans.apply_async(f, c, kwargs)
    return ans;
  }
};

/**
 * Had to avoid 'sort' cause collision with builtin method
 */
Array.prototype.ksort = function(column=null, numeric=true, inv=false) {
  const noCol = column === null || column == undefined;
  return [...this].sort((a, b) => {
    if (!noCol) {
      a = a[column];
      b = b[column];
    }
    if (numeric) {
      a = parseFloat(a);
      b = parseFloat(b);
    } else {
      a = `${a}`;
      b = `${b}`;
    }
    return inv ? b-a : a-b
  });
}
Array.prototype.sortF = function (f, column=null, inv=false) {
  if (column === null || column === undefined)
    return inv ? [...this].sort((a, b) => f(b) - f(a)) : [...this].sort((a, b) => f(a) - f(b));
  else return inv ? [...this].sort((a, b) => f(b[column]) - f(a[column])) : [...this].sort((a, b) => f(a[column]) - f(b[column]));
};
Array.prototype.sortF_async = async function (f, column=null, inv=false) {
  const values = [];
  if (column === null || column === undefined) {
    for (const e of this) values.push([e, await f(e)]);
  } else {
    for (const e of this) values.push([e, await f(e[column])]);
  }
  return (inv ? values.sort((a, b) => b[1] - a[1]) : values.sort((a, b) => a[1] - b[1])).map((e) => e[0]);
};

export function modifierDummy() {};
export default {modifierDummy}
