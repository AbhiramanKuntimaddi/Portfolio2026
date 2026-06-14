let done = false;
const subs = new Set<() => void>();

export const loaderSignal = {
  get done() {
    return done;
  },
  complete() {
    if (done) return;
    done = true;
    subs.forEach((fn) => fn());
    subs.clear();
  },
  onComplete(fn: () => void) {
    if (done) {
      fn();
      return () => {};
    }
    subs.add(fn);
    return () => subs.delete(fn);
  },
};
