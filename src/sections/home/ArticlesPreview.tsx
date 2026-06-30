import { useNavigate } from 'react-router-dom'
import { trpc } from '@/providers/trpc'
import ScrollReveal from '../../components/ScrollReveal'

// Static fallback data
const articlesFallback = [
  {
    id: 1,
    image: '/images/article-1.jpg',
    category: 'GreenFields',
    title: 'GreenFields — טכנולוגיה הולנדית ברמה עולמית',
    excerpt: 'GreenFields מ-Genemuiden הולנד מפתחת טכנולוגיות חדשניות כמו סיבי V-Shape, מערכות Woven, ו-ONE-DNA.',
  },
  {
    id: 2,
    image: '/images/article-2.jpg',
    category: 'התקנה',
    title: 'תהליך התקנת דשא סינתטי — מדריך מלא',
    excerpt: 'התקנת דשא סינתטי איכותי דורשת מקצועיות. התהליך כולל הכנת תשתית, סלילה, חיבור קווים, מילוי ובדיקות איכות.',
  },
  {
    id: 3,
    image: '/images/article-3.jpg',
    category: 'ספורט',
    title: 'FIFA Preferred Provider — מה זה אומר?',
    excerpt: 'הסמכת הספק המועדף של FIFA היא ההסמכה הגבוהה ביותר בתעשייה. עתיד ירוק בע"מ היא אחת מהחברות הבודדות בישראל עם הסמכה זו.',
  },
]

export default function ArticlesPreview() {
  const navigate = useNavigate()

  // Fetch from API, fallback to static
  const { data: apiArticles } = trpc.content.articleList.useQuery()
  const articles = apiArticles && apiArticles.length > 0
    ? apiArticles.slice(0, 3).map(a => ({ id: a.id, image: a.image, category: a.category, title: a.title, excerpt: a.excerpt }))
    : articlesFallback

  return (
    <section className="bg-white section-padding" style={{ direction: 'rtl' }}>
      <div className="content-max">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-heading-xl text-green-900">מאמרים מקצועיים</h2>
          <button
            onClick={() => navigate('/articles')}
            className="font-body text-green-600 link-underline hover:text-green-800 transition-colors bg-transparent border-none cursor-pointer"
          >
            לכל המאמרים &larr;
          </button>
        </div>

        <ScrollReveal stagger={0.12} y={30}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="group cursor-pointer"
                onClick={() => navigate('/articles')}
              >
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                  <img
                    src={article.image || '/images/article-1.jpg'}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 right-3 bg-green-700 text-white font-label text-[0.65rem] px-3 py-1 rounded-lg">
                    {article.category}
                  </span>
                </div>
                <h3 className="font-heading-md text-green-900 mb-2 group-hover:text-green-700 transition-colors">
                  {article.title}
                </h3>
                <p className="font-body-sm text-stone-500 line-clamp-2 mb-3">
                  {article.excerpt}
                </p>
                <span className="font-body-sm text-green-600 link-underline">
                  קרא עוד &larr;
                </span>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
