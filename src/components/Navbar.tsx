import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

const navLinks = [
  { path: '/', label: 'עמוד הבית' },
  { path: '/about', label: 'אודות' },
  { path: '/products', label: 'קו מוצרים' },
  { path: '/gallery', label: 'גלריה' },
  { path: '/articles', label: 'מאמרים' },
  { path: '/faq', label: 'שאלות ותשובות' },
  { path: '/contact', label: 'צור קשר' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 50)
      if (currentY > lastScrollY && currentY > 200) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      setLastScrollY(currentY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[70px] flex items-center transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-md'
            : 'bg-transparent'
        } ${hidden && !mobileOpen ? '-translate-y-full' : 'translate-y-0'}`}
        style={{ top: scrolled ? 0 : 40 }}
      >
        <div className="content-max w-full flex items-center justify-between px-4" style={{ direction: 'rtl' }}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/logo.jpg"
              alt="עתיד ירוק"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex flex-col items-start">
              <span className={`font-heading-sm transition-colors ${scrolled ? 'text-green-800' : 'text-white'}`}>
                עתיד ירוק
              </span>
              <span className={`font-label text-[0.6rem] transition-colors ${scrolled ? 'text-green-600' : 'text-green-400'}`}>
                ATID YAROK LTD
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-nav relative py-2 transition-colors ${
                  isActive(link.path)
                    ? scrolled
                      ? 'text-green-700 font-bold'
                      : 'text-green-300 font-bold'
                    : scrolled
                    ? 'text-green-800 hover:text-green-700'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 right-0 w-full h-0.5 bg-green-700 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            to="/contact"
            className="hidden lg:block bg-green-700 text-white px-6 py-2.5 rounded-full font-button hover:bg-green-800 hover:shadow-glow transition-all"
          >
            צור קשר
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden text-2xl transition-colors ${scrolled ? 'text-green-800' : 'text-white'}`}
            aria-label="תפריט"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-green-950/98 flex flex-col items-center justify-center gap-6 lg:hidden">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 left-6 text-white text-3xl"
            aria-label="סגור"
          >
            <FaTimes />
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-heading-md text-green-100 hover:text-white transition-colors ${
                isActive(link.path) ? 'text-white font-bold' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-4 bg-green-700 text-white px-8 py-3 rounded-full font-button hover:bg-green-600 transition-all"
          >
            צור קשר
          </Link>
        </div>
      )}
    </>
  )
}
