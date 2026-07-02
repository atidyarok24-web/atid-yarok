import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import { trpc } from '@/providers/trpc'

export default function HomeHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  // Fetch site settings from API
  const { data: settings = [] } = trpc.content.settingsList.useQuery()

  const getVal = (key: string, fallback: string) =>
    settings.find((s) => s.key === key)?.value || fallback

  const heroTitle = getVal('heroTitle', 'עתיד ירוק בע"מ')
  const heroSubtitle = getVal('heroSubtitle', 'הפתרון המושלם לגינה שלכם')
  const heroBody = getVal(
    'heroBody',
    'אנו מתמחים בייבוא, שיווק והתקנה של מערכות דשא סינתטי מבית GreenFields — מותג מוביל בעולם. עם 17 שנות ניסיון, 250,000 מ"ר מותקנים ו-27 מגרשים מאושרי FIFA — אנחנו כאן להפוך כל מרחב לירוק ומזמין.'
  )

  const heroVideo = getVal('heroVideo', '/videos/hero-video.mp4')
  const heroFallback = getVal('heroFallback', '/images/hero-fallback.jpg')

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    tl.fromTo(
      sectionRef.current,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 1.2 }
    )
      .fromTo(
        labelRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.4
      )
      .fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.55
      )
      .fromTo(
        subheadingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.65
      )
      .fromTo(
        bodyRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.75
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.85
      )
      .fromTo(
        trustRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.95
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        1.2
      )

    gsap.to('.scroll-dot', {
      y: 20,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: 'easeInOut',
    })

    return () => {
      tl.kill()
    }
  }, [])

  const isVideo =
    heroVideo &&
    (heroVideo.endsWith('.mp4') ||
      heroVideo.endsWith('.webm') ||
      heroVideo.endsWith('.mov'))

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ direction: 'rtl' }}
    >
      {/* Video Background */}
      {isVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={heroFallback || '/images/hero-fallback.jpg'}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroFallback || '/images/hero-fallback.jpg'})`,
          }}
        />
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to left, rgba(2,44,34,0.88) 0%, rgba(2,44,34,0.5) 50%, rgba(2,44,34,0.2) 100%)',
        }}
      />

      <div className="relative z-10 h-full flex items-center">
        <div className="content-max w-full px-4 lg:px-8 flex justify-end">
          <div className="max-w-[640px] text-right">
            <span
              ref={labelRef}
              className="font-label text-green-400 inline-flex items-center gap-2 mb-4 opacity-0"
            >
              <span className="text-green-500">&#9679;</span>
              דשא סינתטי איכותי
            </span>

            <h1
              ref={headingRef}
              className="font-display text-white mb-2 opacity-0"
            >
              {heroTitle}
            </h1>

            <h2
              ref={subheadingRef}
              className="font-heading-lg text-white/90 font-normal mb-6 opacity-0"
            >
              {heroSubtitle}
            </h2>

            <p
              ref={bodyRef}
              className="font-body-lg text-white/85 max-w-[520px] mb-8 opacity-0"
            >
              {heroBody}
            </p>

            <div
              ref={ctaRef}
              className="flex flex-wrap gap-4 justify-end mb-6 opacity-0"
            >
              <Link
                to="/contact"
                className="bg-green-700 text-white px-8 py-3.5 rounded-full font-button hover:bg-green-800 hover:shadow-glow hover:-translate-y-0.5 transition-all"
              >
                בקשו הצעת מחיר
              </Link>

              <Link
                to="/gallery"
                className="border-2 border-green-500 text-green-400 px-8 py-3.5 rounded-full font-button hover:bg-green-700 hover:text-white hover:border-green-700 transition-all"
              >
                צפו בגלריה
              </Link>
            </div>

            <div
              ref={trustRef}
              className="flex flex-wrap gap-5 justify-end font-body-sm text-white/60 opacity-0"
            >
              <span>&#10003; 17 שנות ניסיון</span>
              <span>&#10003; FIFA Preferred Provider</span>
              <span>&#10003; 250,000 מ&quot;ר מותקנים</span>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0"
      >
        <div className="w-0.5 h-10 bg-green-400/30 relative overflow-hidden rounded-full">
          <div className="scroll-dot absolute top-0 left-0 w-full h-3 bg-green-400 rounded-full" />
        </div>

        <span className="font-label text-green-400 text-[0.6rem]">
          גלול למטה
        </span>
      </div>
    </section>
  )
}