import { useAudioContext } from "../AudioContext"
import { NoAudioMessage } from "../NoAudioMessage"

const Keyboard = () => <>Keyboard</>

export const Main = () => {
  const AudioContext = useAudioContext()
  return !!AudioContext ? <Keyboard /> : <NoAudioMessage />
}
