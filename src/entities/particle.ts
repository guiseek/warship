import {Vector2} from '../math'

const between = (min = 0, max = 100) => {
  return ~~(Math.random() * (max - min + 1)) + min
}

export class Particle {
  velocity
  gravity
  friction = 0.9
  decay = between(90, 91) * 0.01
  explode = false
  constructor(public position: Vector2, public radians: number, velocity = 0) {
    this.velocity = new Vector2(
      Math.cos(radians) * velocity,
      Math.sin(radians) * velocity
    )

    this.gravity = radians * 0.01
  }

  update() {
    this.position.add(this.velocity)
    this.velocity.multiplyScalar(this.friction)

    // uncomment for a gravity like effect
    // this.velY += this.gravity;

    this.radians *= this.decay
    this.gravity += 0.05
  }
}
