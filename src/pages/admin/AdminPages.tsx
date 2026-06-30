import { useState } from 'react'
import { trpc } from '@/providers/trpc'
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaEye } from 'react-icons/fa'

interface PageForm { title: string; slug: string; content: string }
const emptyForm: PageForm = { title: '', slug: '', content: '' }

export default function AdminPages() {
  const utils = trpc.useUtils()
  const { data: pages = [] } = trpc.content.pageList.useQuery()
  const createMut = trpc.content.pageCreate.useMutation({ onSuccess: () => { utils.content.pageList.invalidate(); cancel() } })
  const updateMut = trpc.content.pageUpdate.useMutation({ onSuccess: () => { utils.content.pageList.invalidate(); cancel() } })
  const deleteMut = trpc.content.pageDelete.useMutation({ onSuccess: () => utils.content.pageList.invalidate() })

  const [editingId, setEditingId] = useState<number | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<PageForm>(emptyForm)
  const [previewId, setPreviewId] = useState<number | null>(null)

  const startCreate = () => { setForm(emptyForm); setCreating(true); setEditingId(null) }
  const startEdit = (p: typeof pages[0]) => { setForm({ title: p.title, slug: p.slug, content: p.content }); setEditingId(p.id); setCreating(false) }
  const cancel = () => { setEditingId(null); setCreating(false); setPreviewId(null) }

  const handleSave = () => {
    if (!form.title.trim() || !form.slug.trim()) return
    if (creating) createMut.mutate(form)
    else if (editingId) updateMut.mutate({ id: editingId, ...form })
  }

  const page = pages.find(p => p.id === previewId)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading-lg text-green-900">ניהול עמודים</h2>
        {!(editingId || creating) && (
          <button onClick={startCreate} className="bg-green-700 text-white px-5 py-2.5 rounded-full font-button hover:bg-green-800 transition-all flex items-center gap-2 border-none cursor-pointer"><FaPlus /> הוסף עמוד</button>
        )}
      </div>

      {page && !editingId && !creating && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6 border-2 border-green-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading-md text-green-900">{page.title}</h3>
            <button onClick={() => setPreviewId(null)} className="text-stone-400 hover:text-stone-600 bg-transparent border-none cursor-pointer"><FaTimes /></button>
          </div>
          <div className="font-body text-stone-700 whitespace-pre-line text-right">{page.content}</div>
        </div>
      )}

      {(editingId || creating) && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="font-heading-md text-green-900 mb-4">{creating ? 'עמוד חדש' : 'עריכת עמוד'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div><label className="font-body-sm text-stone-600 block mb-1">כותרת עמוד</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700" /></div>
            <div><label className="font-body-sm text-stone-600 block mb-1">נתיב (Slug)</label><input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700" placeholder="/services" /></div>
          </div>
          <div className="mb-4"><label className="font-body-sm text-stone-600 block mb-1">תוכן העמוד</label><textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={12} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700 resize-none" /></div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="bg-green-700 text-white px-6 py-2.5 rounded-full font-button hover:bg-green-800 transition-all flex items-center gap-2 border-none cursor-pointer"><FaSave /> שמור</button>
            <button onClick={cancel} className="border border-stone-300 text-stone-600 px-6 py-2.5 rounded-full font-button hover:bg-stone-100 transition-all flex items-center gap-2 bg-transparent cursor-pointer"><FaTimes /> ביטול</button>
          </div>
        </div>
      )}

      {pages.length === 0 && !creating && (
        <div className="bg-cream-100 rounded-xl p-8 text-center">
          <p className="font-body text-stone-500 mb-4">אין עמודים מותאמים אישית עדיין</p>
          <button onClick={startCreate} className="bg-green-700 text-white px-6 py-2.5 rounded-full font-button hover:bg-green-800 transition-all border-none cursor-pointer">צור עמוד ראשון</button>
        </div>
      )}

      <div className="space-y-2">
        {pages.map(p => (
          <div key={p.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0"><FaEye className="text-green-600 text-sm" /></div>
            <div className="flex-1 min-w-0">
              <h4 className="font-heading-sm text-green-800">{p.title}</h4>
              <span className="font-body-sm text-stone-400">{p.slug}</span>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => setPreviewId(p.id === previewId ? null : p.id)} className="text-green-600 hover:text-green-800 bg-transparent border-none cursor-pointer"><FaEye /></button>
              <button onClick={() => startEdit(p)} className="text-green-600 hover:text-green-800 bg-transparent border-none cursor-pointer"><FaEdit /></button>
              <button onClick={() => { if (confirm('למחוק?')) deleteMut.mutate({ id: p.id }) }} className="text-red-500 hover:text-red-700 bg-transparent border-none cursor-pointer"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
