import PageHeader from '../components/PageHeader.jsx'
import { site } from '../data/site.js'

const team = [
  { name: 'Member Name', role: 'President' },
  { name: 'Member Name', role: 'Vice President' },
  { name: 'Member Name', role: 'Secretary' },
  { name: 'Member Name', role: 'Treasurer' },
]

const values = [
  { title: 'Inclusion', text: 'Everyone is welcome, and every voice matters.' },
  { title: 'Service', text: 'We give back to our members and the wider community.' },
  { title: 'Excellence', text: 'We aim for quality in everything we organise.' },
  { title: 'Integrity', text: 'We act transparently and responsibly.' },
]

function initials(name) {
  return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()
}

export default function About() {
  return (
    <>
      <PageHeader title="About us" subtitle={`Who we are and what ${site.name} stands for.`} />

      <section className="section">
        <div className="container grid grid--2">
          <div className="card">
            <h2>Our mission</h2>
            <p>
              {site.fullName} exists to build a strong, supportive community through events,
              knowledge sharing, and service. Replace this text with NTUIA’s official mission statement.
            </p>
          </div>
          <div className="card">
            <h2>Our vision</h2>
            <p>
              A connected network where every member can grow personally and professionally,
              and contribute positively to society. Replace with the official vision.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <h2>Our values</h2>
          <div className="grid grid--4">
            {values.map((v) => (
              <div key={v.title} className="card feature">
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Executive committee</h2>
          <div className="grid grid--4">
            {team.map((m) => (
              <div key={m.role} className="card team-card">
                <div className="avatar" aria-hidden="true">{initials(m.role)}</div>
                <h3>{m.name}</h3>
                <p className="meta">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
