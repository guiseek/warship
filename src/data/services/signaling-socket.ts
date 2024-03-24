import type {Callback, MessageData} from '../interfaces'
import {Answer, Candidate, Offer} from '../models'
import type {Message} from '../models/message'
import type {Signaling} from './signaling'

export class SignalingSocket<D> extends WebSocket implements Signaling<D> {
  #listeners = new Set<Callback<MessageData>>()

  constructor(url: string) {
    super(url)

    this.onmessage = (message: MessageEvent<string>) => {
      const {candidate, description} = JSON.parse(message.data) as MessageData
      for (const listener of this.#listeners) {
        // console.log(candidate, description)
        if (candidate) {
          listener({candidate: new Candidate(candidate), description})
        }
        if (description) {
          if (description.type === 'offer') {
            listener({description: new Offer(description), candidate})
          }
          if (description.type === 'answer') {
            listener({description: new Answer(description), candidate})
          }
        }
      }
    }
  }

  on(callback: Callback<MessageData>): void {
    this.#listeners.add(callback)
  }

  emit(value: Message) {
    if (this.readyState === 1) super.send(value.toString())
  }
}
