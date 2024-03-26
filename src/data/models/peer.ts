import type {PeerEventMap} from '../interfaces'
import {EventMap, bind} from '../../utils'
import {Answer} from './answer'
import {Offer} from './offer'

export class Peer<T extends PeerEventMap> extends EventMap<T> {
  constructor(private connection: RTCPeerConnection) {
    super()

    this.connection.onicecandidate = ({candidate}) => {
      if (candidate) this.emit('candidate', candidate)
    }

    this.connection.ontrack = (event) => {
      this.emit('track', event)
    }

    this.connection.onnegotiationneeded = () => {
      this.emit('negotiate')
    }
  }

  collectOffer(options?: RTCOfferOptions) {
    return this.connection
      .createOffer(options)
      .then(this.setLocal)
      .then(bind(Offer))
  }

  collectAnswer(options?: RTCAnswerOptions) {
    return this.connection
      .createAnswer(options)
      .then(this.setLocal)
      .then(bind(Answer))
  }

  prepareChannel(name: string, init?: RTCDataChannelInit) {
    const channel = this.connection.createDataChannel(name, init)

    channel.onopen = () => {
      this.emit('open', channel)
    }
  }

  get local() {
    return this.connection.localDescription
  }

  setLocal = async (description?: RTCLocalSessionDescriptionInit) => {
    await this.connection.setLocalDescription(description)
    return description
  }

  setRemote = async (description: RTCSessionDescriptionInit) => {
    return this.connection.setRemoteDescription(description)
  }

  addCandidate(candidate: RTCIceCandidate) {
    return this.connection.addIceCandidate(candidate)
  }
}
