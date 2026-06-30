import { useState } from 'react'
import { trpc } from '@/providers/trpc'
import { FaPlus, FaTrash } from 'react-icons/fa'
import FileUploader from '../../components/FileUploader'

const categories = ['גינות פרטיות', 'מגרשי ספורט', 'מוסדות', 'גגות']

interface GalleryForm { src: string; title: string; location: string; category: string }
const emptyForm: GalleryForm = { src: '', title: '', location: '', category: 'גינות פרטיות' }

export default function AdminGallery() {
  const utils = trpc.useUtils()
  const { data: gallery = [], isLoading } = trpc.content.galleryList.useQuery()
  const createMut = trpc.content.galleryCreate.useMutation({ onSuccess: () => { utils.content.galleryList.invalidate(); setShowAdd(false); setForm(emptyForm) } })
  const deleteMut = trpc.content.galleryDelete.useMutation({ onSuccess: () => utils.content.galleryList.invalidate() })

  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState<GalleryForm>(emptyForm)

  const handleAdd = () => {
    if (!form.src.trim() || !form.title.trim()) return
    createMut.mutate(form)
  }

  if (isLoading) return <div className="text-center py-20 font-body text-stone-500">טוען...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading-lg text-green-900">ניהול גלריה</h2>
        <button onClick={() => setShowAdd(!showAdd)} className="bg-green-700 text-white px-5 py-2.5 rounded-full font-button hover:bg-green-800 transition-all flex items-center gap-2 border-none cursor-pointer">
          <FaPlus /> {showAdd ? 'סגור' : 'הוסף תמונה'}
        </button>
      </div>

      {showAdd && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="font-heading-md text-green-900 mb-4">הוספת תמונה חדשה</h3>

          {/* File Upload - Image or Video */}
          <div className="mb-4">
            <FileUploader
              value={form.src}
              onChange={url => setForm({ ...form, src: url })}
              label="תמונה או סרטון"
              fileType="both"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div><label className="font-body-sm text-stone-600 block mb-1">כותרת</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700" /></div>
            <div><label className="font-body-sm text-stone-600 block mb-1">מיקום</label><input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700" /></div>
            <div><label className="font-body-sm text-stone-600 block mb-1">קטגוריה</label><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700">{categories.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
          </div>
          <button onClick={handleAdd} className="bg-green-700 text-white px-6 py-2.5 rounded-full font-button hover:bg-green-800 transition-all border-none cursor-pointer">הוסף תמונה</button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {gallery.map(g => (
          <div key={g.id} className="group relative rounded-xl overflow-hidden shadow-sm aspect-square">
            <img src={g.src} alt={g.title} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-green-950/0 group-hover:bg-green-950/70 transition-all flex flex-col items-center justify-center p-2">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center">
                <p className="font-heading-sm text-white text-sm mb-1">{g.title}</p>
                <p className="font-body-sm text-green-300 text-xs">{g.location}</p>
                <button onClick={() => { if (confirm('למחוק?')) deleteMut.mutate({ id: g.id }) }} className="mt-2 text-red-400 hover:text-red-300 bg-transparent border-none cursor-pointer"><FaTrash /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
