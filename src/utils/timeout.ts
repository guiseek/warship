export function timeout(fn: VoidFunction, ms = 1000) {
  const ref = window.setTimeout(fn, ms)
  return {cancel: () => window.clearTimeout(ref)}
}
