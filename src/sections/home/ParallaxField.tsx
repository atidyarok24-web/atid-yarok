import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

export default function ParallaxField() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current || !textRef.current) return

    const ctx = gsap.context(() => {
      // Simple parallax - image moves slower than scroll
      gsap.to(imageRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      })

      // Text fades in and out quickly
      gsap.fromTo(
        textRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-[80vh] w-full overflow-hidden"
      style={{ direction: 'rtl' }}
    >
      {/* Background Image with parallax */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/images/hero-fallback.jpg"
          alt="מגרש דשא סינתטי"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-950/50" />
      </div>

      {/* Text Content */}
      <div
        ref={textRef}
        className="relative z-10 h-full flex items-center justify-end px-4 lg:px-16"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="max-w-[560px] text-right">
          <h2 className="font-display-sm text-white mb-6">
            250,000 מטר של ירוק
          </h2>
          <p className="font-body-lg text-white/85 mb-8">
            התקנו מעל רבע מיליון מ&quot;ר של דשא סינתטי בפרויקטים מובילים בכל רחבי הארץ — ממגרשי כדורגל מאושרי FIFA ועד גינות פרטיות יוקרתיות.
          </p>
          <Link
            to="/gallery"
            className="inline-block bg-green-700 text-white px-8 py-3.5 rounded-full font-button hover:bg-green-800 hover:shadow-glow hover:-translate-y-0.5 transition-all"
          >
            צפו בפרויקטים שלנו
          </Link>
        </div>
      </div>
    </section>
  )
}
