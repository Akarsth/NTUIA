import PageHeader from '../components/PageHeader.jsx'
import NewsCard from '../components/NewsCard.jsx'
import { news } from '../data/news.js'

export default function News() {
  return (
    <>
      <PageHeader title="News" subtitle="Announcements and stories from our community." />
      <section className="section">
        <div className="container grid grid--2">
          {news.map((n) => <NewsCard key={n.id} post={n} />)}
        </div>
      </section>
    </>
  )
}
