import PageHeader from '../components/PageHeader.jsx'
import EventCard from '../components/EventCard.jsx'
import { events } from '../data/events.js'
import { isUpcoming } from '../utils.js'

export default function Events() {
  const upcoming = events.filter((e) => isUpcoming(e.date)).sort((a, b) => a.date.localeCompare(b.date))
  const past = events.filter((e) => !isUpcoming(e.date)).sort((a, b) => b.date.localeCompare(a.date))

  return (
    <>
      <PageHeader title="Events" subtitle="Meetings, workshops, and celebrations." />
      <section className="section">
        <div className="container">
          <h2>Upcoming</h2>
          {upcoming.length ? (
            <div className="stack">{upcoming.map((e) => <EventCard key={e.id} event={e} />)}</div>
          ) : (
            <p>No upcoming events right now.</p>
          )}
        </div>
      </section>
      {past.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <h2>Past events</h2>
            <div className="stack">{past.map((e) => <EventCard key={e.id} event={e} past />)}</div>
          </div>
        </section>
      )}
    </>
  )
}
