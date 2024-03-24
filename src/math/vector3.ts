export class Vector3 {
  constructor(public x = 0, public y = 0, public z = 0) {}

  clone() {
    return new Vector3(this.x, this.y)
  }

  copy({x, y}: Vector3) {
    return new Vector3(x, y)
  }

  set(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
    return this
  }

  add({x, y, z}: Vector3) {
    this.x += x
    this.y += y
    this.z += z
    return this
  }

  addScalar(n: number) {
    this.x += n
    this.y += n
    this.z += n
    return this
  }

  sub({x, y, z}: Vector3) {
    this.x -= x
    this.y -= y
    this.z -= z

    return this
  }

  subScalar(n: number) {
    this.x -= n
    this.y -= n
    this.z -= n
    return this
  }

  multiply({x, y, z}: Vector3) {
    this.x *= x
    this.y *= y
    this.z *= z
    return this
  }

  multiplyScalar(n: number) {
    this.x *= n
    this.y *= n
    this.z *= n
    return this
  }

  cross(v: Vector3) {
    return this.crossVectors(this, v)
  }

  crossVectors(a: Vector3, b: Vector3) {
    const ax = a.x
    const ay = a.y
    const az = a.z

    const bx = b.x
    const by = b.y
    const bz = b.z

    this.x = ay * bz - az * by
    this.y = az * bx - ax * bz
    this.z = ax * by - ay * bx

    return this
  }

  dot({x, y, z}: Vector3) {
    return this.x * x + this.y * y + this.z * z
  }

  reflect(normal: Vector3) {
    return this.sub(_vector.copy(normal).multiplyScalar(2 * this.dot(normal)))
  }

  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI
  }

  distanceTo(v: Vector3) {
    return Math.sqrt(this.distanceToSquared(v))
  }

  distanceToSquared(v: Vector3) {
    const dx = this.x - v.x
    const dy = this.y - v.y
    const dz = this.z - v.z

    return dx * dx + dy * dy + dz * dz
  }

  lerp({x, y, z}: Vector3, alpha: number) {
    this.x += (x - this.x) * alpha
    this.y += (y - this.y) * alpha
    this.z += (z - this.z) * alpha

    return this
  }

  [Symbol.toStringTag]() {
    const {x, y, z} = this
    const data = {x, y, z}
    return JSON.stringify(data)
  }

  *[Symbol.iterator]() {
    yield this.x
    yield this.y
    yield this.z
  }
}

const _vector = new Vector3()
