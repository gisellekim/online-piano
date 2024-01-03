import { Keyboard } from "../Keyboard"
import { useAudioContext } from "../AudioContext"
import { useSoundfont } from "../../adapters/Soundfont"
import { useMount } from "../../utils/useMount"

export const KeyboardWithInstrument = () => {
  const AudioContext = useAudioContext()!
  const { loading, load, play, stop } = useSoundfont({ AudioContext })

  useMount(() => load())
  return <Keyboard loading={loading} play={play} stop={stop} />
}
