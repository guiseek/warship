import type {Callback, PeerEventMap} from '../interfaces'

export class Peer<T extends PeerEventMap> extends RTCPeerConnection {
  #events = new Map()

  constructor(configuration: RTCConfiguration = {}) {
    super(configuration)

    this.onicecandidate = ({candidate}) => {
      if (candidate) this.#emitEvent('candidate', candidate)
    }

    this.ontrack = (event) => {
      this.#emitEvent('track', event)
    }

    this.onnegotiationneeded = () => {
      this.#emitEvent('negotiate')
    }
  }

  createChannel(name: string, init?: RTCDataChannelInit) {
    const channel = super.createDataChannel(name, init)

    channel.onopen = () => {
      this.#emitEvent('open', channel)
    }
  }

  get local() {
    return this.localDescription
  }

  setLocal(description?: RTCLocalSessionDescriptionInit) {
    return super.setLocalDescription(description)
  }

  setRemote(description: RTCSessionDescriptionInit) {
    return super.setRemoteDescription(description)
  }

  addCandidate(candidate: RTCIceCandidate) {
    return this.addIceCandidate(candidate)
  }

  on<Event extends keyof T>(event: Event, fn: Callback<T[Event]>) {
    const events = this.#getEvents(event)
    this.#events.set(event, events.add(fn))

    const cancel = () => {
      const events = this.#getEvents(event)
      events.delete(fn)
      this.#events.set(event, events)
    }

    return {cancel}
  }

  #emitEvent<Event extends keyof T>(event: Event, ...value: T[Event][]) {
    const events = this.#events.get(event)
    for (const event of events) event(...value)
  }

  #getEvents<Event extends keyof T>(event: Event): Set<Callback<T[Event]>> {
    const events = this.#events.get(event)
    return events ?? new Set()
  }
}
