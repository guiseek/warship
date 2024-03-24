import {color, timeout} from '../utils'
import type {Bullet} from './bullet'
import {Vector2} from '../math'
import {Entity} from './entity'

export interface ShipControl {
  left: boolean
  right: boolean
  forward: boolean
  backward: boolean
  shoot: boolean
  turbo: boolean
}

export class Ship implements Entity {
  control = {
    left: false,
    right: false,
    forward: false,
    backward: false,
    shoot: false,
    turbo: false,
  }

  health = 100
  dead = false

  bullets: Bullet[] = []
  lastBullet = 0
  bulletTime = 5

  velocity = new Vector2()
  radVel = 0

  nickname?: string

  color = color()

  constructor(
    readonly id: string,
    public position: Vector2,
    public radians: number,
    readonly size: Vector2
  ) {}

  toString() {
    const {id, nickname, radVel, position, control, dead} = this
    const data = {id, nickname, radVel, dead, control, ...position}
    return JSON.stringify(data)
  }

  update(ctx: CanvasRenderingContext2D, width: number, height: number) {
    ctx.fillStyle = 'rgba(222, 222, 222, .2)'
    ctx.font = `1rem 'Segoe UI'`
    ctx.textAlign = 'center'
    ctx.fillText(
      `${this.nickname ?? this.id} (${this.health}%)`,
      this.position.x + this.size.x * Math.cos(this.radians),
      this.position.y - this.size.y * Math.sin(this.radians)
    )

    ctx.strokeStyle = this.color
    ctx.fillStyle = 'rgba(222, 222, 222, .08)'
    ctx.lineWidth = 2

    ctx.beginPath()

    ctx.moveTo(
      this.position.x + Math.cos(this.radians) * this.size.y,
      this.position.y + Math.sin(this.radians) * this.size.y
    )

    ctx.lineTo(
      this.position.x +
        Math.cos(this.radians + (2 * Math.PI) / 3) * this.size.x,
      this.position.y + Math.sin(this.radians + (2 * Math.PI) / 3) * this.size.x
    )

    ctx.lineTo(
      this.position.x +
        Math.cos(this.radians - (2 * Math.PI) / 3) * this.size.x,
      this.position.y + Math.sin(this.radians - (2 * Math.PI) / 3) * this.size.x
    )

    ctx.closePath()
    ctx.stroke()
    ctx.fill()

    /**
     * Velocidade da rotação
     */
    if (this.control.left) {
      if (this.control.forward && this.control.turbo) {
        this.radVel -= 0.005
      } else if (this.control.forward) {
        this.radVel -= 0.001
      } else {
        this.radVel -= 0.003
      }
    }
    if (this.control.right) {
      if (this.control.forward && this.control.turbo) {
        this.radVel += 0.005
      } else if (this.control.forward) {
        this.radVel += 0.001
      } else {
        this.radVel += 0.003
      }
    }

    this.radians += this.radVel *= 0.9

    /**
     * Velocidade
     */
    const power = new Vector2(
      Math.cos(this.radians) / (this.control.turbo ? 0.05 : 2.5),
      Math.sin(this.radians) / (this.control.turbo ? 0.05 : 2.5)
    )
    if (this.control.forward) {
      this.velocity.add(power)
    }
    if (this.control.backward) {
      this.velocity.sub(power)
    }

    /**
     * Velocidade da curva
     */
    this.position.add(this.velocity.clone().multiplyScalar(0.345))

    if (this.position.x > width + 2 * this.size.x) {
      this.position.x = -2 * this.size.x
    }

    if (this.position.y > height + 2 * this.size.x) {
      this.position.y = -2 * this.size.x
    }

    if (this.position.x < -2 * this.size.x) {
      this.position.x = width + 2 * this.size.x
    }

    if (this.position.y < -2 * this.size.x) {
      this.position.y = height + 2 * this.size.x
    }
  }

  kill() {
    this.dead = true
    timeout(() => {
      this.dead = false
      this.health = 100
    }, 5000)
  }
}
