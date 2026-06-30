import { useState } from 'react'
import ScrollReveal from '../../components/ScrollReveal'

export default function ContactCTA() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="bg-green-900 section-padding" style={{ direction: 'rtl' }}>
      <div className="content-max">
        <ScrollReveal>
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="font-display-sm text-white mb-4">
              רוצים שהגינה שלכם תהיה תמיד ירוקה?
            </h2>
            <p className="font-body-lg text-green-300 mb-8">
              השאירו את הפרטים ונחזור אליכם בהקדם עם הצעת מחיר מותאמת אישית.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                <input
                  type="text"
                  placeholder="שם מלא"
                  required
                  className="bg-white/10 border border-green-600 rounded-full px-6 py-3.5 text-white placeholder-green-400 font-body focus:outline-none focus:border-green-400 w-full sm:w-[220px]"
                />
                <input
                  type="tel"
                  placeholder="טלפון"
                  required
                  className="bg-white/10 border border-green-600 rounded-full px-6 py-3.5 text-white placeholder-green-400 font-body focus:outline-none focus:border-green-400 w-full sm:w-[220px]"
                />
                <button
                  type="submit"
                  className="bg-amber-500 text-green-900 px-8 py-3.5 rounded-full font-button hover:bg-amber-400 transition-all whitespace-nowrap"
                >
                  שלחו פנייה
                </button>
              </form>
            ) : (
              <div className="bg-green-800/50 rounded-2xl p-6 mb-6">
                <p className="font-heading-md text-green-300">תודה על הפנייה! נחזור אליכם בהקדם.</p>
              </div>
            )}

            <p className="font-body-sm text-green-300">
              או התקשרו עכשיו: <a href="tel:0747077595" className="text-white hover:underline">074-707-7595</a> | <a href="tel:0525631420" className="text-white hover:underline">052-563-1420</a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
