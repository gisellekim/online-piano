import { EffectCallback, useEffect } from "react"

export const useEffectOnce = (effect: EffectCallback) => {
  useEffect(effect, [])
}

type Effect = (...args: unknown[]) => void

export const useMount = (fn: Effect) => {
  useEffectOnce(() => {
    fn()
  })
}
