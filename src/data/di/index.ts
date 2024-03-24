import type {Fn, Provider, ProviderKey, Type} from './types'
import {token} from './token'

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
  class<T extends object>(value: unknown): value is Type<T> {
    return this.function(value) && /^class\s/.test(value.toString())
  },
  function<R extends object>(value: unknown): value is Fn<R> {
    return typeof value === 'function'
  },
}

const provide = <T>({for: key, use}: Provider<T>) => {
  const concrete = use ?? key

  if (is.function(concrete)) {
    const deps = relations.get(key)

    if (is.class(concrete)) {
      return new concrete(...deps) as Type<T>
    }

    return concrete(...deps) as Fn<T>
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
