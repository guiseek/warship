import {Ship, type ShipControl} from './ship'
import {Vector2} from '../math'
import {Bullet} from './bullet'

interface ShipData {
  id: string
  nickname?: string
  x: number
  y: number
  radVel: number
  control: ShipControl
}

export class World {
  width
  height

  ships = new Map<string, Ship>()

  get shipsAlive() {
    return Array.from(this.ships.values()).filter((ship) => !ship.dead)
  }

  constructor(public ctx: CanvasRenderingContext2D) {
    this.width = ctx.canvas.width = innerWidth
    this.height = ctx.canvas.height = innerHeight
  }

  createShip(id: string) {
    const center = new Vector2(this.width / 2, this.height / 2)
    const size = new Vector2(16, 32)
    const ship = new Ship(id, center, 1, size)
    this.ships.set(id, ship)
    return ship
  }

  addShip(data: ShipData) {
    const center = new Vector2(data.x, data.y)
    const size = new Vector2(16, 32)
    const ship = new Ship(data.id, center, 1, size)
    ship.nickname = data.nickname
    this.ships.set(data.id, ship)
  }

  removeShip({id}: Ship) {
    this.ships.delete(id)
  }

  moveShip({id, x, y, radVel, nickname, control}: ShipData) {
    const ship = this.ships.get(id)
    if (ship) {
      ship.nickname = nickname
      ship.position.set(x, y)
      ship.control = control
      ship.radVel = radVel
    } else {
      this.addShip({id, nickname, x, y, radVel, control})
    }
  }

  update() {
    this.ctx.fillStyle = `rgba(0, 0, 0, .4)`
    this.ctx.fillRect(0, 0, this.width, this.height)

    for (const ship of this.shipsAlive) {
      if (ship.health <= 0) {
        ship.kill()
      }

      ship.update(this.ctx, this.width, this.height)

      ++ship.lastBullet
      if (ship.control.shoot && ship.lastBullet > ship.bulletTime) {
        ship.bullets.push(
          new Bullet(ship.id, ship.position.clone().addScalar(2), ship.radians)
        )
        ship.lastBullet = 0
      }

      for (let i = 0; i < ship.bullets.length; ++i) {
        let bullet = ship.bullets[i]

        bullet.update(this.ctx)

        for (const ship of this.shipsAlive) {
          const distance = bullet.position.distanceTo(ship.position)
          if (bullet.origin !== ship.id && distance < ship.size.y) {
            --ship.health

            const oppositeDirection = ship.position
              .clone()
              .sub(bullet.position)
              .normalize()

            const forceMagnitude = 0.3

            ship.velocity.add(oppositeDirection.multiplyScalar(forceMagnitude))
          }
        }

        if (
          bullet.head.x > this.width ||
          bullet.head.x < 0 ||
          bullet.head.y > this.height ||
          bullet.head.y < 0
        ) {
          ship.bullets.splice(i, 1)
          --i
        }
      }
    }
  }

  resize() {
    this.width = this.ctx.canvas.width = innerWidth
    this.height = this.ctx.canvas.height = innerHeight
  }
}
