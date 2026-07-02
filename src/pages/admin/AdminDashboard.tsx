import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../contexts/AdminContext'
import { trpc } from '@/providers/trpc'
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaNewspaper,
  FaQuestionCircle,
  FaImages,
  FaCog,
  FaFileAlt,
  FaSignOutAlt,
  FaHome,
} from 'react-icons/fa'

const mainNavItems = [
  { to: '/admin/dashboard', label: 'לוח בקרה', icon: FaTachometerAlt },
  { to: '/admin/products', label: 'מוצרים', icon: FaBoxOpen },
  { to: '/admin/articles', label: 'מאמרים', icon: FaNewspaper },
  { to: '/admin/faq', label: 'שאלות ותשובות', icon: FaQuestionCircle },
  { to: '/admin/gallery', label: 'גלריה', icon: FaImages },
  { to: '/admin/content', label: 'תוכן האתר', icon: FaCog },
  { to: '/admin/pages', label: 'ניהול עמודים', icon: FaFileAlt },
]

export default function AdminDashboard() {
  const { logout } = useAdmin()
  const navigate = useNavigate()

  const { data: products } = trpc.content.productList.useQuery()
  const { data: articlesList } = trpc.content.articleList.useQuery()
  const { data: faq } = trpc.content.faqList.useQuery()
  const { data: gallery } = trpc.content.galleryList.useQuery()
  const { data: pages = [] } = trpc.content.pageList.useQuery()

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-cream-50 flex" style={{ direction: 'rtl' }}>
      <aside className="w-64 bg-green-950 text-white flex flex-col fixed h-full overflow-y-auto z-10">
        <div className="p-6 border-b border-green-800">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.jpg"
              alt="לוגו"
              className="h-10 w-10 rounded-full object-cover"
            />

            <div>
              <span className="font-heading-sm text-white block leading-tight">
                עתיד ירוק
              </span>
              <span className="font-label text-green-400 text-[0.55rem]">
                בע&quot;מ — ATID YAROK LTD
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-body transition-all ${
                  isActive
                    ? 'bg-green-700 text-white'
                    : 'text-green-300 hover:bg-green-800 hover:text-white'
                }`
              }
            >
              <item.icon className="text-sm flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}

          {pages.length > 0 && (
            <div className="pt-4 mt-4 border-t border-green-800">
              <span className="font-label text-green-500 text-[0.6rem] block px-4 mb-2">
                עמודים מותאמים
              </span>

              <div className="space-y-1">
                {pages.map((page) => (
                  <NavLink
                    key={page.id}
                    to={`/admin/pages/${page.id}`}
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 rounded-xl font-body-sm transition-all ${
                        isActive
                          ? 'bg-green-700 text-white'
                          : 'text-green-300 hover:bg-green-800 hover:text-white'
                      }`
                    }
                  >
                    <FaFileAlt className="text-xs flex-shrink-0" />
                    <span className="truncate">{page.title}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </nav>

        <div className="p-3 border-t border-green-800 space-y-1">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-body text-green-300 hover:bg-green-800 hover:text-white transition-all w-full text-right bg-transparent border-none cursor-pointer"
          >
            <FaHome className="text-sm flex-shrink-0" />
            <span>חזרה לאתר</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-body text-green-300 hover:bg-red-800 hover:text-white transition-all w-full text-right bg-transparent border-none cursor-pointer"
          >
            <FaSignOutAlt className="text-sm flex-shrink-0" />
            <span>התנתקות</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 mr-64">
        <header className="bg-white border-b border-cream-200 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h1 className="font-heading-lg text-green-900">
              מערכת ניהול — עתיד ירוק בע&quot;מ
            </h1>

            <div className="flex items-center gap-4">
              <span className="font-body-sm text-stone-500">
                מוצרים: {products?.length ?? 0} | מאמרים:{' '}
                {articlesList?.length ?? 0} | שאלות: {faq?.length ?? 0} |
                תמונות: {gallery?.length ?? 0} | עמודים: {pages.length}
              </span>
            </div>
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}