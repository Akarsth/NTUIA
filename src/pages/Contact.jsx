import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import { site } from '../data/site.js'

// No backend: the form opens the visitor's email app with the message pre-filled.
// To receive submissions without email apps, swap this for a form service such as Formspree.
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(form.subject || 'Website enquiry')}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <PageHeader title="Contact us" subtitle="We would love to hear from you." />
      <section className="section">
        <div className="container grid grid--2 contact">
          <div className="card">
            <h2>Get in touch</h2>
            <dl className="contact__list">
              <dt>Email</dt>
              <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
              <dt>Phone</dt>
              <dd>{site.phone}</dd>
              <dt>Address</dt>
              <dd>{site.address}</dd>
            </dl>
          </div>
          <form className="card form" onSubmit={submit}>
            <h2>Send a message</h2>
            <label>Name<input name="name" value={form.name} onChange={update} required autoComplete="name" /></label>
            <label>Email<input type="email" name="email" value={form.email} onChange={update} required autoComplete="email" /></label>
            <label>Subject<input name="subject" value={form.subject} onChange={update} /></label>
            <label>Message<textarea name="message" rows="5" value={form.message} onChange={update} required /></label>
            <button type="submit" className="btn btn--primary">Send message</button>
          </form>
        </div>
      </section>
    </>
  )
}
