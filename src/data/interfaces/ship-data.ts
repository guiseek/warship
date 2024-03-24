import type {ShipControl} from './ship-control'

export interface ShipData {
  id: string
  nickname?: string
  x: number
  y: number
  radVel: number
  control: ShipControl
}
