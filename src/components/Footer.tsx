import { Link } from 'react-router-dom'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import ScrollReveal from './ScrollReveal'

export default function Footer() {
  return (
    <footer className="bg-green-950" style={{ direction: 'rtl' }}>
      <div className="content-max px-4 py-16 lg:py-20">
        <ScrollReveal stagger={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1 - Company Info */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <img src="/images/logo.jpg" alt="עתיד ירוק" className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <span className="font-heading-sm text-white block">עתיד ירוק בע"מ</span>
                  <span className="font-label text-green-500 text-[0.6rem]">ATID YAROK LTD</span>
                </div>
              </div>
              <p className="font-body-sm text-green-300 mb-4">
                דשא סינתטי איכותי — ירוק לנצח
              </p>
              <div className="space-y-2 font-body-sm text-green-300">
                <div className="flex items-center gap-2">
                  <FaPhone className="text-green-500 text-xs" />
                  <span>074-707-7595</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-green-500 text-xs" />
                  <span>052-563-1420</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-green-500 text-xs" />
                  <span>atid.yarok24@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-green-500 text-xs" />
                  <span>מרכז הרשרון, ת.ד 9427</span>
                </div>
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div>
              <h4 className="font-heading-sm text-white mb-4">ניווט מהיר</h4>
              <ul className="space-y-2">
                {[
                  { path: '/', label: 'עמוד הבית' },
                  { path: '/about', label: 'אודות' },
                  { path: '/products', label: 'קו מוצרים' },
                  { path: '/gallery', label: 'גלריה' },
                  { path: '/articles', label: 'מאמרים' },
                  { path: '/contact', label: 'צור קשר' },
                ].map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="font-body-sm text-green-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Services */}
            <div>
              <h4 className="font-heading-sm text-white mb-4">שירותים</h4>
              <ul className="space-y-2 font-body-sm text-green-300">
                <li className="hover:text-white transition-colors cursor-pointer">דשא סינתטי לבתים</li>
                <li className="hover:text-white transition-colors cursor-pointer">דשא למגרשי ספורט</li>
                <li className="hover:text-white transition-colors cursor-pointer">גגות ירוקים</li>
                <li className="hover:text-white transition-colors cursor-pointer">גינון מסחרי</li>
                <li className="hover:text-white transition-colors cursor-pointer">ייעוץ והתקנה</li>
              </ul>
            </div>

            {/* Column 4 - Contact Form */}
            <div>
              <h4 className="font-heading-sm text-white mb-4">השאירו פרטים</h4>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                <input
                  type="text"
                  placeholder="שם מלא"
                  className="w-full bg-transparent border-b border-green-700 text-white placeholder-green-400 py-2 font-body-sm focus:outline-none focus:border-green-500"
                />
                <input
                  type="tel"
                  placeholder="טלפון"
                  className="w-full bg-transparent border-b border-green-700 text-white placeholder-green-400 py-2 font-body-sm focus:outline-none focus:border-green-500"
                />
                <button
                  type="submit"
                  className="bg-green-700 text-white px-6 py-2 rounded-full font-button hover:bg-green-600 transition-all mt-2"
                >
                  שלח
                </button>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-800">
        <div className="content-max px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2" style={{ direction: 'rtl' }}>
          <p className="font-body-sm text-green-400">
            &copy; 2026 עתיד ירוק בע"מ. כל הזכויות שמורות.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="font-body-sm text-green-400 hover:text-white transition-colors">מדיניות פרטיות</a>
            <a href="#" className="font-body-sm text-green-400 hover:text-white transition-colors">תנאי שימוש</a>
            <a href="#" className="font-body-sm text-green-400 hover:text-white transition-colors">הצהרת נגישות</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-green-400 hover:text-white transition-colors" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" className="text-green-400 hover:text-white transition-colors" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className="text-green-400 hover:text-white transition-colors" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
