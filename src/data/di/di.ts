// import { token } from "./token"

// export class Token<T = unknown> {
//   constructor(public name: string | T) {}
// }

// // export function token<T>(name: T) {
// //   return new Token(name)
// // }

// export type AbstractType<T> = abstract new (...params: unknown[]) => T

// export interface Type<T> extends Function {
//   new (...params: unknown[]): T
// }

// export type Fn<T> = (...params: unknown[]) => T | Promise<T>

// export type ProviderKey<T> = AbstractType<T> | Token<T>
// export type ProviderImpl<T> = T | Type<T> | Fn<T>

// export interface Provider<T = unknown> {
//   for: ProviderKey<T>
//   use?: ProviderImpl<T>
//   deps?: ProviderKey<T>[]
// }

// const container = new Map<ProviderKey<any>, any | Promise<any>>()
// const relations = new Map<ProviderKey<any>, any | Promise<any>[]>()

// // export const use = async <T>(type: ProviderKey<T>): Promise<T> => {
// //   const concrete = container.get(type)
// //   if (!concrete) throw `Provider ${type.name} não registrado`
// //   return await concrete
// // }

// export const useSync = <T>(type: ProviderKey<T>): T => {
//   const concrete = container.get(type)
//   if (!concrete) throw `Provider ${type.name} não registrado`
//   return concrete
// }

// export const useAsync = async <T>(type: ProviderKey<T>): Promise<T> => {
//   const concrete = container.get(type)
//   if (!concrete) throw `Provider ${type.name} não registrado`
//   return await concrete
// }

// const is = {
//   string(value: unknown): value is string {
//     return typeof value === 'string'
//   },
//   object(value: unknown): value is object {
//     return typeof value === 'object'
//   },
//   class<T extends object>(value: unknown): value is Type<T> {
//     return this.function(value) && /^class\s/.test(value.toString())
//   },
//   function<R extends object>(value: unknown): value is Fn<R> {
//     return typeof value === 'function'
//   },
// }

// const provide = async <T>({for: key, use}: Provider<T>): Promise<T> => {
//   const concrete = use ?? key

//   if (is.function(concrete)) {
//     const deps = relations.get(key) ?? []
//     const resolvedDeps = await Promise.all(deps)

//     if (is.class(concrete)) {
//       return new concrete(...resolvedDeps) as Promise<T>
//     }

//     return concrete(...resolvedDeps) as Promise<T>
//   }

//   return (await concrete) as Awaited<Promise<T>>
// }

// const add = <T>(provider: Provider<T>) => {
//   const deps = provider.deps ?? []
//   relations.set(provider.for, deps.map(useSync))

//   const provided = provide(provider)
//   container.set(provider.for, provided)
// }

// export const set = (...providers: Provider[]) => {
//   providers.forEach(add)
// }

// export { useSync as use }
// export default {use: useSync, set, add, token}
// // export {token};
