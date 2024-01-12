import { Component, ComponentClass, Ref, forwardRef } from "react"
import Soundfont, { InstrumentName, Player } from "soundfont-player"
import { MidiValue } from "../../domain/note"
import { Optional } from "../../domain/types"
import { AudioNodeRegistry, DEFAULT_INSTRUMENT } from "../../domain/sound"

type InjectedProps = {
  loading: boolean
  play(note: MidiValue): Promise<void>
  stop(note: MidiValue): Promise<void>
}

type ProviderProps = {
  instrument: InstrumentName
  AudioContext: AudioContextType
}

type ProviderState = {
  loading: boolean
  current: Optional<InstrumentName>
}

export function withInstrumentForwardedRef<
  TProps extends InjectedProps = InjectedProps
>(WrappedComponent: ComponentClass<TProps>) {
  //generic constraint
  type ComponentInstance = InstanceType<typeof WrappedComponent>
  type WithForwardedRef = ProviderProps & {
    forwardedRef: Ref<ComponentInstance>
  }
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component"

  class WithInstrument extends Component<WithForwardedRef, ProviderState> {
    constructor(props: WithForwardedRef) {
      super(props)
      const { AudioContext } = this.props
      this.audio = new AudioContext()
    }

    public static defaultProps = {
      instrument: DEFAULT_INSTRUMENT,
    }

    private audio: AudioContext

    private player: Optional<Player> = null

    private activeNodes: AudioNodeRegistry = {}

    public static displayName = `withInstrument(${displayName})`

    public state: ProviderState = {
      loading: false,
      current: null,
    }

    public componentDidMount() {
      const { instrument } = this.props
      this.load(instrument)
    }

    public shouldComponentUpdate({ instrument }: ProviderProps) {
      return this.state.current !== instrument
    }

    public componentDidUpdate({ instrument: prevInstrument }: ProviderProps) {
      const { instrument } = this.props
      if (instrument && instrument !== prevInstrument) this.load(instrument)
    }

    public load = async (instrument: InstrumentName) => {
      this.setState({ loading: true })
      this.player = await Soundfont.instrument(this.audio, instrument)
      this.setState({ loading: false, current: instrument })
    }

    public play = async (note: MidiValue) => {
      await this.resume()
      if (!this.player) return
      const node = this.player.play(note.toString())

      this.activeNodes = { ...this.activeNodes, [note]: node }
    }

    public stop = async (note: MidiValue) => {
      await this.resume()

      if (!this.activeNodes[note]) return
      this.activeNodes[note]!.stop()
      this.activeNodes = { ...this.activeNodes, [note]: null }
    }

    private resume = async () => {
      return this.audio.state === "suspended"
        ? await this.audio.resume()
        : Promise.resolve()
    }

    public render() {
      const { forwardedRef } = this.props
      const injected = {
        loading: this.state.loading,
        play: this.play,
        stop: this.stop,
      } as InjectedProps

      return <WrappedComponent ref={forwardedRef} {...(injected as TProps)} />
    }
  }

  return forwardRef<ComponentInstance, ProviderProps>((props, ref) => (
    <WithInstrument forwardedRef={ref} {...props} />
  ))
}
