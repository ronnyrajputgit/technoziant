import { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { api } from '../utils/api'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [cursorType, setCursorType] = useState('default')
  const [cursorText, setCursorText] = useState('')
  const [theme, setTheme] = useState('dark')
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    try {
      const token = localStorage.getItem('blog_token')
      if (token) {
        const decoded = jwtDecode(token)
        if (decoded.exp * 1000 > Date.now()) {
          setUser({ id: decoded.id, email: decoded.email, role: decoded.role })
        } else {
          localStorage.removeItem('blog_token')
        }
      }
    } catch {
      localStorage.removeItem('blog_token')
    }
    setAuthLoading(false)
  }, [])

  const login = async (email, password) => {
    const data = await api.login(email, password)
    localStorage.setItem('blog_token', data.token)
    setUser(data.user)
    return data
  }

  const logout = () => {
    localStorage.removeItem('blog_token')
    setUser(null)
  }

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <AppContext.Provider value={{ cursorType, setCursorType, cursorText, setCursorText, theme, toggleTheme, user, login, logout, authLoading }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() { return useContext(AppContext) }
