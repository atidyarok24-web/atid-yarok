import { useState } from 'react'
import { Link } from 'react-router-dom'
import { trpc } from '@/providers/trpc'
import SectionHeader from '../components/SectionHeader'
import ScrollReveal from '../components/ScrollReveal'

type Category = 'הכל' | 'כדורגל' | 'הוקי' | 'רב-תכליתי' | 'ללא מילוי' | 'בסיס'

const categories: Category[] = ['הכל', 'כדורגל', 'הוקי', 'רב-תכליתי', 'ללא מילוי', 'בסיס']

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

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('הכל')

  // Fetch from API first, fallback to static
  const { data: apiProducts, isLoading } = trpc.content.productList.useQuery()
  const products = apiProducts && apiProducts.length > 0 ? apiProducts : fallbackProducts

  const filtered = activeFilter === 'הכל'
    ? products
    : products.filter(p => p.category === activeFilter)

  return (
    <div style={{ direction: 'rtl' }}>
      <section className="bg-gradient-to-bl from-green-950 to-green-800 min-h-[50vh] flex items-center justify-center py-20">
        <div className="text-center">
          <SectionHeader label="קו מוצרים" heading="מוצרי GreenFields" body="מערכות דשא סינתטי מהמתקדמות בעולם — ישירות מהולנד" centered light />
        </div>
      </section>

      <section className="bg-cream-50 section-padding">
        <div className="content-max">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-5 py-2 rounded-full font-button text-sm transition-all ${activeFilter === cat ? 'bg-green-700 text-white' : 'bg-transparent border border-green-700 text-green-700 hover:bg-green-700 hover:text-white'}`}>
                {cat}
              </button>
            ))}
          </div>

          {isLoading && (
            <div className="text-center py-10">
              <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="font-body text-stone-500">טוען מוצרים...</p>
            </div>
          )}

          <ScrollReveal stagger={0.08}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 block"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={product.image || '/images/grass-closeup.jpg'} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <span className="font-label text-green-700 text-[0.65rem]">{product.category}</span>
                    <h3 className="font-heading-md text-green-900 mb-2">{product.name}</h3>
                    <p className="font-body-sm text-stone-500 line-clamp-3 mb-3">{product.description}</p>
                    <p className="font-body-sm text-stone-400 mb-4">{product.specs}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {(product.features as string[]).map((f, j) => (
                        <span key={j} className="bg-green-50 text-green-700 font-body-sm text-xs px-2.5 py-1 rounded-full">{f}</span>
                      ))}
                    </div>
                    <span className="font-body-sm text-green-600 mt-3 block link-underline">קרא עוד &larr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
