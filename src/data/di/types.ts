import type {Abstract, Fn, Type} from '../../types'
import type {Token} from './token'

export type ProviderKey<T> = Abstract<T> | Token<T>
export type ProviderImpl<T> = T | Type<T> | Fn<T>

export interface Provider<T = unknown> {
  for: ProviderKey<T>
  use?: ProviderImpl<T>
  deps?: ProviderKey<T>[]
}
