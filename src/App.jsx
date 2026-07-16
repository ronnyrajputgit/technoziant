import { useState, useEffect } from 'react'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navigation } from './components/layout/Navigation'
import { Routes } from './components/layout/Routes'
import { SmoothScroll } from './components/layout/SmoothScroll'
import { ScrollToTop } from './components/ui/ScrollToTop'
import { AppProvider } from './context/AppContext'
import './styles/global.css'

const hideNavPaths = ['/dashboard', '/login']
function shouldHideNav(pathname) {
  return hideNavPaths.some(p => pathname === p || pathname.startsWith(p + '/'))
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const hideNav = shouldHideNav(location.pathname)
  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 500); return () => clearTimeout(t) }, [])

  return (
    <>
      <ScrollToTop />
      {!isLoading && (
        <>
          {!hideNav && <Navigation />}
          {hideNav ? (
            <AnimatePresence mode="wait"><Routes /></AnimatePresence>
          ) : (
            <SmoothScroll>
              <AnimatePresence mode="wait"><Routes /></AnimatePresence>
            </SmoothScroll>
          )}
        </>
      )}
    </>
  )
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  )
}

export default App
