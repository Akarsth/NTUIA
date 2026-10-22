export function formatDate(iso, opts = { day: 'numeric', month: 'long', year: 'numeric' }) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', opts)
}

export function isUpcoming(iso) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(`${iso}T00:00:00`) >= today
}
