import { useState } from 'react'
import { trpc } from '@/providers/trpc'
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa'
import FileUploader from '../../components/FileUploader'

const categories = ['כדורגל', 'הוקי', 'רב-תכליתי', 'ללא מילוי', 'בסיס']

interface ProductForm {
  name: string; category: string; image: string; description: string; specs: string; features: string[]
}

const emptyForm: ProductForm = { name: '', category: 'כדורגל', image: '', description: '', specs: '', features: ['', '', '', ''] }

export default function AdminProducts() {
  const utils = trpc.useUtils()
  const { data: products = [], isLoading } = trpc.content.productList.useQuery()
  const createMut = trpc.content.productCreate.useMutation({ onSuccess: () => { utils.content.productList.invalidate(); cancel() } })
  const updateMut = trpc.content.productUpdate.useMutation({ onSuccess: () => { utils.content.productList.invalidate(); cancel() } })
  const deleteMut = trpc.content.productDelete.useMutation({ onSuccess: () => utils.content.productList.invalidate() })

  const [editingId, setEditingId] = useState<number | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<ProductForm>(emptyForm)

  const startCreate = () => { setForm(emptyForm); setCreating(true); setEditingId(null) }
  const startEdit = (p: typeof products[0]) => { setForm({ name: p.name, category: p.category, image: p.image, description: p.description, specs: p.specs, features: [...(p.features as string[])] }); setEditingId(p.id); setCreating(false) }
  const cancel = () => { setEditingId(null); setCreating(false) }

  const handleSave = () => {
    if (!form.name.trim()) return
    const payload = { ...form, image: form.image || '/images/grass-closeup.jpg', features: form.features.filter(f => f.trim()) }
    if (creating) { createMut.mutate(payload) }
    else if (editingId) { updateMut.mutate({ id: editingId, ...payload }) }
  }

  const updateFeature = (i: number, val: string) => {
    const next = [...form.features]; next[i] = val; setForm({ ...form, features: next })
  }

  if (isLoading) return <div className="text-center py-20 font-body text-stone-500">טוען...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading-lg text-green-900">ניהול מוצרים</h2>
        {!(editingId || creating) && (
          <button onClick={startCreate} className="bg-green-700 text-white px-5 py-2.5 rounded-full font-button hover:bg-green-800 transition-all flex items-center gap-2 border-none cursor-pointer">
            <FaPlus /> הוסף מוצר
          </button>
        )}
      </div>

      {(editingId || creating) && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="font-heading-md text-green-900 mb-4">{creating ? 'מוצר חדש' : 'עריכת מוצר'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div><label className="font-body-sm text-stone-600 block mb-1">שם מוצר</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700" /></div>
            <div><label className="font-body-sm text-stone-600 block mb-1">קטגוריה</label><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700">{categories.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <FileUploader
              value={form.image}
              onChange={url => setForm({ ...form, image: url })}
              label="תמונת מוצר"
              fileType="image"
            />
          </div>

          <div className="mb-4">
            <label className="font-body-sm text-stone-600 block mb-1">Specs</label>
            <input value={form.specs} onChange={e => setForm({ ...form, specs: e.target.value })} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700" />
          </div>

          <div className="mb-4">
            <label className="font-body-sm text-stone-600 block mb-1">תיאור</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700 resize-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {form.features.map((f, i) => (
              <div key={i}><label className="font-body-sm text-stone-600 block mb-1">תכונה {i + 1}</label><input value={f} onChange={e => updateFeature(i, e.target.value)} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700" /></div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="bg-green-700 text-white px-6 py-2.5 rounded-full font-button hover:bg-green-800 transition-all flex items-center gap-2 border-none cursor-pointer"><FaSave /> שמור</button>
            <button onClick={cancel} className="border border-stone-300 text-stone-600 px-6 py-2.5 rounded-full font-button hover:bg-stone-100 transition-all flex items-center gap-2 bg-transparent cursor-pointer"><FaTimes /> ביטול</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded-xl p-4 shadow-sm flex gap-4">
            <div className="relative">
              <img src={p.image || '/images/grass-closeup.jpg'} alt={p.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-heading-sm text-green-800 truncate">{p.name}</h4>
              <span className="font-body-sm text-stone-400">{p.category}</span>
              <div className="flex gap-2 mt-2">
                <button onClick={() => startEdit(p)} className="text-green-600 hover:text-green-800 bg-transparent border-none cursor-pointer"><FaEdit /></button>
                <button onClick={() => { if (confirm('למחוק?')) deleteMut.mutate({ id: p.id }) }} className="text-red-500 hover:text-red-700 bg-transparent border-none cursor-pointer"><FaTrash /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
