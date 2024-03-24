export abstract class Entity {
  abstract update(ctx: CanvasRenderingContext2D, ...params: unknown[]): void
}
