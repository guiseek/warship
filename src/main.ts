import type {ChannelEventMap, MessageData, PeerEventMap} from './data'
import {Peer, Signaling, Message, Channel} from './data'
import {World, type Ship} from './entities'
import {control} from './utils'
import {use} from './data/di'
import './style.css'
import './config'

let ship: Ship
let peer: Peer<PeerEventMap>
let channel: Channel<ChannelEventMap>
let id = crypto.randomUUID()

const world = use(World)

const signaling = use(Signaling<MessageData>)

function init() {
  // debugger
  peer = use(Peer<PeerEventMap>)

  peer.on('candidate', (candidate) => {
    signaling.emit(new Message({candidate}))
  })

  peer.on('negotiate', async () => {
    await peer.collectOffer()
    // await peer.setLocal()
    signaling.emit(new Message({description: peer.local}))
  })

  peer.prepareChannel('chat', {negotiated: true, id: 0})

  peer.on('open', (c) => {
    channel = new Channel(c)

    ship = world.createShip(id)

    ship.nickname = localStorage.getItem('nickname') ?? undefined
    if (ship.nickname) nickname.value = ship.nickname

    ship.color = localStorage.getItem('color') ?? ship.color
    color.value = ship.color

    control(ship.control)

    channel.on('data', (data) => {
      world.moveShip(data)
    })

    channel.send(ship)
  })
}

signaling.on(async ({description, candidate}) => {
  if (description) {
    await peer.setRemote(description)

    if (description.type == 'offer') {
      // await peer.setLocal()
      // const description = peer.local
      const description = await peer.collectAnswer()
      signaling.emit(new Message({description}))
    }
  } else if (candidate) {
    await peer.addCandidate(candidate)
  }
})

function animate() {
  requestAnimationFrame(animate)

  world.update()

  if (channel && channel.state === 'open' && ship) {
    channel.send(ship)
  }
  if (signaling.readyState && !peer) {
    init()
  }
}

animate()

onresize = () => world.resize()

nickname.oninput = () => {
  if (ship) {
    ship.nickname = nickname.value
    localStorage.setItem('nickname', nickname.value)
  }
}

color.oninput = () => {
  if (ship) {
    ship.color = color.value
    localStorage.setItem('color', color.value)
  }
}
