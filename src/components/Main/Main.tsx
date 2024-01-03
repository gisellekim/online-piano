import { KeyboardWithInstrument } from "../Keyboard"
import { NoAudioMessage } from "../NoAudioMessage"
import { useAudioContext } from "../AudioContext"

export const Main = () => {
  const AudioContext = useAudioContext()
  return !!AudioContext ? <KeyboardWithInstrument /> : <NoAudioMessage />
}
