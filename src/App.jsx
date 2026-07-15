import { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navigation } from './components/layout/Navigation'
import { Routes } from './components/layout/Routes'
import { SmoothScroll } from './components/layout/SmoothScroll'
import { ScrollToTop } from './components/ui/ScrollToTop'
import { AppProvider } from './context/AppContext'
import './styles/global.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 500); return () => clearTimeout(t) }, [])

  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        {!isLoading && (
          <SmoothScroll>
            <Navigation />
            <AnimatePresence mode="wait"><Routes /></AnimatePresence>
          </SmoothScroll>
        )}
      </Router>
    </AppProvider>
  )
}

export default App
