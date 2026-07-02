import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AdminProvider, useAdmin } from './contexts/AdminContext'
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import GalleryPage from './pages/GalleryPage'
import ArticlesPage from './pages/ArticlesPage'
import FAQPage from './pages/FAQPage'
import ContactPage from './pages/ContactPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminHome from './pages/admin/AdminHome'
import AdminProducts from './pages/admin/AdminProducts'
import AdminArticles from './pages/admin/AdminArticles'
import AdminFAQ from './pages/admin/AdminFAQ'
import AdminGallery from './pages/admin/AdminGallery'
import AdminContent from './pages/admin/AdminContent'
import AdminPages from './pages/admin/AdminPages'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAdmin()

  if (!isLoggedIn) return <Navigate to="/admin" replace />

  return <>{children}</>
}

function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      <ScrollToTop />

      {!isAdminRoute && <TopBar />}
      {!isAdminRoute && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/admin" element={<AdminLogin />} />

          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          >
            <Route path="dashboard" element={<AdminHome />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="articles" element={<AdminArticles />} />
            <Route path="faq" element={<AdminFAQ />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="pages" element={<AdminPages />} />
            <Route path="pages/:pageId" element={<AdminPages />} />
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </>
  )
}

function App() {
  return (
    <div dir="rtl" className="min-h-screen bg-cream-50">
      <AdminProvider>
        <AppContent />
      </AdminProvider>
    </div>
  )
}

export default App