import { useParams, Link } from 'react-router-dom'
import { trpc } from '@/providers/trpc'
import { FaArrowRight, FaCheck } from 'react-icons/fa'
import ScrollReveal from '../components/ScrollReveal'

// Static fallback data
const fallbackProducts = [
  { id: 1, name: "MF Elite", category: "כדורגל", image: "/images/grass-closeup.jpg", description: "מוצר רב-סיבי (Multi-Fibre) המשלב עמידות יוצאת דופן עם מניעת דליפת מילוי. סיבי מונופילמנט בצורת יהלום משולבים עם סיבי טייפ (Tape) פטנטיים לביצועים מקצועיים ברמה הגבוהה ביותר.", specs: "סוג: מילוי גומי | ספורט: כדורגל, רוגבי, פוטבול אמריקאי | FIFA: Preferred", features: ["סיבי יהלום עמידים לשחיקה", "מניעת דליפת מילוי", "מראה טבעי בגוון דו-צבעי", "100% ממוחזר ל-RTA"] },
  { id: 2, name: "MX Range", category: "כדורגל", image: "/images/installation-3.jpg", description: "מערכת ארוגה (Woven) מתקדמת לשחקנים מקצועיים. הסיבים ארוגים זה בזה ליצירת מבנה צפוף וחזק יותר.", specs: "טכנולוגיה: ארוגה (Woven) | ספורט: כדורגל | מילוי: Ultra Low", features: ["בנייה ארוגה ליציבות מקסימלית", "מראה טבעי ירוק וסמיך", "משטח רך ונעים לשחקן", "ביצועי כדור עקביים"] },
  { id: 3, name: "Pure PT", category: "ללא מילוי", image: "/images/product-lounge.jpg", description: "מערכת מהפכנית ללא מילוי (Non-Infill) לכדורגל. מציעה ביצועים ברמה עלית עם תחזוקה מינימלית.", specs: "סוג: ללא מילוי | ספורט: כדורגל | מיחזור: 100%", features: ["ביצועים מקצועיים ללא מילוי", "נוחות שחקן מקסימלית", "בקרת כדור מיטבית", "עמידות יוצאת דופן"] },
  { id: 4, name: "Slide Max Pro NF", category: "ללא מילוי", image: "/images/product-supergreen.jpg", description: "מערכת ללא מילוי ידידותית לסביבה ועמידה. סיבי Diamond Shape עמידים לשחיקה.", specs: "סוג: ללא מילוי | ספורט: כדורגל, הוקי, בייסבול | מיחזור: 100%", features: ["מראה טבעי ללא מילוי", "קל להתקנה ותחזוקה", "אידיאלי למגרשים קטנים ומקורים", "100% ממוחזר ל-RTA"] },
  { id: 5, name: "Apollo", category: "רב-תכליתי", image: "/images/installation-8.jpg", description: "מוצר כניסה (Entry-Level) המשלב עמידות יוצאת דופן למחיר עם מראה טבעי.", specs: "סוג: מילוי | ספורט: רב-תכליתי | רמת מחיר: כניסה", features: ["עמידות יוצאת דופן", "מראה טבעי", "תחזוקה מינימלית", "מחיר תחרותי"] },
  { id: 6, name: "DT Range", category: "כדורגל", image: "/images/installation-1.jpg", description: "טכנולוגיית Double-Tuft של GreenFields לעמידות קיצונית. שני קברים לכל סיב.", specs: "טכנולוגיה: Double-Tuft | ספורט: כדורגל | עמידות: קיצונית", features: ["עמידות קיצונית לשחיקה", "מבנה צפוף ויציב", "ביצועים עקביים לאורך זמן", "תחזוקה מינימלית"] },
  { id: 7, name: "ONE-DNA", category: "כדורגל", image: "/images/product-roof.jpg", description: "מערכת דשא מפולימר יחיד (100% פוליאתילן) המיועדת למיחזור מלא. ללא ציפויים או פסולת.", specs: "חומר: פוליאתילן יחיד | מיחזור: 100% | קיימות: מקסימלית", features: ["פולימר יחיד — מיחזור מלא", "ללא פסולת", "פליטת CO2 מינימלית", "עתיד ירוק"] },
  { id: 8, name: "Pure EP", category: "הוקי", image: "/images/installation-12.jpg", description: "מערכת Dry Turf מאושרת FIH למשחקי הוקי ברמה הגבוהה ביותר — ללא צורך בהשקיה.", specs: "סוג: Dry Turf | תקן: FIH | ספורט: הוקי", features: ["מאושר FIH ללא השקיה", "מהירות כדור גבוהה", "שליטה מיטבית בכדור", "חיסכון במים"] },
  { id: 9, name: "TX Range", category: "הוקי", image: "/images/installation-4.jpg", description: "משטחי הוקי מבוססי חול ומים של GreenFields.", specs: "סוג: חול / מים | תקן: FIH Global | ספורט: הוקי", features: ["בקרת כדור אולטימטיבית", "תקן FIH Global", "משטח מים חסכוני", "ביצועים מקצועיים"] },
  { id: 10, name: "Ecocept Base", category: "בסיס", image: "/images/installation-7.jpg", description: "שכבת בסיס חדשנית מסוג Porous Pavement שפותחה במיוחד לשימוש מתחת למשטחי דשא סינתטי.", specs: "סוג: שכבת בסיס | שימוש: מתחת לדשא סינתטי | ניקוז: מעולה", features: ["ניקוז מים מעולה", "יציבות מבנית", "בידוד תרמי", "קל להתקנה"] },
  { id: 11, name: "XtraGrass", category: "כדורגל", image: "/images/hero-fallback.jpg", description: "מערכת היברידית המשלבת דשא טבעי עם דשא סינתטי. טבעי פוגש עמיד.", specs: "סוג: היברידי | ספורט: כדורגל | מראה: טבעי", features: ["משחק טבעי אותנטי", "יותר שעות משחק", "פחות שחיקה", "שילוב מושלם"] },
  { id: 12, name: "PE", category: "רב-תכליתי", image: "/images/installation-6.jpg", description: "מערכת דשא מבוססת טכנולוגיית XT Polymer המספקת עמידות מוגברת וחיים ארוכים.", specs: "טכנולוגיה: XT Polymer | סוג: מבוסס חול | עמידות: מוגברת", features: ["טכנולוגיית XT Polymer", "עמידות מוגברת", "חיים ארוכים", "בסיס חול יעיל"] },
]

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const productId = parseInt(id || '0')

  // Try API first, fallback to static
  const { data: apiProduct } = trpc.content.productGet.useQuery({ id: productId }, { enabled: productId > 0 })
  const { data: apiProducts } = trpc.content.productList.useQuery()

  const product = apiProduct || (apiProducts || fallbackProducts).find(p => p.id === productId) || fallbackProducts[0]

  // Related products (same category, excluding current)
  const related = (apiProducts || fallbackProducts).filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

  if (!product) {
    return (
      <div style={{ direction: 'rtl' }} className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display-sm text-green-900 mb-4">מוצר לא נמצא</h1>
          <Link to="/products" className="text-green-600 font-body hover:underline">חזרה לקו מוצרים</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ direction: 'rtl' }}>
      {/* Hero */}
      <section className="bg-gradient-to-bl from-green-950 to-green-800 min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to left, rgba(2,44,34,0.9) 0%, rgba(2,44,34,0.7) 60%, transparent 100%)' }} />
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${product.image})` }} />
        <div className="relative z-10 content-max w-full px-4 py-24">
          <div className="max-w-[600px]">
            <Link to="/products" className="font-body-sm text-green-400 hover:text-green-300 flex items-center gap-2 mb-4">
              <FaArrowRight /> חזרה לקו מוצרים
            </Link>
            <span className="font-label text-green-400 block mb-3"><span className="text-green-500 mr-1">&#9679;</span>{product.category}</span>
            <h1 className="font-display-sm text-white mb-4">{product.name}</h1>
            <p className="font-body-lg text-white/85">{product.description.slice(0, 120)}...</p>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="bg-cream-50 section-padding">
        <div className="content-max">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10">
            {/* Image */}
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
              </div>
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal delay={0.2}>
              <div>
                <span className="font-label text-green-700">{product.category}</span>
                <h2 className="font-heading-lg text-green-900 mt-2 mb-4">{product.name}</h2>
                <p className="font-body text-stone-600 mb-6 leading-relaxed">{product.description}</p>

                <div className="bg-green-50 rounded-xl p-4 mb-6 border border-green-100">
                  <h3 className="font-heading-sm text-green-800 mb-2">מפרט טכני</h3>
                  <p className="font-body-sm text-stone-600">{product.specs}</p>
                </div>

                <h3 className="font-heading-sm text-green-800 mb-3">יתרונות</h3>
                <div className="space-y-2">
                  {(product.features as string[]).map((f, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <FaCheck className="text-green-600 mt-1 flex-shrink-0" />
                      <span className="font-body text-stone-600">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link to="/contact" className="bg-green-700 text-white px-8 py-3.5 rounded-full font-button hover:bg-green-800 hover:shadow-glow transition-all inline-block">
                    בקשו הצעת מחיר למוצר זה
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="bg-white section-padding border-t border-cream-200">
          <div className="content-max">
            <h2 className="font-heading-lg text-green-900 mb-8">מוצרים נוספים בקטגוריה</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(r => (
                <Link key={r.id} to={`/product/${r.id}`} className="bg-cream-50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <span className="font-label text-green-700 text-[0.6rem]">{r.category}</span>
                    <h4 className="font-heading-sm text-green-900">{r.name}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
