import {Peer, Signaling, SignalingChannel, set, token} from './data'
import {addKey, create} from './utils'

interface Config {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
}

const canvas = create('canvas')
container.append(canvas)

const ctx = canvas.getContext('2d')
if (!ctx) {
  throw new Error(`Context error`)
}

/**
 * Config
 */
const configToken = token<Config>('config.token', {canvas, ctx})

/**
 * Signaling
 */
const signalingToken = token<string>('signaling.token', 'webrtc')

/**
 * Peer
 */
const peerToken = token<RTCConfiguration>('peer.token', {})

/**
 * Instances
 */
set(
  {
    for: Peer,
    deps: [peerToken],
  },
  {
    for: Signaling,
    use: SignalingChannel,
    deps: [signalingToken],
  }
)

addKey('left', ['ArrowLeft', 'KeyA'])
addKey('right', ['ArrowRight', 'KeyD'])
addKey('forward', ['ArrowUp', 'KeyW'])
addKey('backward', ['ArrowDown', 'KeyS'])
addKey('turbo', ['ControlLeft'])
addKey('shoot', ['Space'])

export {configToken, signalingToken, peerToken}
