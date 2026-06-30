import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../../contexts/AdminContext'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAdmin()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(password)) {
      navigate('/admin/dashboard')
    } else {
      setError('סיסמה שגויה')
    }
  }

  return (
    <div className="min-h-screen bg-green-950 flex items-center justify-center px-4" style={{ direction: 'rtl' }}>
      <div className="bg-white rounded-[20px] p-8 w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <img src="/images/logo.jpg" alt="עתיד ירוק בע&quot;מ" className="h-16 w-16 rounded-full object-cover mx-auto mb-4" />
          <h1 className="font-heading-xl text-green-900">מערכת ניהול</h1>
          <p className="font-body text-stone-500 mt-2">עתיד ירוק בע"מ — ATID YAROK LTD</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body-sm text-stone-600 block mb-1">סיסמה</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              className="w-full border border-stone-300 rounded-xl px-4 py-3 font-body focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              placeholder="הכנס סיסמה"
              autoFocus
            />
          </div>
          {error && <p className="font-body-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-full font-button hover:bg-green-800 transition-all"
          >
            כניסה
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="font-body-sm text-green-600 hover:text-green-800 transition-colors bg-transparent border-none cursor-pointer"
          >
            חזרה לאתר &larr;
          </button>
        </div>
      </div>
    </div>
  )
}
