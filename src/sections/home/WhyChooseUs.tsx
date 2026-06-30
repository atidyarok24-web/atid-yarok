import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaShieldAlt, FaSun, FaAward, FaLeaf } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { icon: FaShieldAlt, title: 'אחריות מקיפה', desc: '8 שנות אחריות על הדשא וההתקנה' },
  { icon: FaSun, title: 'עמידות ל-UV', desc: 'הדשא אינו דוהה לעולם גם בשמש ישראלית' },
  { icon: FaAward, title: 'מאושר ע"י FIFA', desc: 'הדשא עומד בתקן FIFA PRO למשחקי כדורגל' },
  { icon: FaLeaf, title: 'ידידותי לסביבה', desc: 'עומד בתקנים האירופאים המחמירים ביותר' },
]

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const statCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.from(imageRef.current, {
      x: -40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })

    gsap.from(statCardRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      delay: 0.4,
      ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })

    const textElements = sectionRef.current.querySelectorAll('.animate-text')
    gsap.from(textElements, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current) st.kill()
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="bg-cream-50 section-padding" style={{ direction: 'rtl' }}>
      <div className="content-max">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-16 items-center">
          {/* Text Column */}
          <div className="order-1 lg:order-2">
            <span className="animate-text font-label text-green-700 block mb-3">
              <span className="text-green-500 mr-1">&#9679;</span> למה לבחור בנו
            </span>
            <h2 className="animate-text font-heading-xl text-green-900 mb-4">
              הדשא הסינתטי האיכותי בישראל
            </h2>
            <p className="animate-text font-body text-stone-600 mb-8">
              אנו הנציגה הבלעדית של חברת GreenFields ההולנדית — מובילה עולמית במערכות דשא סינתטי לספורט. הדשאים שלנו מבוססים על טכנולוגיית סיבי V-Shape פטנטית, עמידים ב-100% לקרני UV, ומאושרים ע"י FIFA, FIH ו-World Rugby.
            </p>

            <div className="space-y-4">
              {features.map((f, i) => (
                <div key={i} className="animate-text flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                    <f.icon className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-heading-sm text-green-800 mb-1">{f.title}</h4>
                    <p className="font-body-sm text-stone-500">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div ref={imageRef} className="order-2 lg:order-1 relative">
            <div className="rounded-[20px] overflow-hidden shadow-lg">
              <img
                src="/images/grass-closeup.jpg"
                alt="דשא סינתטי איכותי - תקריב"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>

            {/* Floating Stat Card */}
            <div
              ref={statCardRef}
              className="absolute -bottom-6 -right-4 lg:-right-8 bg-white rounded-xl p-6 shadow-md"
            >
              <span className="font-display-sm text-green-700 block leading-none">8+</span>
              <span className="font-body-sm text-stone-500">שנות אחריות</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
