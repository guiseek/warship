import type {MessageData} from '../interfaces'

export class Message {
  candidate?: RTCIceCandidate | null
  description?: RTCSessionDescription | null

  constructor(message: Partial<MessageData> | string) {
    if (typeof message === 'string') {
      message = this.#parse(message)
    }
    this.candidate = message.candidate
    this.description = message.description
  }

  #parse(message: string): MessageData {
    return JSON.parse(message)
  }

  toJSON() {
    return this.candidate
      ? {candidate: this.candidate.toJSON()}
      : {description: this.description?.toJSON()}
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
