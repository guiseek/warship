export class Vector2 {
  constructor(public x = 0, public y = 0) {}

  clone() {
    return new Vector2(this.x, this.y)
  }

  copy({x, y}: Vector2) {
    return new Vector2(x, y)
  }

  set(x: number, y: number) {
    this.x = x
    this.y = y
    return this
  }

  add({x, y}: Vector2) {
    this.x += x
    this.y += y
    return this
  }

  addScalar(n: number) {
    this.x += n
    this.y += n
    return this
  }

  sub({x, y}: Vector2) {
    this.x -= x
    this.y -= y

    return this
  }

  subScalar(n: number) {
    this.x -= n
    this.y -= n
    return this
  }

  multiply({x, y}: Vector2) {
    this.x *= x
    this.y *= y
    return this
  }

  multiplyScalar(n: number) {
    this.x *= n
    this.y *= n
    return this
  }

  divideScalar(n: number) {
    if (n) {
      this.x /= n
      this.y /= n
    } else {
      this.set(0, 0)
    }

    return this
  }

  length() {
    return Math.sqrt(this.lengthSq())
  }

  lengthSq() {
    return this.x * this.x + this.y * this.y
  }
  
  normalize() {
    return this.divideScalar(this.length())
  }

  cross({x, y}: Vector2) {
    return this.x * y - this.y * x
  }

  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI
  }

  distanceTo(v: Vector2) {
    return Math.sqrt(this.distanceToSquared(v))
  }

  distanceToSquared(v: Vector2) {
    const dx = this.x - v.x
    const dy = this.y - v.y
    return dx * dx + dy * dy
  }

  lerp({x, y}: Vector2, alpha: number) {
    this.x += (x - this.x) * alpha
    this.y += (y - this.y) * alpha

    return this
  }

  [Symbol.toStringTag]() {
    const {x, y} = this
    const data = {x, y}
    return JSON.stringify(data)
  }

  *[Symbol.iterator]() {
    yield this.x
    yield this.y
  }
}
