export class Answer extends RTCSessionDescription {
  constructor({sdp}: Pick<RTCSessionDescriptionInit, 'sdp'> = {}) {
    super({type: 'answer', sdp})
  }
}
