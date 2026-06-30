import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  stagger?: number
  y?: number
  duration?: number
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  stagger = 0.1,
  y = 40,
  duration = 0.6,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const elements = ref.current.children
    if (elements.length === 0) return

    gsap.from(elements, {
      y,
      opacity: 0,
      duration,
      stagger,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === ref.current) st.kill()
      })
    }
  }, [y, duration, stagger, delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
