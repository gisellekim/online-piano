import { useEffect } from "react"
import { Keyboard } from "../Keyboard"
import { useAudioContext } from "../AudioContext"
import { useSoundfont } from "../../adapters/Soundfont"
import { useInstrument } from "../../state/Instrument"

export const KeyboardWithInstrument = () => {
  const AudioContext = useAudioContext()!
  const { instrument } = useInstrument()
  const { loading, load, play, stop, current } = useSoundfont({ AudioContext })

  useEffect(() => {
    if (!loading && instrument !== current) load(instrument)
  }, [load, loading, current, instrument])

  return <Keyboard loading={loading} play={play} stop={stop} />
}
