import { useEffect } from 'react'
import { site } from '../data/site.js'

export default function PageHeader({ title, subtitle }) {
  useEffect(() => {
    document.title = `${title} | ${site.name}`
  }, [title])

  return (
    <section className="page-header">
      <div className="container">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  )
}
