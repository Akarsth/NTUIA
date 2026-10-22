import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../data/site.js'
import { events } from '../data/events.js'
import { news } from '../data/news.js'
import { isUpcoming } from '../utils.js'
import EventCard from '../components/EventCard.jsx'
import DiwaliHero from '../components/festive/DiwaliHero.jsx'
import NewsCard from '../components/NewsCard.jsx'

const highlights = [
  { title: 'Community', text: 'A home away from home for Indian students, researchers, and friends at NTU.' },
  { title: 'Celebrations', text: 'Diwali, Holi, Independence Day, and cultural nights shared with all of Taiwan.' },
  { title: 'Support', text: 'Help with settling in Taipei, academics, careers, and everyday life in Taiwan.' },
]

export default function Home() {
  useEffect(() => { document.title = `${site.name} | ${site.tagline}` }, [])

  const upcoming = events
    .filter((e) => isUpcoming(e.date))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3)

  return (
    <>
      <DiwaliHero />

      <section className="section section--alt">
        <div className="container banner-feature">
          <img
            src="/images/jashn-e-diwali-2026.webp"
            alt="NTU India Association, Jashn-e-Diwali 2026: Call for Volunteers"
            width="1638"
            height="574"
          />
          <div className="banner-feature__text">
            <p className="script-accent">Be part of the celebration</p>
            <p>Help with decorations, rangoli, food, performances, or hosting. Every pair of hands makes the night brighter.</p>
            <Link to="/contact" className="btn btn--primary">Sign up to volunteer</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid--3">
          {highlights.map((h) => (
            <div key={h.title} className="card feature">
              <h3>{h.title}</h3>
              <p>{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section__head">
            <h2>Upcoming events</h2>
            <Link to="/events">View all →</Link>
          </div>
          {upcoming.length ? (
            <div className="stack">{upcoming.map((e) => <EventCard key={e.id} event={e} />)}</div>
          ) : (
            <p>No upcoming events right now. Check back soon.</p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2>Latest news</h2>
            <Link to="/news">All news →</Link>
          </div>
          <div className="grid grid--3">
            {news.slice(0, 3).map((n) => <NewsCard key={n.id} post={n} />)}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Want to get involved?</h2>
          <p>Become a member, volunteer at an event, or simply say hello.</p>
          <Link to="/contact" className="btn btn--accent">Contact us</Link>
        </div>
      </section>
    </>
  )
}
