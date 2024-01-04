import { FC, useState } from "react"
import { InstrumentContext } from "./Context"
import { DEFAULT_INSTRUMENT } from "../../domain/sound"

interface InstrumentContextProviderProps {
  children?: React.ReactNode
}

export const InstrumentContextProvider: FC<InstrumentContextProviderProps> = ({
  children,
}) => {
  const [instrument, setInstrument] = useState(DEFAULT_INSTRUMENT)

  return (
    <InstrumentContext.Provider value={{ instrument, setInstrument }}>
      {children}
    </InstrumentContext.Provider>
  )
}
