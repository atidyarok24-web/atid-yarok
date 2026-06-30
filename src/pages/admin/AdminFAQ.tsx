import { useState } from 'react'
import { trpc } from '@/providers/trpc'
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa'

interface FAQForm { question: string; answer: string }
const emptyForm: FAQForm = { question: '', answer: '' }

export default function AdminFAQ() {
  const utils = trpc.useUtils()
  const { data: faq = [], isLoading } = trpc.content.faqList.useQuery()
  const createMut = trpc.content.faqCreate.useMutation({ onSuccess: () => { utils.content.faqList.invalidate(); cancel() } })
  const updateMut = trpc.content.faqUpdate.useMutation({ onSuccess: () => { utils.content.faqList.invalidate(); cancel() } })
  const deleteMut = trpc.content.faqDelete.useMutation({ onSuccess: () => utils.content.faqList.invalidate() })

  const [editingId, setEditingId] = useState<number | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<FAQForm>(emptyForm)

  const startCreate = () => { setForm(emptyForm); setCreating(true); setEditingId(null) }
  const startEdit = (f: typeof faq[0]) => { setForm({ question: f.question, answer: f.answer }); setEditingId(f.id); setCreating(false) }
  const cancel = () => { setEditingId(null); setCreating(false) }

  const handleSave = () => {
    if (!form.question.trim() || !form.answer.trim()) return
    if (creating) createMut.mutate(form)
    else if (editingId) updateMut.mutate({ id: editingId, ...form })
  }

  if (isLoading) return <div className="text-center py-20 font-body text-stone-500">טוען...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading-lg text-green-900">ניהול שאלות ותשובות</h2>
        {!(editingId || creating) && (
          <button onClick={startCreate} className="bg-green-700 text-white px-5 py-2.5 rounded-full font-button hover:bg-green-800 transition-all flex items-center gap-2 border-none cursor-pointer"><FaPlus /> הוסף שאלה</button>
        )}
      </div>

      {(editingId || creating) && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="font-heading-md text-green-900 mb-4">{creating ? 'שאלה חדשה' : 'עריכת שאלה'}</h3>
          <div className="mb-4"><label className="font-body-sm text-stone-600 block mb-1">שאלה</label><input value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700" /></div>
          <div className="mb-4"><label className="font-body-sm text-stone-600 block mb-1">תשובה</label><textarea value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })} rows={4} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700 resize-none" /></div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="bg-green-700 text-white px-6 py-2.5 rounded-full font-button hover:bg-green-800 transition-all flex items-center gap-2 border-none cursor-pointer"><FaSave /> שמור</button>
            <button onClick={cancel} className="border border-stone-300 text-stone-600 px-6 py-2.5 rounded-full font-button hover:bg-stone-100 transition-all flex items-center gap-2 bg-transparent cursor-pointer"><FaTimes /> ביטול</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {faq.map((f, i) => (
          <div key={f.id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="font-label text-green-600 text-[0.6rem] mr-2">#{i + 1}</span>
                <h4 className="font-heading-sm text-green-800 inline">{f.question}</h4>
                <p className="font-body-sm text-stone-500 mt-1">{f.answer}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => startEdit(f)} className="text-green-600 hover:text-green-800 bg-transparent border-none cursor-pointer"><FaEdit /></button>
                <button onClick={() => { if (confirm('למחוק?')) deleteMut.mutate({ id: f.id }) }} className="text-red-500 hover:text-red-700 bg-transparent border-none cursor-pointer"><FaTrash /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
