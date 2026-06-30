import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 17, suffix: '+', label: 'שנות ניסיון' },
  { value: 27, suffix: '+', label: 'מגרשי FIFA' },
  { value: 250000, suffix: '+', label: 'מ"ר מותקנים', format: true },
  { value: 8, suffix: '', label: 'שנות אחריות' },
]

function formatNumber(num: number): string {
  if (num >= 1000) {
    return num.toLocaleString('he-IL')
  }
  return num.toString()
}

export default function StatsBar() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      numberRefs.current.forEach((el, i) => {
        if (!el) return
        const stat = stats[i]

        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
          onUpdate: () => {
            const current = Math.round(obj.val)
            el.textContent = (stat.format ? formatNumber(current) : current.toString()) + stat.suffix
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-green-700 py-12 lg:py-16" style={{ direction: 'rtl' }}>
      <div className="content-max px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <span
                ref={(el) => { numberRefs.current[i] = el }}
                className="font-display-sm text-white block"
              >
                0{stat.suffix}
              </span>
              <span className="font-body-sm text-green-200">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
