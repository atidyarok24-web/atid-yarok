import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface AdminContextType {
  isLoggedIn: boolean
  login: (password: string) => boolean
  logout: () => void
}

const AdminContext = createContext<AdminContextType | null>(null)

const ADMIN_PASSWORD = 'atid2026!'

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('admin_logged_in') === 'true'
  })

  const login = useCallback((password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
      localStorage.setItem('admin_logged_in', 'true')
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    localStorage.removeItem('admin_logged_in')
  }, [])

  return (
    <AdminContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}
