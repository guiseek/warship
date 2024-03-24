export function audio(src: string, volume = 1, autoplay = false, mode = 'gamepad') {
  const audio = new Audio(src)
  audio.inputMode = mode
  audio.volume = volume
  if (autoplay) audio.play()
  return audio
}
