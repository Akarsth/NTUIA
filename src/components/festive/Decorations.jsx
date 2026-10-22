import { useId } from 'react'

// Deterministic pseudo-random so layouts are stable between renders.
function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

/* ---------- String of fairy lights across the top ---------- */
const BULB_COLORS = ['#ffd36b', '#f5a524', '#fff1b8', '#e8730c']
const SWOOPS = 3
const BULBS_PER_SWOOP = 9
const bulbs = Array.from({ length: SWOOPS * BULBS_PER_SWOOP }, (_, i) => {
  const swoop = Math.floor(i / BULBS_PER_SWOOP)
  const t = ((i % BULBS_PER_SWOOP) + 0.5) / BULBS_PER_SWOOP
  return {
    left: ((swoop + t) / SWOOPS) * 100,
    top: 8 + Math.sin(Math.PI * t) * 46,
    color: BULB_COLORS[i % BULB_COLORS.length],
    delay: (i % 7) * 0.35,
  }
})
const wirePath = Array.from({ length: SWOOPS }, (_, s) => {
  const x0 = (s / SWOOPS) * 1200
  const x1 = ((s + 1) / SWOOPS) * 1200
  return `M${x0} 4 Q${(x0 + x1) / 2} 104 ${x1} 4`
}).join(' ')

export function StringLights() {
  return (
    <div className="string-lights" aria-hidden="true">
      <svg viewBox="0 0 1200 70" preserveAspectRatio="none">
        <path d={wirePath} fill="none" stroke="#7a4a2a" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      {bulbs.map((b, i) => (
        <span
          key={i}
          className="bulb"
          style={{ left: `${b.left}%`, top: `${b.top}px`, '--c': b.color, '--d': `${b.delay}s` }}
        />
      ))}
    </div>
  )
}

/* ---------- Hanging kandil lantern ---------- */
export function Lantern({ color = '#7a1a36', length = 40, className = '' }) {
  const id = useId()
  return (
    <div className={`lantern-hang ${className}`} aria-hidden="true">
      <svg viewBox={`0 0 60 ${length + 112}`} width="60" height={length + 112}>
        <defs>
          <radialGradient id={`${id}g`} cx="50%" cy="55%" r="55%">
            <stop offset="0" stopColor="#fff2b0" />
            <stop offset="0.5" stopColor="#f5a524" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <line x1="30" y1="0" x2="30" y2={length} stroke="#7a4a2a" strokeWidth="1.5" />
        <g transform={`translate(0 ${length})`}>
          <rect x="22" y="0" width="16" height="7" rx="2" fill="#c9962b" />
          <path d="M30 7 C4 14 2 56 30 70 C58 56 56 14 30 7Z" fill={color} />
          <path d="M30 14 C15 20 13 52 30 62 C47 52 45 20 30 14Z" fill={`url(#${id}g)`} className="lantern-glow" />
          <path d="M8 38 H52 M12 24 H48 M12 54 H48" stroke="#c9962b" strokeWidth="1.5" opacity=".8" />
          <path d="M30 7 V70" stroke="#c9962b" strokeWidth="1" opacity=".6" />
          <rect x="23" y="70" width="14" height="6" rx="2" fill="#c9962b" />
          <g stroke="#e8730c" strokeWidth="1.6" strokeLinecap="round">
            {[24, 27, 30, 33, 36].map((x) => <line key={x} x1={x} y1="76" x2={x + (x - 30) * 0.3} y2="108" />)}
          </g>
        </g>
      </svg>
    </div>
  )
}

/* ---------- Marigold garland hanging down ---------- */
export function Garland({ flowers = 11, className = '' }) {
  const h = flowers * 22 + 40
  return (
    <div className={`garland ${className}`} aria-hidden="true">
      <svg viewBox={`0 0 30 ${h}`} width="30" height={h}>
        <line x1="15" y1="0" x2="15" y2={h - 30} stroke="#7a4a2a" strokeWidth="1" />
        {Array.from({ length: flowers }, (_, i) => (
          <g key={i} transform={`translate(15 ${14 + i * 22})`}>
            <circle r="11" fill={i % 2 ? '#e8730c' : '#f5a524'} />
            <circle r="7" fill={i % 2 ? '#f5a524' : '#ffc94d'} opacity=".8" />
            <circle r="2.5" fill="#b4520a" opacity=".6" />
          </g>
        ))}
        <path d={`M15 ${h - 32} q-12 14 -4 28 q6 -12 4 -28Z M15 ${h - 32} q12 14 4 28 q-6 -12 -4 -28Z`} fill="#3f7a3a" />
      </svg>
    </div>
  )
}

/* ---------- Diya (clay oil lamp) with flame ---------- */
export function Diya({ size = 110, className = '' }) {
  const id = useId()
  return (
    <div className={`diya ${className}`} aria-hidden="true" style={{ width: size }}>
      <svg viewBox="0 0 120 100" width={size}>
        <defs>
          <radialGradient id={`${id}glow`}>
            <stop offset="0" stopColor="#ffd36b" stopOpacity=".75" />
            <stop offset="1" stopColor="#ffd36b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}flame`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#e8730c" />
            <stop offset="0.55" stopColor="#ffb52e" />
            <stop offset="1" stopColor="#fff6c9" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="36" r="34" fill={`url(#${id}glow)`} className="diya-glow" />
        <path className="flame" d="M60 8 C52 24 50 34 60 44 C70 34 68 24 60 8Z" fill={`url(#${id}flame)`} />
        <path d="M60 22 C57 30 57 36 60 41 C63 36 63 30 60 22Z" fill="#fff8de" className="flame" />
        <path d="M8 52 C20 50 100 50 112 52 C108 80 86 92 60 92 C34 92 12 80 8 52Z" fill="#8a2a1a" />
        <path d="M8 52 C20 50 100 50 112 52 C100 58 20 58 8 52Z" fill="#b4441f" />
        <path d="M18 66 Q60 80 102 66" stroke="#f5a524" strokeWidth="2.5" fill="none" />
        {[30, 45, 60, 75, 90].map((x) => <circle key={x} cx={x} cy={74 + Math.abs(60 - x) * -0.12} r="2.6" fill="#ffc94d" />)}
      </svg>
    </div>
  )
}

/* ---------- Rangoli mandala ---------- */
function petalRing(n, r, len, w, color, offset = 0) {
  return Array.from({ length: n }, (_, i) => (
    <ellipse
      key={i}
      cx="0"
      cy={-(r + len / 2)}
      rx={w}
      ry={len / 2}
      fill={color}
      transform={`rotate(${(360 / n) * i + offset})`}
    />
  ))
}

export function Rangoli({ size = 260, className = '' }) {
  return (
    <div className={`rangoli-wrap ${className}`} aria-hidden="true" style={{ width: size, height: size }}>
      <svg viewBox="-130 -130 260 260" width={size} height={size} className="rangoli">
        {petalRing(12, 62, 56, 20, '#6e1631')}
        {petalRing(12, 62, 40, 12, '#e8730c', 0)}
        {petalRing(12, 40, 44, 16, '#f5a524', 15)}
        {petalRing(16, 22, 26, 7, '#a52a4a', 0)}
        <circle r="26" fill="#fdf6e8" />
        <circle r="20" fill="#c9962b" />
        <circle r="12" fill="#6e1631" />
        <circle r="5" fill="#ffd36b" />
        {Array.from({ length: 24 }, (_, i) => (
          <circle key={i} cx="0" cy="-122" r="3.5" fill="#c9962b" transform={`rotate(${i * 15})`} />
        ))}
      </svg>
    </div>
  )
}

/* ---------- Sparkle stars ---------- */
const rand = seeded(7)
const sparkles = Array.from({ length: 16 }, () => ({
  left: 4 + rand() * 92,
  top: 8 + rand() * 70,
  size: 8 + rand() * 12,
  delay: rand() * 3,
  color: rand() > 0.5 ? '#c9962b' : '#a52a4a',
}))

export function Sparkles() {
  return (
    <div className="sparkles" aria-hidden="true">
      {sparkles.map((s, i) => (
        <svg
          key={i}
          viewBox="-10 -10 20 20"
          className="sparkle"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, '--d': `${s.delay}s` }}
        >
          <path d="M0 -10 L2 -2 L10 0 L2 2 L0 10 L-2 2 L-10 0 L-2 -2Z" fill={s.color} />
        </svg>
      ))}
    </div>
  )
}

/* ---------- Pingxi-style sky lanterns (Taiwan) ---------- */
const rand2 = seeded(21)
const skyLanterns = Array.from({ length: 9 }, (_, i) => ({
  left: 6 + ((i * 11 + rand2() * 8) % 88),
  top: 10 + rand2() * 50,
  size: 22 + rand2() * 20,
  dur: 16 + rand2() * 14,
  delay: -rand2() * 30,
  drift: (rand2() - 0.5) * 80,
}))

export function SkyLanterns() {
  return (
    <div className="sky-lanterns" aria-hidden="true">
      {skyLanterns.map((l, i) => (
        <svg
          key={i}
          viewBox="0 0 40 54"
          className="sky-lantern"
          style={{
            left: `${l.left}%`,
            top: `${l.top}%`,
            width: l.size,
            '--dur': `${l.dur}s`,
            '--delay': `${l.delay}s`,
            '--drift': `${l.drift}px`,
          }}
        >
          <path d="M5 4 Q20 -1 35 4 L30 46 Q20 50 10 46Z" fill="#f08a24" />
          <path d="M9 8 Q20 5 31 8 L27 42 Q20 45 13 42Z" fill="#ffd36b" opacity=".85" />
          <ellipse cx="20" cy="47" rx="7" ry="2.5" fill="#fff1b8" />
          <path d="M8 18 H32 M10 32 H30" stroke="#c0392b" strokeWidth="1.2" opacity=".5" />
        </svg>
      ))}
    </div>
  )
}

/* ---------- Taipei skyline + NTU palm boulevard line art ---------- */
export function TaipeiSkyline({ className = '' }) {
  // Taipei 101: eight stacked flared segments on a podium, plus spire.
  const segs = Array.from({ length: 8 }, (_, i) => {
    const y = 150 - i * 14
    return `M920 ${y} L916 ${y - 14} L964 ${y - 14} L960 ${y}Z`
  }).join(' ')
  const palm = (x, h) =>
    `M${x} 250 Q${x - 4} ${250 - h / 2} ${x} ${250 - h} ` +
    `M${x} ${250 - h} q-22 -4 -34 12 M${x} ${250 - h} q-14 -16 -30 -14 M${x} ${250 - h} q4 -20 -6 -30 ` +
    `M${x} ${250 - h} q14 -16 30 -14 M${x} ${250 - h} q22 -4 34 12`
  return (
    <svg className={`skyline ${className}`} viewBox="0 0 1200 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 210 Q120 150 240 190 T480 180 T720 170 T960 185 T1200 165" opacity=".5" />
        <path d={segs} />
        <path d="M922 162 h36 v88 h-36z M930 178 h20 M930 196 h20 M930 214 h20 M930 232 h20" />
        <path d="M940 38 V8 M934 38 h12" />
        <path d="M300 250 V170 h120 v80 M300 170 l60 -34 l60 34 M318 250 v-40 a14 14 0 0 1 28 0 v40 M374 250 v-40 a14 14 0 0 1 28 0 v40" />
        <path d="M700 250 v-90 h70 v90 M700 160 h70 M712 180 h46 M712 200 h46 M712 220 h46 M790 250 v-60 h60 v60 M802 210 h36 M802 228 h36" />
        <path d="M110 250 v-50 h80 v50 M150 200 v-22 m-12 22 v-14 m24 14 v-14" />
        {[230, 470, 640, 1050, 1150].map((x, i) => <path key={x} d={palm(x, 90 + (i % 2) * 20)} />)}
        <path d="M0 250 H1200" />
      </g>
    </svg>
  )
}

/* ---------- Ornamental divider used around the association name ---------- */
export function Ornament({ children }) {
  return (
    <p className="ornament">
      <span className="ornament__line" aria-hidden="true" />
      <span className="ornament__text">{children}</span>
      <span className="ornament__line" aria-hidden="true" />
    </p>
  )
}
