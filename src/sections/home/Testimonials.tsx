import SectionHeader from '../../components/SectionHeader'
import ScrollReveal from '../../components/ScrollReveal'

const testimonials = [
  {
    quote: 'עתיד ירוק בע"מ הקימה עבורנו מגרש כדורגל ברמה עולמית עם תקן FIFA Quality Pro. השירות המקצועי, הליווי הצמוד ואיכות הדשא עברו את כל הציפיות. המגרש מקבל מחמאות מכל קבוצות הכדורגל באזור.',
    name: 'רשות ספורט נתניה',
    location: 'מגרש 15,600 מ"ר — 2026',
  },
  {
    quote: 'לאחר בדיקות מקיפות בחרנו בעתיד ירוק בע"מ להקמת מגרש הכדורגל שלנו. הצוות המקצועי הוביל את הפרויקט מהתכנון ועד הבדיקות הסופיות. מגרש FIFA Quality Pro ברמה הגבוהה ביותר.',
    name: 'מועצה מקומית טייבה',
    location: 'מגרש 5,200 מ"ר — 2024',
  },
  {
    quote: 'החברה ביצעה את עבודות ההקמה והתחזוקה של מגרש הכדורגל שלנו במקצועיות רבה. הדשא האיכותי, השירות המהיר והאמינות לאורך שנים הופכים את עתיד ירוק בע"מ לשותף אסטרטגי שלנו.',
    name: 'עיריית צפת',
    location: 'מגרש 8,600 מ"ר — 2019',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-cream-100 section-padding" style={{ direction: 'rtl' }}>
      <div className="content-max">
        <div className="text-center mb-12">
          <SectionHeader
            label="לקוחות ממליצים"
            heading="מה הלקוחות אומרים עלינו"
            centered
          />
        </div>

        <ScrollReveal stagger={0.15} y={30}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-[20px] p-8 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
              >
                <span className="text-green-200 text-5xl font-heebo leading-none block mb-4">"</span>
                <p className="font-body text-stone-600 text-right mb-6 leading-relaxed">
                  {t.quote}
                </p>
                <div className="border-t border-cream-200 pt-4">
                  <span className="font-heading-sm text-green-800 block">{t.name}</span>
                  <span className="font-body-sm text-stone-400">{t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
