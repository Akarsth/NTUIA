import { useEffect, useRef } from 'react'

const COLORS = ['#f5a524', '#e8730c', '#c9962b', '#a52a4a', '#d6336c', '#ffc94d']

// Lightweight canvas fireworks. Pauses when the tab is hidden.
export default function Fireworks() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let particles = []
    let raf = 0
    let nextBurst = 0
    let w = 0
    let h = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const burst = () => {
      const x = w * (0.12 + Math.random() * 0.76)
      const y = h * (0.12 + Math.random() * 0.35)
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const n = 38 + Math.floor(Math.random() * 20)
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n
        const v = 1.6 + Math.random() * 2.2
        particles.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, color })
      }
    }

    const tick = (t) => {
      if (t > nextBurst) {
        burst()
        nextBurst = t + 900 + Math.random() * 900
      }
      ctx.clearRect(0, 0, w, h)
      particles = particles.filter((p) => p.life > 0)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.035
        p.vx *= 0.985
        p.vy *= 0.985
        p.life -= 0.01
        ctx.globalAlpha = Math.max(p.life, 0)
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2.8, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }

    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} className="fireworks" aria-hidden="true" />
}
