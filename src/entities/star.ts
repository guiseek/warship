export class Star {
  x: number
  y: number
  z: number

  vel = {x: 0, y: 0, tx: 0, ty: 0, z: 0.0005}

  constructor(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }

  update(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(this.x, this.y, 1, 1)
  }
}
