import type {Callback, MessageData} from '../interfaces'
import {Answer, Candidate, Offer} from '../models'
import type {Message} from '../models/message'
import type {Signaling} from './signaling'

export class SignalingChannel<D>
  extends BroadcastChannel
  implements Signaling<D>
{
  readyState = 1

  #listeners = new Set<Callback<MessageData>>()

  constructor(name: string) {
    super(name)

    this.onmessage = (message: MessageEvent<MessageData>) => {
      console.log(message);
      const {candidate, description} = message.data as MessageData
      console.log(candidate, description);
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
    super.postMessage(value.toJSON())
  }
}
