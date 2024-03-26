import type {Type} from '../types'

export function bind<T extends Type>(type: T) {
  return (...params: ConstructorParameters<T>) => {
    return new type(...params) as InstanceType<T>
  }
}
