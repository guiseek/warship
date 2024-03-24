import {between} from './between'

export function color(r = between(), g = between(), b = between()) {
  const hex = (dec: number) => dec.toString(16).padStart(2, '0')

  return `#${hex(r)}${hex(g)}${hex(b)}`
}
