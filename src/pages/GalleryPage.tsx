import { useState } from 'react'
import { trpc } from '@/providers/trpc'
import ScrollReveal from '../components/ScrollReveal'
import { FaVideo } from 'react-icons/fa'

type GalleryCategory = 'הכל' | 'גינות פרטיות' | 'מגרשי ספורט' | 'מוסדות' | 'גגות'

const categories: GalleryCategory[] = ['הכל', 'גינות פרטיות', 'מגרשי ספורט', 'מוסדות', 'גגות']

// Static fallback data if API is unavailable
const galleryFallback = [
  { id: 1, src: "/images/installation-1.jpg", title: "שדרוג גינה פרטית", location: "תל אביב", category: "גינות פרטיות" },
  { id: 2, src: "/images/installation-2.jpg", title: "וילה יוקרתית", location: "הרצליה", category: "גינות פרטיות" },
  { id: 3, src: "/images/installation-3.jpg", title: "מרכז ספורט עירוני", location: "ראשון לציון", category: "מגרשי ספורט" },
  { id: 4, src: "/images/installation-4.jpg", title: "מתחם משרדים", location: "רעננה", category: "מוסדות" },
  { id: 5, src: "/images/installation-5.jpg", title: "גן ילדים", location: "פתח תקווה", category: "מוסדות" },
  { id: 6, src: "/images/installation-6.jpg", title: "בריכת מלון", location: "אילת", category: "מוסדות" },
  { id: 7, src: "/images/installation-7.jpg", title: "תהליך התקנה", location: "כל הארץ", category: "גינות פרטיות" },
  { id: 8, src: "/images/installation-8.jpg", title: "מגרש בית ספר", location: "באר שבע", category: "מגרשי ספורט" },
  { id: 9, src: "/images/installation-9.jpg", title: "מרפסת עירונית", location: "תל אביב", category: "גגות" },
  { id: 10, src: "/images/installation-10.jpg", title: "גן ציבורי", location: "חיפה", category: "מוסדות" },
  { id: 11, src: "/images/installation-11.jpg", title: "מגרש לילה", location: "ירושלים", category: "מגרשי ספורט" },
  { id: 12, src: "/images/installation-12.jpg", title: "מגרש פנימי", location: "נתניה", category: "מגרשי ספורט" },
]

const isVideoFile = (src: string) => {
  return src && (src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov'))
}

export default function GalleryPage() {
  const { data: apiGallery } = trpc.content.galleryList.useQuery()
  const gallery = apiGallery && apiGallery.length > 0 ? apiGallery : galleryFallback

  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('הכל')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = activeFilter === 'הכל' ? gallery : gallery.filter(item => item.category === activeFilter)

  return (
    <div style={{ direction: 'rtl' }}>
      <section className="bg-green-950 min-h-[40vh] flex items-center justify-center py-16">
        <div className="text-center">
          <h1 className="font-display text-white mb-4">גלריית פרויקטים</h1>
          <p className="font-body-lg text-green-300">התקנות דשא סינתטי שביצענו בכל רחבי הארץ</p>
        </div>
      </section>

      <section className="bg-cream-50 section-padding">
        <div className="content-max">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-5 py-2 rounded-full font-button text-sm transition-all ${activeFilter === cat ? 'bg-green-700 text-white' : 'bg-transparent border border-green-700 text-green-700 hover:bg-green-700 hover:text-white'}`}>{cat}</button>
            ))}
          </div>

          <ScrollReveal stagger={0.05}>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map((item, i) => (
                <div key={item.id} className="break-inside-avoid relative rounded-xl overflow-hidden group cursor-pointer" onClick={() => setLightbox(i)}>
                  {isVideoFile(item.src) ? (
                    <>
                      <video src={item.src} className="w-full h-auto object-cover" muted playsInline preload="metadata" />
                      <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-md font-body-sm text-xs flex items-center gap-1">
                        <FaVideo /> וידאו
                      </div>
                    </>
                  ) : (
                    <img src={item.src} alt={item.title} className="w-full h-auto object-cover" loading="lazy" />
                  )}
                  <div className="absolute inset-0 bg-green-950/0 group-hover:bg-green-950/70 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <h4 className="font-heading-sm text-white mb-1">{item.title}</h4>
                      <span className="font-body-sm text-green-300">{item.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white text-3xl hover:text-green-400 transition-colors z-10" onClick={() => setLightbox(null)}>&#10005;</button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-green-400 transition-colors z-10" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + filtered.length) % filtered.length) }}>&#10095;</button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-green-400 transition-colors z-10" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % filtered.length) }}>&#10094;</button>

          {isVideoFile(filtered[lightbox].src) ? (
            <video src={filtered[lightbox].src} className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg" controls autoPlay onClick={(e) => e.stopPropagation()} />
          ) : (
            <img src={filtered[lightbox].src} alt={filtered[lightbox].title} className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <h4 className="font-heading-sm text-white">{filtered[lightbox].title}</h4>
            <span className="font-body-sm text-green-300">{filtered[lightbox].location}</span>
          </div>
        </div>
      )}
    </div>
  )
}
