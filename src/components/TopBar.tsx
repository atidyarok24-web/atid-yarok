import { FaPhone, FaEnvelope, FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'

export default function TopBar() {
  return (
    <div className="bg-green-900 text-green-300 h-10 hidden md:flex items-center" style={{ direction: 'rtl' }}>
      <div className="content-max w-full flex items-center justify-between px-4">
        <div className="flex items-center gap-6 font-body-sm">
          <a href="tel:0747077595" className="flex items-center gap-2 hover:text-white transition-colors">
            <FaPhone className="text-xs" />
            <span>074-707-7595</span>
          </a>
          <a href="mailto:atid.yarok24@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
            <FaEnvelope className="text-xs" />
            <span>atid.yarok24@gmail.com</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-green-400 hover:text-white transition-colors text-sm" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" className="text-green-400 hover:text-white transition-colors text-sm" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" className="text-green-400 hover:text-white transition-colors text-sm" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </div>
  )
}
