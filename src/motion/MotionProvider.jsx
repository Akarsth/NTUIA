import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_PRESET, EFFECTS, MotionContext, PRESETS } from './effects.js'

const STORAGE_KEY = 'ntuia-motion'

function initialState() {
  // A link such as https://ntuia.org/?motion=grand previews a preset.
  const fromUrl = new URLSearchParams(window.location.search).get('motion')
  if (fromUrl && PRESETS[fromUrl]) return { preset: fromUrl, effects: PRESETS[fromUrl].effects }
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (saved && Array.isArray(saved.effects)) return saved
  } catch {
    // Storage unavailable or corrupted: fall back to defaults.
  }
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const preset = reduced ? 'off' : DEFAULT_PRESET
  return { preset, effects: PRESETS[preset].effects }
}

export default function MotionProvider({ children }) {
  const [state, setState] = useState(initialState)

  // Expose each active effect as an fx-* class on <html> so CSS can animate it.
  useEffect(() => {
    const root = document.documentElement
    EFFECTS.forEach(({ key }) => root.classList.toggle(`fx-${key}`, state.effects.includes(key)))
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Ignore: preference just won't persist.
    }
  }, [state])

  const value = useMemo(
    () => ({
      preset: state.preset,
      effects: state.effects,
      has: (key) => state.effects.includes(key),
      setPreset: (preset) => setState({ preset, effects: PRESETS[preset].effects }),
      toggle: (key) =>
        setState((s) => {
          const effects = s.effects.includes(key) ? s.effects.filter((k) => k !== key) : [...s.effects, key]
          const match = Object.entries(PRESETS).find(
            ([, p]) => p.effects.length === effects.length && p.effects.every((k) => effects.includes(k)),
          )
          return { preset: match ? match[0] : 'custom', effects }
        }),
    }),
    [state],
  )

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
}
