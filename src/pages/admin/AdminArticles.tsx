import { useState } from 'react'
import { trpc } from '@/providers/trpc'
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa'
import FileUploader from '../../components/FileUploader'

const categories = ['GreenFields', 'התקנה', 'ספורט', 'מוצרים', 'קיימות', 'טכנולוגיה']

interface ArticleForm {
  title: string; category: string; image: string; excerpt: string; content: string; date: string
}

const emptyForm: ArticleForm = { title: '', category: 'GreenFields', image: '', excerpt: '', content: '', date: new Date().toLocaleDateString('he-IL') }

export default function AdminArticles() {
  const utils = trpc.useUtils()
  const { data: articles = [], isLoading } = trpc.content.articleList.useQuery()
  const createMut = trpc.content.articleCreate.useMutation({ onSuccess: () => { utils.content.articleList.invalidate(); cancel() } })
  const updateMut = trpc.content.articleUpdate.useMutation({ onSuccess: () => { utils.content.articleList.invalidate(); cancel() } })
  const deleteMut = trpc.content.articleDelete.useMutation({ onSuccess: () => utils.content.articleList.invalidate() })

  const [editingId, setEditingId] = useState<number | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<ArticleForm>(emptyForm)

  const startCreate = () => { setForm(emptyForm); setCreating(true); setEditingId(null) }
  const startEdit = (a: typeof articles[0]) => { setForm({ title: a.title, category: a.category, image: a.image, excerpt: a.excerpt, content: a.content, date: a.date }); setEditingId(a.id); setCreating(false) }
  const cancel = () => { setEditingId(null); setCreating(false) }

  const handleSave = () => {
    if (!form.title.trim()) return
    const payload = { ...form, image: form.image || '/images/article-1.jpg' }
    if (creating) createMut.mutate(payload)
    else if (editingId) updateMut.mutate({ id: editingId, ...payload })
  }

  if (isLoading) return <div className="text-center py-20 font-body text-stone-500">טוען...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading-lg text-green-900">ניהול מאמרים</h2>
        {!(editingId || creating) && (
          <button onClick={startCreate} className="bg-green-700 text-white px-5 py-2.5 rounded-full font-button hover:bg-green-800 transition-all flex items-center gap-2 border-none cursor-pointer"><FaPlus /> הוסף מאמר</button>
        )}
      </div>

      {(editingId || creating) && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="font-heading-md text-green-900 mb-4">{creating ? 'מאמר חדש' : 'עריכת מאמר'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div><label className="font-body-sm text-stone-600 block mb-1">כותרת</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700" /></div>
            <div><label className="font-body-sm text-stone-600 block mb-1">קטגוריה</label><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700">{categories.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
            <div><label className="font-body-sm text-stone-600 block mb-1">תאריך</label><input value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700" /></div>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <FileUploader
              value={form.image}
              onChange={url => setForm({ ...form, image: url })}
              label="תמונת מאמר"
              fileType="image"
            />
          </div>

          <div className="mb-4"><label className="font-body-sm text-stone-600 block mb-1">תקציר</label><textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700 resize-none" /></div>
          <div className="mb-4"><label className="font-body-sm text-stone-600 block mb-1">תוכן מלא</label><textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={8} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700 resize-none" /></div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="bg-green-700 text-white px-6 py-2.5 rounded-full font-button hover:bg-green-800 transition-all flex items-center gap-2 border-none cursor-pointer"><FaSave /> שמור</button>
            <button onClick={cancel} className="border border-stone-300 text-stone-600 px-6 py-2.5 rounded-full font-button hover:bg-stone-100 transition-all flex items-center gap-2 bg-transparent cursor-pointer"><FaTimes /> ביטול</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {articles.map(a => (
          <div key={a.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
            <img src={a.image || '/images/article-1.jpg'} alt={a.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="font-heading-sm text-green-800 truncate">{a.title}</h4>
              <span className="font-body-sm text-stone-400">{a.category} — {a.date}</span>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => startEdit(a)} className="text-green-600 hover:text-green-800 bg-transparent border-none cursor-pointer"><FaEdit /></button>
              <button onClick={() => { if (confirm('למחוק?')) deleteMut.mutate({ id: a.id }) }} className="text-red-500 hover:text-red-700 bg-transparent border-none cursor-pointer"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
