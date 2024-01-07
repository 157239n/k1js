

export const sleep = s => new Promise(r => setTimeout(r, s*1000));
export function wait_for(promise, timeout=1) { // timeout in seconds
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Promise timed out')), timeout*1000)
    )
  ]);
}
export const emptyFn = () => 0
export const emptyFn1Arg = (e) => 0

/**
 * Designed to be similar to Python's collections.deque
 */
class deque {
  constructor() {
      this.front = this.back = undefined;
  }
  append(value) {
      if (!this.front) this.front = this.back = { value };
      else this.front = this.front.next = { value, prev: this.front };
  }
  pop() {
      let value = this.peek();
      if (this.front === this.back) this.front = this.back = undefined;
      else (this.front = this.front.prev).next = undefined;
      return value;
  }
  peek() { 
      return this.front && this.front.value;
  }
  appendleft(value) {
      if (!this.front) this.front = this.back = { value };
      else this.back = this.back.prev = { value, next: this.back };
  }
  popleft() {
      let value = this.peekleft();
      if (this.front === this.back) this.front = this.back = undefined;
      else (this.back = this.back.next).back = undefined;
      return value;
  }
  peekleft() { 
      return this.back && this.back.value;
  }
}

export const range = (n) => {
	return [...Array(n).keys()];
}

export function cyrb128(str) {
  let h1 = 1779033703,
    h2 = 3144134277,
    h3 = 1013904242,
    h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
}

export function random(seed) {
  return cyrb128(`${seed}`)[0] / 4294967295;
}

export function shuffle(array, seed = null) {
  let currentIndex = array.length,
    randomIndex;
  seed = seed ?? Math.random();
  while (currentIndex != 0) {
    randomIndex = Math.floor(random(seed) * currentIndex);
    seed = random(seed);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}



export default {
    sleep, wait_for, emptyFn, emptyFn1Arg, deque, range, cyrb128, random, shuffle
}
