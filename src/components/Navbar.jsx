import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks, site } from '../data/site.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)


  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)} aria-label={`${site.name} home`}>
          <img src="/logo.svg" alt="" width="36" height="36" />
          <span>{site.name}</span>
        </Link>
        <button
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
        <nav id="primary-nav" className={`navbar__links ${open ? 'is-open' : ''}`}>
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
