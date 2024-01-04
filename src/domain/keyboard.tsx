import { OctaveIndex, PitchIndex } from "./note"

export type Key = string
export type Keys = Key[]

export const FIRST_OCTAVE: Keys = Array.from("zsxdcvgbhnjm")
export const SESCOND_OCTAVE: Keys = Array.from("r5t6yu8i9o0p")
export const CHANGE_OCTAVE_AT: OctaveIndex = 5 // Piano octave sesction

export function selectKey(octaveIndex: OctaveIndex, index: PitchIndex): Key {
  const octaveRow =
    octaveIndex < CHANGE_OCTAVE_AT ? FIRST_OCTAVE : SESCOND_OCTAVE
  return octaveRow[index]
}
