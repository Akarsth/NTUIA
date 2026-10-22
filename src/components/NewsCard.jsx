import { formatDate } from '../utils.js'

export default function NewsCard({ post }) {
  return (
    <article className="card news-card">
      <span className="badge">{post.category}</span>
      <h3>{post.title}</h3>
      <p className="meta"><time dateTime={post.date}>{formatDate(post.date)}</time></p>
      <p>{post.excerpt}</p>
    </article>
  )
}
