import { useState, useEffect } from 'react'
import { trpc } from '@/providers/trpc'
import { FaSave, FaCheck } from 'react-icons/fa'
import FileUploader from '../../components/FileUploader'

interface ContentForm {
  heroTitle: string; heroSubtitle: string; heroBody: string;
  heroVideo: string; heroFallback: string;
  contactPhone1: string; contactPhone2: string; contactEmail: string;
  contactAddress: string; contactHours: string;
}

const emptyForm: ContentForm = {
  heroTitle: '', heroSubtitle: '', heroBody: '',
  heroVideo: '', heroFallback: '',
  contactPhone1: '', contactPhone2: '', contactEmail: '',
  contactAddress: '', contactHours: '',
}

export default function AdminContent() {
  const utils = trpc.useUtils()
  const { data: settings = [] } = trpc.content.settingsList.useQuery()
  const setMut = trpc.content.settingsSet.useMutation({ onSuccess: () => { setSaved(true); setTimeout(() => setSaved(false), 2000); utils.content.settingsList.invalidate() } })

  const [form, setForm] = useState<ContentForm>(emptyForm)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const getVal = (key: string) => settings.find(s => s.key === key)?.value || ''
    setForm({
      heroTitle: getVal('heroTitle'),
      heroSubtitle: getVal('heroSubtitle'),
      heroBody: getVal('heroBody'),
      heroVideo: getVal('heroVideo'),
      heroFallback: getVal('heroFallback'),
      contactPhone1: getVal('contactPhone1'),
      contactPhone2: getVal('contactPhone2'),
      contactEmail: getVal('contactEmail'),
      contactAddress: getVal('contactAddress'),
      contactHours: getVal('contactHours'),
    })
  }, [settings])

  const handleSave = () => {
    const entries = Object.entries(form) as [string, string][]
    entries.forEach(([key, value]) => {
      setMut.mutate({ key, value })
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading-lg text-green-900">עריכת תוכן האתר</h2>
        <button onClick={handleSave} className={`px-6 py-2.5 rounded-full font-button transition-all flex items-center gap-2 border-none cursor-pointer ${saved ? 'bg-green-500 text-white' : 'bg-green-700 text-white hover:bg-green-800'}`}>
          {saved ? <><FaCheck /> נשמר!</> : <><FaSave /> שמור שינויים</>}
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h3 className="font-heading-md text-green-900 mb-4">עמוד ראשי — Hero</h3>
        <div className="space-y-4">
          <div><label className="font-body-sm text-stone-600 block mb-1">כותרת ראשית</label><input value={form.heroTitle} onChange={e => setForm({ ...form, heroTitle: e.target.value })} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700" /></div>
          <div><label className="font-body-sm text-stone-600 block mb-1">כותרת משנית</label><input value={form.heroSubtitle} onChange={e => setForm({ ...form, heroSubtitle: e.target.value })} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700" /></div>
          <div><label className="font-body-sm text-stone-600 block mb-1">תיאור</label><textarea value={form.heroBody} onChange={e => setForm({ ...form, heroBody: e.target.value })} rows={4} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700 resize-none" /></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
            <FileUploader
              value={form.heroVideo}
              onChange={url => setForm({ ...form, heroVideo: url })}
              label="סרטון Hero (רקע עמוד ראשי)"
              folder="videos"
              fileType="video"
            />
            <FileUploader
              value={form.heroFallback}
              onChange={url => setForm({ ...form, heroFallback: url })}
              label="תמונת Fallback (כשהסרטון לא נטען)"
              folder="images"
              fileType="image"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-heading-md text-green-900 mb-4">פרטי קשר</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="font-body-sm text-stone-600 block mb-1">טלפון משרד</label><input value={form.contactPhone1} onChange={e => setForm({ ...form, contactPhone1: e.target.value })} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700" /></div>
          <div><label className="font-body-sm text-stone-600 block mb-1">טלפון פלאפון</label><input value={form.contactPhone2} onChange={e => setForm({ ...form, contactPhone2: e.target.value })} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700" /></div>
          <div><label className="font-body-sm text-stone-600 block mb-1">אימייל</label><input value={form.contactEmail} onChange={e => setForm({ ...form, contactEmail: e.target.value })} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700" /></div>
          <div><label className="font-body-sm text-stone-600 block mb-1">כתובת</label><input value={form.contactAddress} onChange={e => setForm({ ...form, contactAddress: e.target.value })} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700" /></div>
          <div className="md:col-span-2"><label className="font-body-sm text-stone-600 block mb-1">שעות פעילות</label><input value={form.contactHours} onChange={e => setForm({ ...form, contactHours: e.target.value })} className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700" /></div>
        </div>
      </div>
    </div>
  )
}
