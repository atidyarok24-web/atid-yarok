import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import SectionHeader from '../components/SectionHeader'
import ScrollReveal from '../components/ScrollReveal'

function AboutHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let time = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resize()
    window.addEventListener('resize', resize)

    const ribbons = [
      { amp: 30, freq: 0.005, speed: 0.3, color: 'rgba(6, 95, 70, 0.08)' },
      { amp: 45, freq: 0.008, speed: 0.5, color: 'rgba(5, 150, 105, 0.1)' },
      { amp: 55, freq: 0.006, speed: 0.4, color: 'rgba(6, 95, 70, 0.06)' },
      { amp: 35, freq: 0.01, speed: 0.6, color: 'rgba(4, 120, 87, 0.09)' },
      { amp: 50, freq: 0.007, speed: 0.35, color: 'rgba(6, 95, 70, 0.07)' },
    ]

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      ribbons.forEach((ribbon, i) => {
        ctx.beginPath()
        ctx.moveTo(0, h * 0.2 + i * h * 0.15)

        for (let x = 0; x <= w; x += 2) {
          const y = h * 0.2 + i * h * 0.15 + Math.sin(x * ribbon.freq + time * ribbon.speed) * ribbon.amp
          ctx.lineTo(x, y)
        }

        ctx.strokeStyle = ribbon.color
        ctx.lineWidth = 60
        ctx.lineCap = 'round'
        ctx.stroke()
      })

      time += 1
      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
}

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return

    const els = heroRef.current.querySelectorAll('.animate-in')
    gsap.from(els, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      delay: 0.3,
    })
  }, [])

  return (
    <div style={{ direction: 'rtl' }}>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative bg-green-950 min-h-[70vh] flex items-center overflow-hidden"
      >
        <AboutHeroCanvas />
        <div className="relative z-10 content-max w-full px-4 py-32">
          <div className="max-w-[700px]">
            <span className="animate-in font-label text-green-400 block mb-3">
              <span className="text-green-500 mr-1">&#9679;</span> אודות החברה
            </span>
            <h1 className="animate-in font-display text-white mb-4">
              עתיד ירוק בע&quot;מ
            </h1>
            <h2 className="animate-in font-heading-lg text-green-300 font-normal mb-6">
              מובילים בתחום מערכות הדשא הסינתטי בישראל
            </h2>
            <p className="animate-in font-body-lg text-white/80">
              עתיד ירוק בע&quot;מ (ATID YAROK LTD) היא חברה מובילה בתחום ייבוא, שיווק והתקנה של מערכות דשא סינתטי איכותי בישראל. החברה נוסדה בשנת 2009 ומאז צברה ניסיון עצום עם למעלה מ-250,000 מ&quot;ר של דשא סינתטי מותקן ויותר מ-27 מגרשים מאושרי FIFA.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="bg-cream-50 section-padding">
        <div className="content-max">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="font-heading-xl text-green-900 mb-6">הסיפור שלנו</h2>
                <div className="space-y-4 font-body text-stone-600">
                  <p>
                    עתיד ירוק בע&quot;מ נוסדה בשנת 2009 על ידי עבד אלרחים ג&apos;אבר, מנכ&quot;ל ומייסד החברה, המוביל בתחום מערכות הדשא הסינתטי בישראל עם למעלה מ-17 שנות ניסיון. החברה מתמחה בהקמת מגרשי ספורט איכותיים ברמה בינלאומית, לרבות מגרשי כדורגל, הוקי, ראגבי ומשטחים רב-תכליתיים.
                  </p>
                  <p>
                    אנו שותפים מורשים של <strong>GreenFields</strong> (הולנד — חברת TenCate Grass), מובילה עולמית בתחום מערכות דשא סינתטי לספורט. שותפות זו מעניקה לנו גישה לטכנולוגיות הדשא המתקדמות ביותר בעולם, לרבות סיבי V-Shape פטנטיים, מערכות ארוגות (Woven), ומוצרי ONE-DNA™ המהווים פריצת דרך בתחום הקיימות.
                  </p>
                  <p>
                    החברה מחזיקה בהסמכות הגבוהות ביותר בתעשייה: <strong>FIFA Preferred Provider</strong>, <strong>FIFA Quality Pro</strong>, <strong>ISO 9001:2015</strong>, והסמכת GreenFields Authorized. כל המוצרים שלנו עוברים בדיקות מעבדה מוסמכות (Sports Labs, Labosport) לפני התקנה.
                  </p>
                </div>
              </div>
              <div className="rounded-[20px] overflow-hidden shadow-lg">
                <img
                  src="/images/about-team.jpg"
                  alt="צוות עתיד ירוק"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Key Projects */}
      <section className="bg-white section-padding">
        <div className="content-max">
          <div className="text-center mb-12">
            <SectionHeader
              label="פרויקטים"
              heading="פרויקטים בולטים"
              body="מבחר מהפרויקטים המשמעותיים שביצענו בכל רחבי הארץ"
              centered
            />
          </div>

          <ScrollReveal stagger={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { year: '2026', name: 'מגרש אבו סנאן', type: 'FIFA Quality Pro', area: '15,600 מ"ר' },
                { year: '2025', name: 'מגרש אבו סנאן', type: 'FIFA Quality Pro', area: '7,620 מ"ר' },
                { year: '2024', name: 'מגרש טייבה', type: 'FIFA Quality', area: '5,200 מ"ר' },
                { year: '2024', name: 'מעונות נהל"ג ראש העין', type: 'FIFA תקן', area: '1,200 מ"ר' },
                { year: '2023', name: 'מגרש כפר יאסיף', type: 'FIFA Quality', area: '7,620 מ"ר' },
                { year: '2020', name: 'מגרש תמר הירדן', type: 'FIFA Quality', area: '7,500 מ"ר' },
                { year: '2019', name: 'מגרש צפת', type: 'FIFA Quality', area: '8,600 מ"ר' },
                { year: '2019', name: 'מגרש חולון', type: 'FIFA Quality', area: '7,800 מ"ר' },
                { year: '2017', name: 'מגרש ירושלים', type: 'FIFA Quality', area: '8,650 מ"ר' },
              ].map((project, i) => (
                <div
                  key={i}
                  className="bg-cream-50 rounded-xl p-6 border border-cream-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label text-green-700 text-[0.6rem]">{project.year}</span>
                    <span className="font-label text-amber-500 text-[0.6rem]">{project.type}</span>
                  </div>
                  <h4 className="font-heading-sm text-green-800">{project.name}</h4>
                  <p className="font-body-sm text-stone-500">{project.area}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-green-50 section-padding">
        <div className="content-max">
          <div className="text-center mb-12">
            <SectionHeader
              label="הסמכות"
              heading="תעודות והסמכות בינלאומיות"
              body="אנו גאים להחזיק בהסמכות הגבוהות ביותר בתעשיית הדשא הסינתטי"
              centered
            />
          </div>

          <ScrollReveal stagger={0.08}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'FIFA Preferred Provider', desc: 'ספק מועדף' },
                { name: 'FIFA Quality Pro', desc: 'תקן מקצועי' },
                { name: 'ISO 9001:2015', desc: 'ניהול איכות' },
                { name: 'GreenFields Authorized', desc: 'שותף מורשה' },
                { name: 'Holly International', desc: 'שותף עולמי' },
              ].map((cert, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-5 shadow-sm text-center hover:shadow-md hover:-translate-y-1 transition-all"
                >
                  <span className="font-heebo font-bold text-green-700 text-sm block mb-1">{cert.name}</span>
                  <span className="font-body-sm text-stone-500">{cert.desc}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="bg-cream-50 section-padding">
        <div className="content-max">
          <div className="text-center mb-12">
            <SectionHeader
              label="יתרונות"
              heading="למה לבחור בנו"
              centered
            />
          </div>

          <ScrollReveal stagger={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[900px] mx-auto">
              {[
                { icon: '🏆', title: 'FIFA Preferred Provider', desc: 'אחת מהחברות הבודדות בישראל עם הסמכת הספק המועדף של FIFA' },
                { icon: '⚽', title: '27+ מגרשי FIFA', desc: 'יותר מ-27 מגרשים מאושרי FIFA ברחבי הארץ' },
                { icon: '📏', title: '250,000+ מ"ר', desc: 'למעלה מרבע מיליון מטר מרובע של דשא סינתטי מותקן' },
                { icon: '🧪', title: 'בדיקות מעבדה מוסמכות', desc: 'כל המוצרים עוברים בדיקות Sports Labs ו-Labosport' },
                { icon: '🤝', title: 'שותפויות עולמיות', desc: 'שיתוף פעולה עם GreenFields ההולנדית — חברת TenCate Grass' },
                { icon: '🛡️', title: 'אחריות מקיפה', desc: '5-8 שנות אחריות על כל המוצרים וההתקנות' },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[20px] p-8 border border-cream-200 text-center hover:shadow-md transition-shadow"
                >
                  <span className="text-4xl block mb-4">{card.icon}</span>
                  <h3 className="font-heading-md text-green-800 mb-2">{card.title}</h3>
                  <p className="font-body text-stone-600">{card.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
