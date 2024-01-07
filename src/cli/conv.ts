declare global {
  interface Array<T> {
    toSet(): Set<T>;
    toRange(): Array<number>;
    toList(): Array<T>;
    toSum(): number;
    toProd(): number;
    toAvg(): number;
    toMean(): number;
    toStd(): number;
    toMax(): number;
    toMin(): number;
    toDict<K extends string, V>(): Record<K, V>;
    toNum(): Array<number>;
    toDataUri(): any;
    toAnchor(): any;
    toHtml(): any;
  }
  interface Set<T> {
    toList(o: T[]): Array<T>;
  }
  
  interface IArguments {
    map(f: any): any;
  }
}

  
Array.prototype.toSet = function () {
  return new Set(this);
};
Array.prototype.toRange = function () {
    return [...Array(this.length).keys()]
}
Set.prototype.toList = function () {
  return Array.from(this);
};
Array.prototype.toList = function () {
  return this;
}
Array.prototype.toSum = function () {
  let ans = 0;
  for (const e of this) ans += e;
  return ans;
};
Array.prototype.toProd = function () {
    let ans = 1;
    for (const e of this) ans *= e;
    return ans
}
Array.prototype.toAvg = function () {
    if (this.length === 0) return NaN;
    return this.toSum()/this.length;
}
Array.prototype.toMean = function () {
    return this.toAvg();
}
Array.prototype.toStd = function () {
    const n = this.length
    const mean = this.toMean();
    return Math.sqrt(this.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
}
Array.prototype.toMax = function () {
  return Math.max(...this);
};
Array.prototype.toMin = function () {
  return Math.min(...this);
};
Array.prototype.toDict = function<K extends string,V> () {
  const ans: Record<K, V> = {} as Record<K, V>;
  for (const [a, b] of this) ans[a] = b;
  return ans;
};
Array.prototype.toNum = function () {
    const ans:Array<number> = [];
    for (const e of this) ans.push(parseFloat(e));
    return ans;
}
Array.prototype.toDataUri = function () {
    throw new Error("Not implemented yet"); // TODO
}
Array.prototype.toAnchor = function () {
    throw new Error("Not implemented yet"); // TODO
}
Array.prototype.toHtml = function () {
    throw new Error("Not implemented yet"); // TODO
}

export function convDummy() {};
export default {convDummy}


