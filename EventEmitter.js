class EventEmitter {
  constructor() {
    this.events = {};
  }
  subscribe(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);

    return () => this.events[eventName].filter((eventFn) => fn !== eventFn);
  }

  emit(eventName, data) {
    const event = this.events[eventName];
    event?.forEach((fn) => fn.call(null, data));
  }
}

const memoize = (fn) =>
  new Proxy(fn, {
    cache: new Map(),
    apply: (target, thisArg, argArray) => {
      let cacheKey = argArray.toString();
      if (!this.cache.has(cacheKey)) {
        const result = target.apply(thisArg, argArray);
        return this.cache.set(cacheKey, result);
      }
      return this.cache.get(cacheKey);
    },
  });
