import type {Callback, MessageData} from '../interfaces'
import type {Message} from '../models/message'

export abstract class Signaling<D> {
  abstract readyState: number
  abstract onmessage:
    | (<T extends this>(this: T, ev: MessageEvent<D>) => void)
    | null

  abstract on(callback: Callback<MessageData>): void
  abstract emit(message: Message): void
}
