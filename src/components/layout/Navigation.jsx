import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../context/AppContext'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { setCursorType, theme, toggleTheme } = useApp()

  useEffect(() => { setIsOpen(false) }, [location])
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h)
  }, [])

  const links = [
    { p: '/', l: 'home' },
    { p: '/work', l: 'work' },
    { p: '/services', l: 'services' },
    { p: '/about', l: 'about' },
    { p: '/contact', l: 'contact' }
  ]

  return (
    <>
      <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        style={{
          position: 'fixed', top: '16px', left: 'clamp(16px, 3vw, 60px)', right: 'clamp(16px, 3vw, 60px)', zIndex: 100,
          height: '56px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderRadius: '12px',
          background: scrolled ? 'var(--nav-bg)' : 'var(--nav-bg-transparent)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          boxShadow: scrolled ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
          transition: 'all 0.4s ease',
          padding: '0 12px 0 16px'
        }}>

        {/* Logo - Terminal style */}
        <Link to="/" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '6px',
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: '800', color: '#fff', fontFamily: "'JetBrains Mono', monospace"
          }}>{'>'}</div>
          <span style={{
            fontSize: '14px', fontWeight: '600', fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: '-0.02em', color: 'var(--text)'
          }}>
            <span style={{ color: '#22c55e' }}>techno</span><span style={{ color: 'var(--text-muted)' }}>ziant</span>
          </span>
        </Link>

        {/* Desktop Nav - Code style */}
        <div className="desktop-nav" style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
          {links.map(ln => (
            <Link key={ln.p} to={ln.p} onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
              style={{
                fontSize: '12px', padding: '6px 12px', borderRadius: '6px', fontWeight: '500',
                fontFamily: "'JetBrains Mono', monospace",
                color: location.pathname === ln.p ? '#22c55e' : 'var(--text-muted)',
                background: location.pathname === ln.p ? 'rgba(34,197,94,0.08)' : 'transparent',
                transition: 'all 0.2s', letterSpacing: '0.01em', textDecoration: 'none',
                border: location.pathname === ln.p ? '1px solid rgba(34,197,94,0.15)' : '1px solid transparent'
              }}>
              {location.pathname === ln.p && <span style={{ color: '#22c55e', marginRight: '4px' }}>{'>'}</span>}
              {ln.l}
            </Link>
          ))}
        </div>

        {/* Right section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Theme toggle - code style */}
          <motion.button onClick={toggleTheme} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            style={{
              width: '32px', height: '32px', borderRadius: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', background: 'var(--surface)', border: '1px solid var(--glass-border)',
              cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.2s'
            }}>
            {theme === 'dark' ? '☀' : '☽'}
          </motion.button>

          {/* CTA Button */}
          <Link to="/contact" className="desktop-nav"
            onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            style={{
              fontSize: '12px', padding: '8px 16px', borderRadius: '6px', fontWeight: '600',
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.01em', textDecoration: 'none',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: '#fff', transition: 'all 0.2s', boxShadow: '0 2px 10px rgba(34,197,94,0.2)'
            }}>
            contact
          </Link>

          {/* Hamburger */}
          <button onClick={() => setIsOpen(!isOpen)} onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            style={{
              width: '32px', height: '32px', borderRadius: '6px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '4px', background: 'var(--surface)', border: '1px solid var(--glass-border)',
              cursor: 'pointer', padding: '0'
            }}>
            <motion.div animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 5 : 0 }} style={{ width: '14px', height: '1.5px', background: 'var(--text)' }} />
            <motion.div animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }} style={{ width: '14px', height: '1.5px', background: 'var(--text)' }} />
            <motion.div animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -5 : 0 }} style={{ width: '10px', height: '1.5px', background: 'var(--text)' }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu - Terminal style */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
            onClick={() => setIsOpen(false)}>
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'absolute', top: 0, right: 0, bottom: 0,
                width: 'min(85vw, 300px)',
                display: 'flex', flexDirection: 'column',
                background: 'var(--nav-bg)',
                borderLeft: '1px solid var(--glass-border)',
                boxShadow: '-10px 0 40px rgba(0,0,0,0.3)'
              }}>

              {/* Terminal Header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 16px',
                borderBottom: '1px solid var(--glass-border)',
                background: 'var(--surface)'
              }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>
                  ~/navigation
                </span>
                <button onClick={() => setIsOpen(false)} style={{
                  width: '24px', height: '24px', borderRadius: '4px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', background: 'transparent', border: 'none',
                  cursor: 'pointer', color: 'var(--text-muted)'
                }}>✕</button>
              </div>

              {/* Terminal Content */}
              <div style={{ padding: '16px', flex: 1, overflowY: 'auto' }}>
                {/* Prompt */}
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', marginBottom: '16px', color: 'var(--text-muted)' }}>
                  <span style={{ color: '#22c55e' }}>technoziant</span>
                  <span style={{ color: 'var(--text-muted)' }}>@</span>
                  <span style={{ color: '#4f8eff' }}>web</span>
                  <span style={{ color: 'var(--text-muted)' }}> $ ls pages/</span>
                </div>

                {/* Nav links */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {links.map((ln, i) => (
                    <motion.div key={ln.p}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}>
                      <Link to={ln.p} onClick={() => setIsOpen(false)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '8px',
                          padding: '10px 12px', borderRadius: '6px', textDecoration: 'none',
                          fontFamily: "'JetBrains Mono', monospace", fontSize: '13px',
                          color: location.pathname === ln.p ? '#22c55e' : 'var(--text-muted)',
                          background: location.pathname === ln.p ? 'rgba(34,197,94,0.06)' : 'transparent',
                          transition: 'all 0.2s'
                        }}>
                        <span style={{ color: location.pathname === ln.p ? '#22c55e' : 'var(--text-muted)', fontSize: '10px' }}>{'>'}</span>
                        <span>{ln.l}.tsx</span>
                        {location.pathname === ln.p && <span style={{ marginLeft: 'auto', fontSize: '9px', color: '#22c55e' }}>●</span>}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Theme toggle */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                  style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--glass-border)' }}>
                  <button onClick={toggleTheme} style={{
                    width: '100%', padding: '10px 12px', borderRadius: '6px',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '12px',
                    background: 'var(--surface)', border: '1px solid var(--glass-border)',
                    cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.2s'
                  }}>
                    <span>{theme === 'dark' ? '☀' : '☽'}</span>
                    <span>{theme === 'dark' ? 'light mode' : 'dark mode'}</span>
                  </button>
                </motion.div>
              </div>

              {/* Terminal Footer */}
              <div style={{
                padding: '12px 16px',
                borderTop: '1px solid var(--glass-border)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: 'var(--text-muted)',
                display: 'flex', justifyContent: 'space-between'
              }}>
                <span>© 2026</span>
                <span style={{ color: '#22c55e' }}>technoziant</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        @media(max-width:900px){.desktop-nav{display:none!important}}
      `}</style>
    </>
  )
}
