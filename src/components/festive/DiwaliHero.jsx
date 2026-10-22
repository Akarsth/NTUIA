import { Link } from 'react-router-dom'
import { useMotion } from '../../motion/effects.js'
import { Diya, Garland, Lantern, Ornament, Rangoli, SkyLanterns, Sparkles, StringLights, TaipeiSkyline } from './Decorations.jsx'
import Fireworks from './Fireworks.jsx'
import PetalShower from './PetalShower.jsx'

export default function DiwaliHero() {
  const motion = useMotion()

  return (
    <section className="dhero">
      <div className="dhero__glow" aria-hidden="true" />
      <TaipeiSkyline className="dhero__skyline" />
      <SkyLanterns />
      <Sparkles />
      {motion.has('fireworks') && <Fireworks />}
      <StringLights />

      <div className="dhero__hangers dhero__hangers--left" aria-hidden="true">
        <Garland flowers={9} />
        <Lantern length={36} />
        <Garland flowers={6} className="hide-sm" />
        <Lantern length={86} color="#8a2440" className="hide-sm" />
      </div>
      <div className="dhero__hangers dhero__hangers--right" aria-hidden="true">
        <Lantern length={86} color="#8a2440" className="hide-sm" />
        <Garland flowers={6} className="hide-sm" />
        <Lantern length={36} />
        <Garland flowers={9} />
      </div>

      <Rangoli className="dhero__rangoli dhero__rangoli--left" />
      <Rangoli className="dhero__rangoli dhero__rangoli--right" />

      <div className="container dhero__content">
        <Ornament>NTU India Association</Ornament>
        <h1 className="dhero__title">Jashn-e-Diwali 2026</h1>
        <p className="dhero__script">Festival of Lights in Taipei</p>
        <p className="dhero__lead">
          Celebrate Diwali with the Indian community at National Taiwan University. Join us for diyas,
          rangoli, music, dance, and food, and bring your friends from every corner of Taiwan.
        </p>
        <div className="dhero__actions">
          <Link to="/contact" className="btn btn--primary">Volunteer with us</Link>
          <Link to="/events" className="btn btn--outline">Event details</Link>
        </div>
      </div>

      <Diya className="dhero__diya dhero__diya--left" />
      <Diya className="dhero__diya dhero__diya--right" />
      {motion.has('petals') && <PetalShower />}
    </section>
  )
}
