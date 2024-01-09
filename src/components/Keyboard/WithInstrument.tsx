import { useEffect } from "react"
import { SoundfontProvider, useSoundfont } from "../../adapters/Soundfont"
import { useAudioContext } from "../AudioContext"
import { useInstrument } from "../../state/Instrument"
import { Keyboard } from "../Keyboard"

export const KeyboardWithInstrument = () => {
  const AudioContext = useAudioContext()!
  const { instrument } = useInstrument()
  const { loading, load, current } = useSoundfont({ AudioContext })

  useEffect(() => {
    if (!loading && instrument !== current) load(instrument)
  }, [load, loading, current, instrument])

  return (
    <SoundfontProvider
      AudioContext={AudioContext}
      instrument={instrument}
      render={(props) => <Keyboard {...props} />}
    />
  )
}
