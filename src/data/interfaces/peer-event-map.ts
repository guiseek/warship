interface PeerTrack extends RTCTrackEvent {}

export interface PeerEventMap {
  candidate: RTCIceCandidate
  track: PeerTrack
  negotiate: void
  open: RTCDataChannel
}
