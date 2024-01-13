import { ComponentType, useEffect } from "react"
import { InstrumentName } from "soundfont-player"
import { MidiValue } from "../../domain/note"
import { useSoundfont } from "./useSoundfont"

type InjectedProps = {
  loading: boolean
  play(note: MidiValue): Promise<void>
  stop(note: MidiValue): Promise<void>
}

type ProviderProps = {
  instrument?: InstrumentName
  AudioContext: AudioContextType
}

export const withInstrumentBasedOnHook = (
  WrappedComponent: ComponentType<InjectedProps>
) => {
  return function WithInstrumentComponent(props: ProviderProps) {
    const { AudioContext, instrument } = props
    const { loading, current, play, stop, load } = useSoundfont({
      AudioContext,
    })

    useEffect(() => {
      if (!loading && instrument !== current) load(instrument)
    }, [loading, current, play, stop, load])

    return <WrappedComponent loading={loading} play={play} stop={stop} />
  }
}
