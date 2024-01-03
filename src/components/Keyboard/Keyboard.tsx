import { FunctionComponent } from "react"
import { Key } from "../Key/Key"
import { MidiValue, notes } from "../../domain/note"
import { selectKey } from "../../domain/keyboard"
import styles from "./Keyboard.module.css"

export type KeyboardProps = {
  loading: boolean
  play: (note: MidiValue) => Promise<void>
  stop: (note: MidiValue) => Promise<void>
}
export const Keyboard: FunctionComponent<KeyboardProps> = ({
  loading,
  play,
  stop,
}) => {
  return (
    <div className={styles.keyboard}>
      {notes.map(({ midi, type, index, octave }) => {
        const label = selectKey(octave, index)
        return (
          <Key
            key={midi}
            type={type}
            label={label}
            disabled={loading}
            onUp={() => stop(midi)}
            onDown={() => play(midi)}
          />
        )
      })}
    </div>
  )
}
