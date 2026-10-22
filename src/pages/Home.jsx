import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../data/site.js'
import { events } from '../data/events.js'
import { news } from '../data/news.js'
import { isUpcoming } from '../utils.js'
import EventCard from '../components/EventCard.jsx'
import NewsCard from '../components/NewsCard.jsx'

const highlights = [
  { title: 'Community', text: 'A welcoming network of members, alumni, and friends who support one another.' },
  { title: 'Events', text: 'Workshops, cultural celebrations, and networking evenings throughout the year.' },
  { title: 'Growth', text: 'Mentorship, scholarships, and career resources to help members thrive.' },
]

export default function Home() {
  useEffect(() => { document.title = `${site.name} | ${site.tagline}` }, [])

  const upcoming = events
    .filter((e) => isUpcoming(e.date))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3)

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <p className="eyebrow">Welcome to {site.name}</p>
          <h1>{site.tagline}</h1>
          <p className="hero__lead">
            Since {site.founded}, {site.name} has brought people together to learn, celebrate, and give back.
          </p>
          <div className="hero__actions">
            <Link to="/events" className="btn btn--accent">Upcoming events</Link>
            <Link to="/about" className="btn btn--ghost">Learn more</Link>
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
