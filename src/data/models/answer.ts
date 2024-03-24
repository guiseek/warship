export class Answer extends RTCSessionDescription {
  constructor({sdp}: Omit<RTCSessionDescriptionInit, 'type'> = {}) {
    super({type: 'answer', sdp})
  }
}
