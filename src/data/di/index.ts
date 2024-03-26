import type {Provider, ProviderKey} from './types'
import {token} from './token'
import type {Fn, Type} from '../../types'

const container = new Map()
const relations = new Map()

export const use = <T>(type: ProviderKey<T>): T => {
  const concrete = container.get(type)
  if (!concrete) throw `Provider ${type.name} não registrado`
  return concrete
}

const is = {
  string(value: unknown): value is string {
    return typeof value === 'string'
  },
  class<T>(value: unknown): value is Type<T> {
    return typeof value === 'function' && typeof value.prototype !== 'undefined'
  },
  function<R>(value: unknown): value is Fn<R> {
    return typeof value === 'function'
  },
}

const provide = <T>({for: key, use}: Provider<T>) => {
  const concrete = use ?? key
  if (is.function<T>(concrete)) {
    const deps = relations.get(key)

    if (is.class(concrete)) {
      return new concrete(...deps)
    }

    return concrete(...deps)
  }

  return concrete as T
}

const add = <T>(provider: Provider<T>) => {
  const deps = provider.deps ?? []
  relations.set(provider.for, deps.map(use))

  const provided = provide(provider)
  container.set(provider.for, provided)
}

export const set = (...providers: Provider[]) => providers.forEach(add)
export default {use, set, add, token}
export {token}
