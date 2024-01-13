import { useAudioContext } from "../AudioContext"
import { withInstrumentBasedOnHook } from "../../adapters/Soundfont"
import { useInstrument } from "../../state/Instrument"
import { Keyboard } from "./Keyboard"

const WrappedKeyboard = withInstrumentBasedOnHook(Keyboard)

export const KeyboardWithInstrument = () => {
  const AudioContext = useAudioContext()!
  const { instrument } = useInstrument()

  return <WrappedKeyboard AudioContext={AudioContext} instrument={instrument} />
}
