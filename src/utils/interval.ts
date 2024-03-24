export function interval(fn: VoidFunction, ms = 1000) {
  const ref = window.setInterval(fn, ms)
  return {cancel: () => window.clearInterval(ref)}
}
