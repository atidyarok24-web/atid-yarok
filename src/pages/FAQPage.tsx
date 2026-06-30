import { useState } from 'react'
import { trpc } from '@/providers/trpc'
import ScrollReveal from '../components/ScrollReveal'

// Static fallback data
const faqFallback = [
  { id: 1, question: "כמה זמן מחזיק דשא סינתטי איכותי?", answer: "דשא סינתטי איכותי מבית GreenFields מחזיק מעמד 15-20 שנה ויותר. הדשאים שלנו מגיעים עם אחריות יצרן של 5-8 שנים, וכל המוצרים עוברים בדיקות מעבדה מוסמכות (Sports Labs, Labosport) לפני התקנה." },
  { id: 2, question: "מה ההבדל בין דשא ארוג (Woven) לדשא רגיל?", answer: "דשא ארוג (Woven) כמו מערכות MX Elite של GreenFields מציע עמידות גבוהה יותר, ביצועי משחק משופרים ופחות דליפת מילוי. האריגה הייחודית מונעת הפרדה של סיבים ומאריכה את חיי הדשא. זוהי הטכנולוגיה המתקדמת ביותר כיום." },
  { id: 3, question: "האם הדשא מתחמם בשמש הישראלית?", answer: "הדשאים של GreenFields פותחו עם טכנולוגיות מיוחדות שמפחיתות התחממות. סיבי V-Shape והמבנה הארוג מאפשרים זרימת אוויר טובה יותר. בנוסף, מערכות ללא מילוי כמו Pure PT מציעות פתרון קריר יותר." },
  { id: 4, question: "מהי הסמכת FIFA Preferred Provider?", answer: "FIFA Preferred Provider היא ההסמכה הגבוהה ביותר שחברת דשא סינתטי יכולה לקבל. עתיד ירוק בעמ היא אחת מהחברות הבודדות בישראל עם הסמכה זו. הסמכה זו מאפשרת לנו להתקין מגרשים לליגות הלאומיות והבינלאומיות." },
  { id: 5, question: "האם צריך לתחזק את הדשא הסינתטי?", answer: "דשא סינתטי דורש תחזוקה מינימלית בהשוואה לדשא טבעי — ניקוי עלים ולכלוך מדי פעם, והברשה. אין צורך בהשקיה, כיסוח או דישון. מערכות ללא מילוי כמו Pure PT דורשות תחזוקה אפילו פחותה." },
  { id: 6, question: "מה זה ONE-DNA ולמה זה חשוב?", answer: "ONE-DNA של GreenFields הוא מערכת דשא מפולימר יחיד (100% פוליאתילן) המיועדת למיחזור מלא בסוף חייו. בניגוד לדשא רגיל המכיל שילוב של חומרים שונים, ONE-DNA מאפשר מחזוריות מלאה — צעד משמעותי לקראת קיימות סביבתית." },
  { id: 7, question: "האם ניתן להתקין דשא על גג או מרפסת?", answer: "בהחלט! יש לנו מערכות ייעודיות לגגות ומרפסות עם מערכת ניקוז מתקדמת. הדשא קל משקל, עמיד לתנאי מזג האוויר בישראל, ומציע פתרון ירוק אידיאלי למרחבים עירוניים." },
  { id: 8, question: "כמה זמן לוקחת התקנה של מגרש כדורגל?", answer: "התקנה של מגרש כדורגל סטנדרטי נמשכת כ-30-60 ימי עבודה, תלוי בגודל השטח, במורכבות התשתית ובתנאי השטח. אנו מלווים את הלקוח מהתכנון ועד הבדיקות הסופיות עם מעבדה מוסכת." },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  // Fetch from API, fallback to static
  const { data: apiFaq, isLoading } = trpc.content.faqList.useQuery()
  const faq = apiFaq && apiFaq.length > 0 ? apiFaq : faqFallback

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <div style={{ direction: 'rtl' }}>
      <section className="bg-green-950 min-h-[40vh] flex items-center justify-center py-16">
        <div className="text-center">
          <h1 className="font-display text-white mb-4">שאלות ותשובות</h1>
          <p className="font-body-lg text-green-300">כל מה שרציתם לדעת על דשא סינתטי</p>
        </div>
      </section>

      {isLoading && (
        <div className="text-center py-10">
          <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="font-body text-stone-500">טוען שאלות...</p>
        </div>
      )}

      <section className="bg-cream-50 section-padding">
        <div className="content-max max-w-[800px]">
          <ScrollReveal stagger={0.08}>
            <div className="space-y-3">
              {faq.map((item, i) => (
                <div key={item.id} className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all ${openIndex === i ? 'border-r-4 border-green-700' : ''}`}>
                  <button onClick={() => toggle(i)} className="w-full flex items-center justify-between p-5 text-right">
                    <span className="font-heading-sm text-green-800">{item.question}</span>
                    <span className={`text-green-700 text-xl flex-shrink-0 mr-4 transition-transform ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-5 pb-5"><p className="font-body text-stone-600">{item.answer}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
