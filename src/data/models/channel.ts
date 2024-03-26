import type {ChannelEventMap} from '../interfaces'

function getMessageData<T>(event: MessageEvent<string | T>): T {
  return typeof event.data === 'string' ? JSON.parse(event.data) : event.data
}

export class Channel<T extends ChannelEventMap> {
  #channel

  #subjects = new Map()

  state: RTCDataChannelState = 'closed'

  constructor(dataChannel: RTCDataChannel) {
    this.#channel = dataChannel

    this.state = dataChannel.readyState

    this.#channel.onopen = () => {
      this.state = 'open'
    }

    this.#channel.onmessage = (event) => {
      this.#emitSubject('data', getMessageData(event))
    }
  }

  send<T extends {toString(): string}>(value: T) {
    if (this.#channel.readyState === 'open') {
      this.#channel.send(value.toString())
    }
  }

  on<Type extends keyof T>(type: Type, cb: Callback<T[Type]>) {
    const subject = this.#getSubject(type)
    this.#subjects.set(type, subject.add(cb))
  }

  #emitSubject<Type extends keyof T>(type: Type, value: T[Type]) {
    const subject = this.#getSubject(type)
    for (const fn of subject) fn(value)
  }

  #getSubject<Type extends keyof T>(type: Type): Set<Callback<T[Type]>> {
    return this.#subjects.get(type) ?? new Set()
  }
}
