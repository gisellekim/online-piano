import { InstrumentContextProvider } from "../../state/Instrument"
import { InstrumentSelector } from "../InstrumentSelector"
import { KeyboardWithInstrument } from "../Keyboard"

export const Playground = () => {
  return (
    <InstrumentContextProvider>
      <div className="playground">
        <InstrumentSelector />
        <KeyboardWithInstrument />
      </div>
    </InstrumentContextProvider>
  )
}
