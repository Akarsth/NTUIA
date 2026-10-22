// Marigold petals drifting down. Positions are fixed so renders stay pure.
const PETALS = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: -((i * 1.7) % 12),
  dur: 9 + ((i * 3) % 7),
  size: 10 + ((i * 5) % 8),
  color: ['#f5a524', '#e8730c', '#ffc94d', '#d6336c'][i % 4],
}))

export default function PetalShower() {
  return (
    <div className="petals" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.65,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  )
}
