import { Keyboard } from "../Keyboard"
import { useAudioContext } from "../AudioContext"
import { NoAudioMessage } from "../NoAudioMessage"

export const Main = () => {
  const AudioContext = useAudioContext()
  return !!AudioContext ? <Keyboard /> : <NoAudioMessage />
}
