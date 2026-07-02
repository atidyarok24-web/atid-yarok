import { useState, useEffect } from 'react'
import { trpc } from '@/providers/trpc'
import { FaSave, FaCheck, FaHome, FaInfoCircle, FaPhone } from 'react-icons/fa'
import FileUploader from '../../components/FileUploader'

type ActiveTab = 'home' | 'about' | 'contact'

interface ContentForm {
  heroTitle: string
  heroSubtitle: string
  heroBody: string
  heroVideo: string
  heroFallback: string

  aboutLabel: string
  aboutTitle: string
  aboutSubtitle: string
  aboutDescription: string
  aboutStoryTitle: string
  aboutStoryP1: string
  aboutStoryP2: string
  aboutStoryP3: string

  contactPhone1: string
  contactPhone2: string
  contactEmail: string
  contactAddress: string
  contactHours: string
}

const emptyForm: ContentForm = {
  heroTitle: '',
  heroSubtitle: '',
  heroBody: '',
  heroVideo: '',
  heroFallback: '',

  aboutLabel: '',
  aboutTitle: '',
  aboutSubtitle: '',
  aboutDescription: '',
  aboutStoryTitle: '',
  aboutStoryP1: '',
  aboutStoryP2: '',
  aboutStoryP3: '',

  contactPhone1: '',
  contactPhone2: '',
  contactEmail: '',
  contactAddress: '',
  contactHours: '',
}

export default function AdminContent() {
  const utils = trpc.useUtils()
  const { data: settings = [] } = trpc.content.settingsList.useQuery()

  const setMut = trpc.content.settingsSet.useMutation({
    onSuccess: () => {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
      utils.content.settingsList.invalidate()
    },
  })

  const [form, setForm] = useState<ContentForm>(emptyForm)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<ActiveTab>('home')

  useEffect(() => {
    const getVal = (key: string) =>
      settings.find((s) => s.key === key)?.value || ''

    setForm({
      heroTitle: getVal('heroTitle'),
      heroSubtitle: getVal('heroSubtitle'),
      heroBody: getVal('heroBody'),
      heroVideo: getVal('heroVideo'),
      heroFallback: getVal('heroFallback'),

      aboutLabel: getVal('aboutLabel'),
      aboutTitle: getVal('aboutTitle'),
      aboutSubtitle: getVal('aboutSubtitle'),
      aboutDescription: getVal('aboutDescription'),
      aboutStoryTitle: getVal('aboutStoryTitle'),
      aboutStoryP1: getVal('aboutStoryP1'),
      aboutStoryP2: getVal('aboutStoryP2'),
      aboutStoryP3: getVal('aboutStoryP3'),

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

  const tabClass = (tab: ActiveTab) =>
    `flex items-center gap-2 px-5 py-3 rounded-xl font-button transition-all border-none cursor-pointer ${
      activeTab === tab
        ? 'bg-green-700 text-white shadow-sm'
        : 'bg-white text-green-800 hover:bg-green-50 border border-cream-200'
    }`

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading-lg text-green-900">עריכת תוכן האתר</h2>

        <button
          onClick={handleSave}
          className={`px-6 py-2.5 rounded-full font-button transition-all flex items-center gap-2 border-none cursor-pointer ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-green-700 text-white hover:bg-green-800'
          }`}
        >
          {saved ? (
            <>
              <FaCheck /> נשמר!
            </>
          ) : (
            <>
              <FaSave /> שמור שינויים
            </>
          )}
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={() => setActiveTab('home')} className={tabClass('home')}>
          <FaHome /> עמוד ראשי
        </button>

        <button onClick={() => setActiveTab('about')} className={tabClass('about')}>
          <FaInfoCircle /> אודות האתר
        </button>

        <button onClick={() => setActiveTab('contact')} className={tabClass('contact')}>
          <FaPhone /> פרטי קשר
        </button>
      </div>

      {activeTab === 'home' && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="font-heading-md text-green-900 mb-4">
            עמוד ראשי — Hero
          </h3>

          <div className="space-y-4">
            <div>
              <label className="font-body-sm text-stone-600 block mb-1">
                כותרת ראשית
              </label>
              <input
                value={form.heroTitle}
                onChange={(e) =>
                  setForm({ ...form, heroTitle: e.target.value })
                }
                className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700"
              />
            </div>

            <div>
              <label className="font-body-sm text-stone-600 block mb-1">
                כותרת משנית
              </label>
              <input
                value={form.heroSubtitle}
                onChange={(e) =>
                  setForm({ ...form, heroSubtitle: e.target.value })
                }
                className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700"
              />
            </div>

            <div>
              <label className="font-body-sm text-stone-600 block mb-1">
                תיאור
              </label>
              <textarea
                value={form.heroBody}
                onChange={(e) =>
                  setForm({ ...form, heroBody: e.target.value })
                }
                rows={5}
                className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
              <FileUploader
                value={form.heroVideo}
                onChange={(url) => setForm({ ...form, heroVideo: url })}
                label="סרטון Hero — רקע עמוד ראשי"
                folder="videos"
                fileType="video"
              />

              <FileUploader
                value={form.heroFallback}
                onChange={(url) => setForm({ ...form, heroFallback: url })}
                label="תמונת Fallback — כשהסרטון לא נטען"
                folder="images"
                fileType="image"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'about' && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="font-heading-md text-green-900 mb-4">אודות האתר</h3>

          <div className="space-y-4">
            <div>
              <label className="font-body-sm text-stone-600 block mb-1">
                תווית עליונה
              </label>
              <input
                value={form.aboutLabel}
                onChange={(e) =>
                  setForm({ ...form, aboutLabel: e.target.value })
                }
                placeholder="אודות החברה"
                className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700"
              />
            </div>

            <div>
              <label className="font-body-sm text-stone-600 block mb-1">
                כותרת ראשית
              </label>
              <input
                value={form.aboutTitle}
                onChange={(e) =>
                  setForm({ ...form, aboutTitle: e.target.value })
                }
                placeholder='עתיד ירוק בע"מ'
                className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700"
              />
            </div>

            <div>
              <label className="font-body-sm text-stone-600 block mb-1">
                כותרת משנה
              </label>
              <input
                value={form.aboutSubtitle}
                onChange={(e) =>
                  setForm({ ...form, aboutSubtitle: e.target.value })
                }
                placeholder="מובילים בתחום מערכות הדשא הסינתטי בישראל"
                className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700"
              />
            </div>

            <div>
              <label className="font-body-sm text-stone-600 block mb-1">
                תיאור פתיחה
              </label>
              <textarea
                value={form.aboutDescription}
                onChange={(e) =>
                  setForm({ ...form, aboutDescription: e.target.value })
                }
                rows={5}
                className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700 resize-none"
              />
            </div>

            <div>
              <label className="font-body-sm text-stone-600 block mb-1">
                כותרת הסיפור שלנו
              </label>
              <input
                value={form.aboutStoryTitle}
                onChange={(e) =>
                  setForm({ ...form, aboutStoryTitle: e.target.value })
                }
                placeholder="הסיפור שלנו"
                className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700"
              />
            </div>

            <div>
              <label className="font-body-sm text-stone-600 block mb-1">
                פסקה 1
              </label>
              <textarea
                value={form.aboutStoryP1}
                onChange={(e) =>
                  setForm({ ...form, aboutStoryP1: e.target.value })
                }
                rows={5}
                className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700 resize-none"
              />
            </div>

            <div>
              <label className="font-body-sm text-stone-600 block mb-1">
                פסקה 2
              </label>
              <textarea
                value={form.aboutStoryP2}
                onChange={(e) =>
                  setForm({ ...form, aboutStoryP2: e.target.value })
                }
                rows={5}
                className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700 resize-none"
              />
            </div>

            <div>
              <label className="font-body-sm text-stone-600 block mb-1">
                פסקה 3
              </label>
              <textarea
                value={form.aboutStoryP3}
                onChange={(e) =>
                  setForm({ ...form, aboutStoryP3: e.target.value })
                }
                rows={5}
                className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700 resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'contact' && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-heading-md text-green-900 mb-4">פרטי קשר</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-body-sm text-stone-600 block mb-1">
                טלפון משרד
              </label>
              <input
                value={form.contactPhone1}
                onChange={(e) =>
                  setForm({ ...form, contactPhone1: e.target.value })
                }
                className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700"
              />
            </div>

            <div>
              <label className="font-body-sm text-stone-600 block mb-1">
                טלפון פלאפון
              </label>
              <input
                value={form.contactPhone2}
                onChange={(e) =>
                  setForm({ ...form, contactPhone2: e.target.value })
                }
                className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700"
              />
            </div>

            <div>
              <label className="font-body-sm text-stone-600 block mb-1">
                אימייל
              </label>
              <input
                value={form.contactEmail}
                onChange={(e) =>
                  setForm({ ...form, contactEmail: e.target.value })
                }
                className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700"
              />
            </div>

            <div>
              <label className="font-body-sm text-stone-600 block mb-1">
                כתובת
              </label>
              <input
                value={form.contactAddress}
                onChange={(e) =>
                  setForm({ ...form, contactAddress: e.target.value })
                }
                className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-body-sm text-stone-600 block mb-1">
                שעות פעילות
              </label>
              <input
                value={form.contactHours}
                onChange={(e) =>
                  setForm({ ...form, contactHours: e.target.value })
                }
                className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}