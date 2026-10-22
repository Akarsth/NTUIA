import { Link } from 'react-router-dom'
import { navLinks, site } from '../data/site.js'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <div className="brand brand--light">
            <img src="/logo.svg" alt="" width="32" height="32" />
            <span>{site.name}</span>
          </div>
          <p className="footer__tagline">{site.tagline}</p>
        </div>
        <div>
          <h3>Quick links</h3>
          <ul>
            {navLinks.map((l) => (
              <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li>{site.phone}</li>
            <li>{site.address}</li>
          </ul>
        </div>
        <div>
          <h3>Follow us</h3>
          <ul>
            {site.social.map((s) => (
              <li key={s.label}><a href={s.url} target="_blank" rel="noreferrer">{s.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">© {year} {site.fullName}. All rights reserved.</div>
      </div>
    </footer>
  )
}
