export class Offer extends RTCSessionDescription {
  constructor({sdp}: Pick<RTCSessionDescriptionInit, 'sdp'> = {}) {
    super({type: 'offer', sdp})
  }
}
