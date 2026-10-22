import { formatDate } from '../utils.js'

export default function EventCard({ event, past = false }) {
  const d = new Date(`${event.date}T00:00:00`)
  return (
    <article className={`card event-card ${past ? 'is-past' : ''}`}>
      <div className="event-card__date" aria-hidden="true">
        <span className="day">{d.getDate()}</span>
        <span className="month">{d.toLocaleDateString('en-GB', { month: 'short' })}</span>
      </div>
      <div>
        <h3>{event.title}</h3>
        <p className="meta">
          <time dateTime={event.date}>{formatDate(event.date)}</time> · {event.time} · {event.location}
        </p>
        <p>{event.description}</p>
      </div>
    </article>
  )
}
