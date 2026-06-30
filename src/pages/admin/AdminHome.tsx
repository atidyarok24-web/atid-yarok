import { useState } from 'react'
import { trpc } from '@/providers/trpc'
import { FaBoxOpen, FaNewspaper, FaQuestionCircle, FaImages, FaFileAlt, FaEye, FaEdit, FaDownload } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function AdminHome() {
  const navigate = useNavigate()
  const { data: products = [] } = trpc.content.productList.useQuery()
  const { data: articles = [] } = trpc.content.articleList.useQuery()
  const { data: faq = [] } = trpc.content.faqList.useQuery()
  const { data: gallery = [] } = trpc.content.galleryList.useQuery()
  const { data: pages = [] } = trpc.content.pageList.useQuery()

  const [importMsg] = useState('')

  const stats = [
    { label: 'מוצרים', value: products.length, icon: FaBoxOpen, color: 'bg-green-700', link: '/admin/products' },
    { label: 'מאמרים', value: articles.length, icon: FaNewspaper, color: 'bg-green-600', link: '/admin/articles' },
    { label: 'שאלות ותשובות', value: faq.length, icon: FaQuestionCircle, color: 'bg-green-500', link: '/admin/faq' },
    { label: 'תמונות גלריה', value: gallery.length, icon: FaImages, color: 'bg-green-800', link: '/admin/gallery' },
    { label: 'עמודים מותאמים', value: pages.length, icon: FaFileAlt, color: 'bg-green-700', link: '/admin/pages' },
  ]

  const handleExport = () => {
    const data = { products, articles, faq, gallery, pages }
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `atid-yarok-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((s, i) => (
          <button key={i} onClick={() => navigate(s.link)} className={`${s.color} text-white rounded-xl p-5 text-right hover:opacity-90 transition-opacity border-none cursor-pointer`}>
            <s.icon className="text-2xl mb-3 opacity-70" />
            <span className="font-display-sm block leading-none">{s.value}</span>
            <span className="font-body-sm opacity-80">{s.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-green-50 rounded-xl p-6 border border-green-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading-md text-green-900 mb-1">גיבוי נתונים</h3>
            <p className="font-body-sm text-stone-600">ייצא את כל הנתונים לקובץ JSON לגיבוי.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleExport} className="bg-green-700 text-white px-5 py-2.5 rounded-full font-button hover:bg-green-800 transition-all flex items-center gap-2 border-none cursor-pointer">
              <FaDownload /> ייצוא JSON
            </button>
          </div>
        </div>
        {importMsg && <p className="font-body-sm text-green-700 mt-3">{importMsg}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading-md text-green-900">מוצרים אחרונים</h3>
            <button onClick={() => navigate('/admin/products')} className="font-body-sm text-green-600 hover:text-green-800 bg-transparent border-none cursor-pointer">צפייה בכולם &larr;</button>
          </div>
          <div className="space-y-2">
            {products.slice(0, 5).map(p => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-cream-100 last:border-0">
                <div className="flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div><span className="font-heading-sm text-green-800 block">{p.name}</span><span className="font-body-sm text-stone-400">{p.category}</span></div>
                </div>
                <button onClick={() => navigate('/admin/products')} className="text-green-600 hover:text-green-800 bg-transparent border-none cursor-pointer"><FaEdit /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading-md text-green-900">מאמרים אחרונים</h3>
            <button onClick={() => navigate('/admin/articles')} className="font-body-sm text-green-600 hover:text-green-800 bg-transparent border-none cursor-pointer">צפייה בכולם &larr;</button>
          </div>
          <div className="space-y-2">
            {articles.slice(0, 5).map(a => (
              <div key={a.id} className="flex items-center justify-between py-2 border-b border-cream-100 last:border-0">
                <div className="flex items-center gap-3">
                  <img src={a.image} alt={a.title} className="w-10 h-10 rounded-lg object-cover" />
                  <div><span className="font-heading-sm text-green-800 block">{a.title}</span><span className="font-body-sm text-stone-400">{a.category}</span></div>
                </div>
                <button onClick={() => navigate('/admin/articles')} className="text-green-600 hover:text-green-800 bg-transparent border-none cursor-pointer"><FaEdit /></button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-cream-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading-md text-green-900 mb-1">תצוגת האתר</h3>
            <p className="font-body-sm text-stone-600">צפה באתר כפי שמוצג למבקרים</p>
          </div>
          <button onClick={() => { window.open('/', '_blank') }} className="bg-green-700 text-white px-6 py-3 rounded-full font-button hover:bg-green-800 transition-all flex items-center gap-2 border-none cursor-pointer">
            <FaEye /> צפה באתר
          </button>
        </div>
      </div>
    </div>
  )
}
