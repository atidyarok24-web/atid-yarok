import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { trpc } from '@/providers/trpc'
import SectionHeader from '../../components/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

// Static fallback data
const productsFallback = [
  { id: 1, name: 'Pure PT', category: 'ללא מילוי — ביתי', image: '/images/product-lounge.jpg' },
  { id: 2, name: 'MX Elite', category: 'ארוג — ביתי', image: '/images/product-supergreen.jpg' },
  { id: 3, name: 'Slide Max Pro NF', category: 'ללא מילוי — גינה', image: '/images/installation-2.jpg' },
  { id: 4, name: 'MF Elite', category: 'מגרשי כדורגל', image: '/images/grass-closeup.jpg' },
  { id: 5, name: 'Pure EP', category: 'מגרשי הוקי', image: '/images/installation-3.jpg' },
  { id: 6, name: 'ONE-DNA', category: 'גגות ומרפסות', image: '/images/product-roof.jpg' },
]

export default function ProductsShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  // Fetch from API, fallback to static
  const { data: apiProducts } = trpc.content.productList.useQuery()
  const products = apiProducts && apiProducts.length > 0
    ? apiProducts.slice(0, 6).map(p => ({ id: p.id, name: p.name, category: p.category, image: p.image }))
    : productsFallback

  useEffect(() => {
    if (!sectionRef.current || !carouselRef.current) return

    gsap.from(sectionRef.current.querySelector('.section-header'), {
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })

    gsap.from(carouselRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current) st.kill()
      })
    }
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX - (carouselRef.current?.offsetLeft || 0)
    scrollLeft.current = carouselRef.current?.scrollLeft || 0
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return
    e.preventDefault()
    const x = e.pageX - (carouselRef.current.offsetLeft || 0)
    const walk = (x - startX.current) * 2
    carouselRef.current.scrollLeft = scrollLeft.current - walk
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  return (
    <section ref={sectionRef} className="bg-green-950 py-20 lg:py-28" style={{ direction: 'rtl' }}>
      <div className="section-header px-4 mb-12">
        <SectionHeader
          label="קו מוצרים"
          heading="הדשאים שלנו"
          body="מגוון רחב של דגמים לכל שימוש — מגינות פרטיות ועד מגרשי כדורגל"
          centered
          light
        />
      </div>

      {/* Horizontal Scrollable Carousel */}
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto pb-6 px-4 cursor-grab active:cursor-grabbing scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="flex-shrink-0 w-[300px] lg:w-[340px] group block"
          >
            <div className="relative rounded-[20px] overflow-hidden mb-4 aspect-[3/4]">
              <img
                src={product.image || '/images/grass-closeup.jpg'}
                alt={`דגם ${product.name}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4">
                <span className="font-label text-green-400 text-[0.6rem]">{product.category}</span>
                <h3 className="font-heading-md text-white">{product.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation hint */}
      <p className="text-center font-body-sm text-green-500/60 mt-4">
        גלול לצדדים לעוד דגמים
      </p>
    </section>
  )
}
