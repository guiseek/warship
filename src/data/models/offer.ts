export class Offer extends RTCSessionDescription {
  constructor({sdp}: Omit<RTCSessionDescriptionInit, 'type'> = {}) {
    super({type: 'offer', sdp})
  }
}
