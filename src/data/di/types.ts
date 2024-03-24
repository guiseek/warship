import type {Token} from './token'

export type AbstractType<T> = abstract new (...params: unknown[]) => T

export interface Type<T> extends Function {
  new (...params: unknown[]): T
}

// export type Fn<T> = (...params: unknown[]) => T;

export type Fn<T> = (...params: unknown[]) => T | Promise<T>

export type ProviderKey<T> = AbstractType<T> | Token<T>
export type ProviderImpl<T> = T | Type<T> | Fn<T>

export interface Provider<T = unknown> {
  for: ProviderKey<T>
  use?: ProviderImpl<T>
  deps?: ProviderKey<T>[]
}
