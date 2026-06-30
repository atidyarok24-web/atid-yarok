import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import ScrollReveal from '../components/ScrollReveal'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div style={{ direction: 'rtl' }}>
      <section className="relative bg-green-950 min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to left, rgba(2,44,34,0.9) 0%, rgba(2,44,34,0.7) 60%, transparent 100%)' }} />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/product-lounge.jpg)', zIndex: -1 }} />
        <div className="relative z-10 content-max w-full px-4 py-24">
          <div className="max-w-[600px]">
            <span className="font-label text-green-400 block mb-3"><span className="text-green-500 mr-1">&#9679;</span> צור קשר</span>
            <h1 className="font-display-sm text-white mb-4">נשמח לשמוע מכם</h1>
            <p className="font-body-lg text-white/85">השאירו את הפרטים ונחזור אליכם בהקדם עם מענה מקצועי.</p>
          </div>
        </div>
      </section>

      <section className="bg-cream-50 section-padding">
        <div className="content-max">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10">
              <div>
                <h2 className="font-heading-lg text-green-900 mb-6">השאירו פרטים</h2>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div><label className="font-body-sm text-stone-600 block mb-1">שם מלא</label><input type="text" required className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 font-body focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10" /></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label className="font-body-sm text-stone-600 block mb-1">טלפון</label><input type="tel" required className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 font-body focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10" /></div>
                      <div><label className="font-body-sm text-stone-600 block mb-1">אימייל</label><input type="email" required className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 font-body focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10" /></div>
                    </div>
                    <div><label className="font-body-sm text-stone-600 block mb-1">נושא</label><select className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 font-body focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"><option>דשא לבית</option><option>דשא למגרש ספורט</option><option>דשא לגג</option><option>ייעוץ כללי</option></select></div>
                    <div><label className="font-body-sm text-stone-600 block mb-1">הודעה</label><textarea rows={4} className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 font-body focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10 resize-none" /></div>
                    <button type="submit" className="w-full bg-green-700 text-white py-3.5 rounded-full font-button hover:bg-green-800 hover:shadow-glow transition-all">שלחו פנייה</button>
                  </form>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                    <div className="text-green-600 text-5xl mb-4">&#10003;</div>
                    <h3 className="font-heading-lg text-green-800 mb-2">תודה על הפנייה!</h3>
                    <p className="font-body text-stone-600">נחזור אליכם בהקדם עם מענה מקצועי.</p>
                  </div>
                )}
              </div>

              <div>
                <h2 className="font-heading-lg text-green-900 mb-6">פרטי התקשרות</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0"><FaPhone className="text-green-600" /></div>
                    <div><span className="font-heading-sm text-green-800 block">משרד</span><span className="font-body text-stone-600 block">074-707-7595</span></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0"><FaPhone className="text-green-600" /></div>
                    <div><span className="font-heading-sm text-green-800 block">פלאפון</span><span className="font-body text-stone-600 block">052-563-1420</span></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0"><FaEnvelope className="text-green-600" /></div>
                    <div><span className="font-heading-sm text-green-800 block">אימייל</span><span className="font-body text-stone-600">atid.yarok24@gmail.com</span></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0"><FaMapMarkerAlt className="text-green-600" /></div>
                    <div><span className="font-heading-sm text-green-800 block">כתובת</span><span className="font-body text-stone-600">מרכז הרשרון, ת.ד 9427, מיקוד 4040000</span></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0"><FaClock className="text-green-600" /></div>
                    <div><span className="font-heading-sm text-green-800 block">שעות פעילות</span><span className="font-body text-stone-600">א&apos;-ה&apos;: 08:00-18:00, ו&apos;: 08:00-13:00</span></div>
                  </div>
                </div>

                <div className="mt-8">
                  <span className="font-heading-sm text-green-800 block mb-3">עקבו אחרינו</span>
                  <div className="flex items-center gap-3">
                    <a href="#" className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center hover:bg-green-800 transition-colors" aria-label="Facebook"><FaFacebookF /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center hover:bg-green-800 transition-colors" aria-label="Instagram"><FaInstagram /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center hover:bg-green-800 transition-colors" aria-label="WhatsApp"><FaWhatsapp /></a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t-4 border-green-700">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.0!2d34.8!3d32.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDAwJzAwLjAiTiAzNMKwNDgnMDAuMCJF!5e0!3m2!1sen!2sil!4v1" width="100%" height="400" style={{ border: 0, filter: 'grayscale(0.3)' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="מפת מיקום" />
      </section>
    </div>
  )
}
