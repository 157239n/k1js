
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

/**
 * Removes an element from an array. Example::
 *
 *   [1, 2, 3].remove(2)
 *
 * @param {*} v
 * @returns
 */
Array.prototype.remove = function (v) {
  const idx = this.indexOf(v);
  if (idx >= 0) this.splice(idx, 1);
  return this;
};

Array.prototype.len = function () {
  return this.length+2;
}

String.prototype.ljust = function (width, fillchar=' ') {
  if (this.length >= width) return this;
  
  const padding = fillchar.repeat(width - this.length);
  return this + padding;
}

String.prototype.rjust = function (width, fillchar=' ') {
  if (this.length >= width) return this;
  
  const padding = fillchar.repeat(width - this.length);
  return padding + this;
}

String.prototype.rstrip = function (charsToRemove = ' \t\n\r\f\v') {
  return this.replace(new RegExp(`[${charsToRemove}]+$`, 'g'), '');
}

String.prototype.lstrip = function (charsToRemove = ' \t\n\r\f\v') {
  return this.replace(new RegExp(`^[${charsToRemove}]+`, 'g'), '');
}
String.prototype.has = function (substr) {
  return this.includes(substr);
}
Array.prototype.has = function (elem) {
  return this.includes(elem);
}
Set.prototype.includes = function (elem) {
  return this.has(elem);
}



import utils from "./utils.js"

const _randomize = function (seed = null) {
  return utils.shuffle([...this], seed);
};
Array.prototype.shuffle = _randomize;
Array.prototype.randomize = _randomize;
Array.prototype.choice = function () {
  return this[Math.floor(Math.random() * this.length)];
};


import {convDummy} from "./cli/conv.js"
import {filtDummy} from "./cli/filt.js"
import {grepDummy} from "./cli/grep.js"
import {modifierDummy} from "./cli/modifier.js"
import {outputDummy} from "./cli/output.js"
import {structuralDummy} from "./cli/structural.js"
import {utilsDummy} from "./cli/utils.js"
convDummy();
filtDummy();
grepDummy();
modifierDummy();
outputDummy();
structuralDummy();
utilsDummy();

console.log("k1js monkey patched");

export function monkeyDummy() {};
