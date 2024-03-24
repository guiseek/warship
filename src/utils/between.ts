export const between = (min = 0, max = 255) => {
  return ~~(Math.random() * (max - min + 1)) + min
}
