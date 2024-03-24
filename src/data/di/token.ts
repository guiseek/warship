import {set} from './index'

export class Token<T = unknown> {
  constructor(public name: string, readonly value?: T) {}
}

export function token(name: string): Token
export function token<T>(name: string, value: T): Token<T>
export function token<T>(name: string, value?: T) {
  const ref = new Token<T>(name, value)
  set({for: ref, use: value})
  return ref
}
