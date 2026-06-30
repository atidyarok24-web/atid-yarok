import { useState } from 'react'
import { trpc } from '@/providers/trpc'
import ScrollReveal from '../components/ScrollReveal'

// Static fallback data
const articlesFallback = [
  { id: 1, title: "GreenFields — טכנולוגיה הולנדית ברמה עולמית", category: "GreenFields", image: "/images/article-1.jpg", excerpt: "GreenFields מ-Genemuiden הולנד מפתחת טכנולוגיות חדשניות כמו סיבי V-Shape, מערכות Woven, ו-ONE-DNA.", content: "GreenFields ממטה ב-Genemuiden שבהולנד היא אחת מחברות הדשא הסינתטי המובילות בעולם. כחברת בת של TenCate Grass, החברה מפתחת טכנולוגיות חדשניות המהוות פריצת דרך בתחום.\n\nסיבי V-Shape פטנטיים — סיבים בצורת V המציעים עמידות יוצאת דופן, גמישות ומראה טבעי כמו דשא אמיתי.\n\nמערכות ארוגות (Woven) — במקום לקבר את הסיבים בשטח, הם ארוגים זה בזה ליצירת מבנה צפוף וחזק יותר.\n\nONE-DNA — מערכת דשא מפולימר יחיד (100% פוליאתילן) המיועדת למיחזור מלא.", date: "15 בינואר 2026" },
  { id: 2, title: "תהליך התקנת דשא סינתטי — מדריך מלא", category: "התקנה", image: "/images/article-2.jpg", excerpt: "התקנת דשא סינתטי איכותי דורשת מקצועיות. התהליך כולל הכנת תשתית, סלילה, חיבור קווים, מילוי ובדיקות איכות.", content: "התקנת דשא סינתטי איכותי היא תהליך מקצועי הדורש ניסיון וידע.\n\nשלב 1: הכנת התשתית — פינוי השטח, יצירת שיפועים לניקוז מים, והנחת שכבות בסיס.\n\nשלב 2: הנחת הדשא — סלילת יריעות הדשא בכיוון אחיד.\n\nשלב 3: חיבור קווים — שימוש בדבק מקצועי וסרטי חיבור.\n\nשלב 4: מילוי — פיזור גומי או חול באופן אחיד.\n\nשלב 5: בדיקות איכות — בדיקות מעבדה מוסמכות.", date: "8 בינואר 2026" },
  { id: 3, title: "FIFA Preferred Provider — מה זה אומר?", category: "ספורט", image: "/images/article-3.jpg", excerpt: "הסמכת הספק המועדף של FIFA היא ההסמכה הגבוהה ביותר בתעשייה. עתיד ירוק בעמ היא אחת מהחברות הבודדות בישראל עם הסמכה זו.", content: "הסמכת FIFA Preferred Provider היא ההסמכה הגבוהה ביותר שחברת דשא סינתטי יכולה לקבל. רק חברות בודדות בעולם זכו בה.\n\nמה כוללת ההסמכה?\n• בדיקות מעבדה מוסמכות (Sports Labs, Labosport) לכל המוצרים\n• עמידה בתקני FIFA Quality Pro\n• ניסיון בהקמת מגרשים ברמה בינלאומית\n• שותפות עם יצרן מוכר ומאושר\n\nעתיד ירוק בעמ היא אחת מהחברות הבודדות בישראל עם הסמכה זו, עם למעלה מ-27 מגרשים מאושרי FIFA ברחבי הארץ.", date: "2 בינואר 2026" },
  { id: 4, title: "Pure PT — דשא ללא מילוי מבית GreenFields", category: "מוצרים", image: "/images/product-lounge.jpg", excerpt: "Pure PT של GreenFields הוא מערכת דשא מהפכנית ללא צורך במילוי גומי. ביצועים ברמה עלית עם תחזוקה מינימלית.", content: "Pure PT של GreenFields הוא מערכת דשא מהפכנית ללא צורך במילוי גומי. הדשא מציע ביצועים ברמה עלית עם תחזוקה מינימלית.\n\nיתרונות מרכזיים:\n• ביצועים מקצועיים ללא מילוי\n• נוחות שחקן מקסימלית\n• בקרת כדור מיטבית\n• עמידות יוצאת דופן\n• 100% ממוחזר\n\nאידיאלי למגרשי קהילה, בתי ספר ושטחים ציבוריים.", date: "20 בדצמבר 2025" },
  { id: 5, title: "ONE-DNA — העתיד הירוק של הדשא הסינתטי", category: "קיימות", image: "/images/installation-11.jpg", excerpt: "ONE-DNA של GreenFields הוא מערכת דשא בעלת פולימר יחיד (100% פוליאתילן) המיועדת למיחזור מלא.", content: "ONE-DNA של GreenFields הוא מערכת דשא בעלת פולימר יחיד (100% פוליאתילן) המיועדת למיחזור מלא. ללא ציפויים או פסולת — צעד ברור לקראת עיצוב מעגלי וקיימות סביבתית.\n\nבניגוד לדשא סינתטי רגיל המכיל שילוב של חומרים שונים, ONE-DNA בנוי מפוליאתילן אחד בלבד.\n\nהמשמעות: בסוף חיי הדשא ניתן למחזר אותו במלואו — ללא פסולת.", date: "12 בדצמבר 2025" },
  { id: 6, title: "סיבי V-Shape — הטכנולוגיה שמשנה את כללי המשחק", category: "טכנולוגיה", image: "/images/grass-closeup.jpg", excerpt: "סיבי V-Shape הפטנטיים של GreenFields מציעים עמידות יוצאת דופן, גמישות ומראה טבעי כמו דשא אמיתי.", content: "סיבי V-Shape הפטנטיים של GreenFields מציעים עמידות יוצאת דופן, גמישות ומראה טבעי כמו דשא אמיתי.\n\nהצורה הייחודית של סיב ה-V מאפשרת לסיב לחזור למצבו המקורי גם לאחר לחץ כבד. בניגוד לסיבים רגילים שנשארים שטוחים לאורך זמן, סיבי ה-V מתאוששים בכל פעם.\n\nיתרונות:\n• עמידות מוגברת לשחיקה\n• מראה טבעי לאורך זמן\n• ביצועי משחק עקביים\n• חיים ארוכים יותר למגרש", date: "5 בדצמבר 2025" },
]

export default function ArticlesPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  // Fetch from API, fallback to static
  const { data: apiArticles, isLoading } = trpc.content.articleList.useQuery()
  const articles = apiArticles && apiArticles.length > 0 ? apiArticles : articlesFallback

  const selectedArticle = articles.find(a => a.id === selectedId)

  if (selectedArticle) {
    return (
      <div style={{ direction: 'rtl' }}>
        <section className="bg-gradient-to-bl from-green-900 to-green-700 min-h-[40vh] flex items-center justify-center py-16 relative">
          <button onClick={() => setSelectedId(null)} className="absolute top-6 right-6 text-white/80 hover:text-white font-body-sm flex items-center gap-2 bg-transparent border-none cursor-pointer">
            <span>חזרה למאמרים</span><span>&rarr;</span>
          </button>
          <div className="text-center max-w-[800px] px-4">
            <span className="font-label text-green-400 mb-3 block">{selectedArticle.category}</span>
            <h1 className="font-display-sm text-white mb-4">{selectedArticle.title}</h1>
            <p className="font-body-lg text-green-200">{selectedArticle.date}</p>
          </div>
        </section>

        <section className="bg-white section-padding">
          <div className="content-max max-w-[800px]">
            <div className="rounded-xl overflow-hidden mb-8">
              <img src={selectedArticle.image || '/images/article-1.jpg'} alt={selectedArticle.title} className="w-full h-auto object-cover" />
            </div>
            <div className="font-body text-stone-700 leading-relaxed whitespace-pre-line text-right">{selectedArticle.content}</div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div style={{ direction: 'rtl' }}>
      <section className="bg-gradient-to-bl from-green-900 to-green-700 min-h-[40vh] flex items-center justify-center py-16">
        <div className="text-center">
          <h1 className="font-display text-white mb-4">מאמרים מקצועיים</h1>
          <p className="font-body-lg text-green-200">מידע שימושי על דשא סינתטי, טכנולוגיה וקיימות</p>
        </div>
      </section>

      {isLoading && (
        <div className="text-center py-10">
          <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="font-body text-stone-500">טוען מאמרים...</p>
        </div>
      )}

      <section className="bg-white section-padding">
        <div className="content-max">
          <ScrollReveal stagger={0.1}>
            <div className="space-y-0 divide-y divide-cream-200">
              {articles.map((article) => (
                <article key={article.id} className="py-8 flex flex-col md:flex-row gap-6 group cursor-pointer" onClick={() => setSelectedId(article.id)}>
                  <div className="w-full md:w-[200px] h-[140px] rounded-xl overflow-hidden flex-shrink-0">
                    <img src={article.image || '/images/article-1.jpg'} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="flex-1">
                    <span className="font-label text-green-700 text-[0.65rem] mb-2 block">{article.category}</span>
                    <h3 className="font-heading-md text-green-900 mb-2 group-hover:text-green-700 transition-colors">{article.title}</h3>
                    <p className="font-body text-stone-500 line-clamp-2 mb-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-body-sm text-stone-400">{article.date}</span>
                      <span className="font-body-sm text-green-600 link-underline">קרא עוד &larr;</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
