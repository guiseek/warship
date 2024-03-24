import laser from '../sounds/laser.mp3'
import {audio, color} from '../utils'
import {Entity} from './entity'
import {Vector2} from '../math'

export class Bullet implements Entity {
  static inc = 0

  color = color()

  head: Vector2
  velocity: Vector2

  constructor(
    public origin: string,
    public position: Vector2,
    radians: number
  ) {
    this.head = position.clone()

    if (Bullet.inc++ % 5 === 0) {
      audio(laser, 0.1, true)
    }

    const velocity = 10

    this.velocity = new Vector2(
      Math.cos(radians) * velocity,
      Math.sin(radians) * velocity
    )

    this.position.add(this.velocity.clone().multiplyScalar(2))
    this.head.add(this.velocity.clone().multiplyScalar(1))
  }

  update(ctx: CanvasRenderingContext2D) {
    this.position.add(this.velocity)

    this.head.add(this.velocity)

    ctx.beginPath()
    ctx.moveTo(this.position.x, this.position.y)
    ctx.lineTo(this.head.x, this.head.y)
    ctx.strokeStyle = this.color
    ctx.stroke()
    ctx.closePath()
  }
}
