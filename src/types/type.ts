export interface Type<T = unknown> extends Function {
  new (...params: any[]): T
}
