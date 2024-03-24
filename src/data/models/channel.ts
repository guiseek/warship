import type {Callback} from '../interfaces'

export class Channel {
  #listeners = new Set<Callback<any>>()

  #channel

  state: RTCDataChannelState = 'closed'

  constructor(dataChannel: RTCDataChannel) {
    this.#channel = dataChannel

    this.state = dataChannel.readyState

    this.#channel.onopen = () => {
      this.state = 'open'
    }

    this.#channel.onmessage = ({data}) => {
      for (const listener of this.#listeners) {
        listener(JSON.parse(data))
      }
    }
  }

  on<T>(callback: Callback<T>) {
    this.#listeners.add(callback)
  }

  send<T extends {toString(): string}>(value: T) {
    this.#channel.send(value.toString())
  }
}
