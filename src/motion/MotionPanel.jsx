import { useState } from 'react'
import { EFFECTS, PRESETS, useMotion } from './effects.js'

export default function MotionPanel() {
  const [open, setOpen] = useState(false)
  const motion = useMotion()

  return (
    <div className="motion-panel">
      {open && (
        <div className="motion-panel__card" role="dialog" aria-label="Motion graphics settings">
          <div className="motion-panel__head">
            <strong>Motion graphics</strong>
            <button className="motion-panel__close" onClick={() => setOpen(false)} aria-label="Close">×</button>
          </div>
          <div className="motion-panel__presets" role="radiogroup" aria-label="Preset">
            {Object.entries(PRESETS).map(([key, p]) => (
              <button
                key={key}
                role="radio"
                aria-checked={motion.preset === key}
                className={motion.preset === key ? 'is-active' : ''}
                onClick={() => motion.setPreset(key)}
              >
                {p.label}
              </button>
            ))}
          </div>
          <ul className="motion-panel__list">
            {EFFECTS.map((e) => (
              <li key={e.key}>
                <label>
                  <input type="checkbox" checked={motion.has(e.key)} onChange={() => motion.toggle(e.key)} />
                  <span>
                    {e.label}
                    <small>{e.hint}</small>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button className="motion-panel__fab" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        ✦ Motion{motion.preset !== 'custom' ? `: ${PRESETS[motion.preset].label}` : ': Custom'}
      </button>
    </div>
  )
}
