import { InstrumentName } from "soundfont-player"
import instruments from "soundfont-player/names/musyngkite.json"

type Option = {
  value: InstrumentName
  label: string
}

type OptionsList = Option[]
type InstrumentList = InstrumentName[]

function normaliseList(list: InstrumentList): OptionsList {
  return list.map((instrument) => {
    const lowercaseName = instrument.replace(/_/gi, " ")
    const instrumentName =
      lowercaseName.charAt(0).toUpperCase() + lowercaseName.slice(1)
    return {
      value: instrument,
      label: instrumentName,
    }
  })
}
export const options = normaliseList(instruments as InstrumentList)
