import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../context/AppContext'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()
  const { setCursorType, theme, toggleTheme } = useApp()

  useEffect(() => { setIsOpen(false) }, [location])
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h)
  }, [])
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
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
      {/* Desktop Nav */}
      {!isMobile && (
        <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{
            position: 'fixed', top: '16px', left: 'clamp(16px, 3vw, 60px)', right: 'clamp(16px, 3vw, 60px)', zIndex: 100,
            height: '52px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderRadius: '10px',
            background: scrolled ? 'var(--nav-bg)' : 'var(--nav-bg-transparent)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border)',
            boxShadow: scrolled ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
            transition: 'all 0.4s ease',
            padding: '0 10px 0 14px'
          }}>
          <Link to="/" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
            <div style={{
              width: '24px', height: '24px', borderRadius: '6px',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10px', fontWeight: '800', color: '#fff', fontFamily: "var(--font-code)"
            }}>{'>'}</div>
            <span style={{ fontSize: '13px', fontWeight: '600', fontFamily: "var(--font-code)", letterSpacing: '-0.01em', color: 'var(--text)' }}>
              <span style={{ color: '#22c55e' }}>techno</span><span style={{ color: 'var(--text-muted)' }}>ziant</span>
            </span>
          </Link>

          <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
            {links.map(ln => (
              <Link key={ln.p} to={ln.p} onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                style={{
                  fontSize: '11px', padding: '5px 10px', borderRadius: '5px', fontWeight: '500',
                  fontFamily: "var(--font-code)",
                  color: location.pathname === ln.p ? '#22c55e' : 'var(--text-muted)',
                  background: location.pathname === ln.p ? 'rgba(34,197,94,0.08)' : 'transparent',
                  transition: 'all 0.2s', textDecoration: 'none',
                  border: location.pathname === ln.p ? '1px solid rgba(34,197,94,0.15)' : '1px solid transparent'
                }}>
                {location.pathname === ln.p && <span style={{ color: '#22c55e', marginRight: '3px', fontSize: '9px' }}>{'>'}</span>}
                {ln.l}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <motion.button onClick={toggleTheme} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
              style={{
                width: '28px', height: '28px', borderRadius: '5px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', background: 'var(--surface)', border: '1px solid var(--glass-border)',
                cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.2s'
              }}>
              {theme === 'dark' ? '☀' : '☽'}
            </motion.button>
            <Link to="/contact" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
              style={{
                fontSize: '11px', padding: '6px 14px', borderRadius: '5px', fontWeight: '600',
                fontFamily: "var(--font-code)", textDecoration: 'none',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: '#fff', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(34,197,94,0.2)'
              }}>
              contact
            </Link>
          </div>
        </motion.nav>
      )}

      {/* Mobile - Floating Hamburger */}
      {isMobile && (
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
          style={{
            position: 'fixed', top: '16px', right: '16px', zIndex: 100,
            width: '44px', height: '44px', borderRadius: '12px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '4px',
            background: scrolled ? 'var(--nav-bg)' : 'var(--nav-bg-transparent)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border)',
            boxShadow: scrolled ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
            cursor: 'pointer', padding: '0', transition: 'all 0.3s'
          }}>
          <motion.div animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 5 : 0 }} style={{ width: '16px', height: '1.5px', background: 'var(--text)' }} />
          <motion.div animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }} style={{ width: '16px', height: '1.5px', background: 'var(--text)' }} />
          <motion.div animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -5 : 0 }} style={{ width: '10px', height: '1.5px', background: 'var(--text)' }} />
        </motion.button>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
            onClick={() => setIsOpen(false)}>
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'absolute', top: 0, right: 0, bottom: 0,
                width: 'min(80vw, 280px)',
                display: 'flex', flexDirection: 'column',
                background: 'var(--nav-bg)',
                borderLeft: '1px solid var(--glass-border)',
                boxShadow: '-10px 0 40px rgba(0,0,0,0.3)'
              }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 14px',
                borderBottom: '1px solid var(--glass-border)',
                background: 'var(--surface)'
              }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ff5f57' }} />
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#febc2e' }} />
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#28c840' }} />
                </div>
                <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>navigation</span>
                <button onClick={() => setIsOpen(false)} style={{
                  width: '20px', height: '20px', borderRadius: '4px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', background: 'transparent', border: 'none',
                  cursor: 'pointer', color: 'var(--text-muted)'
                }}>x</button>
              </div>

              <div style={{ padding: '14px', flex: 1, overflowY: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {links.map((ln, i) => (
                    <motion.div key={ln.p}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}>
                      <Link to={ln.p} onClick={() => setIsOpen(false)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '8px',
                          padding: '10px 10px', borderRadius: '6px', textDecoration: 'none',
                          fontFamily: "var(--font-code)", fontSize: '13px',
                          color: location.pathname === ln.p ? '#22c55e' : 'var(--text-muted)',
                          background: location.pathname === ln.p ? 'rgba(34,197,94,0.06)' : 'transparent',
                          transition: 'all 0.2s'
                        }}>
                        <span style={{ color: location.pathname === ln.p ? '#22c55e' : 'var(--text-muted)', fontSize: '9px' }}>{'>'}</span>
                        <span>{ln.l.charAt(0).toUpperCase() + ln.l.slice(1)}</span>
                        {location.pathname === ln.p && <span style={{ marginLeft: 'auto', fontSize: '8px', color: '#22c55e' }}>●</span>}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                  style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid var(--glass-border)' }}>
                  <button onClick={toggleTheme} style={{
                    width: '100%', padding: '8px 10px', borderRadius: '6px',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    fontFamily: "var(--font-code)", fontSize: '12px',
                    background: 'var(--surface)', border: '1px solid var(--glass-border)',
                    cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.2s'
                  }}>
                    <span>{theme === 'dark' ? '☀' : '☽'}</span>
                    <span>{theme === 'dark' ? 'light mode' : 'dark mode'}</span>
                  </button>
                </motion.div>
              </div>

              <div style={{
                padding: '10px 14px',
                borderTop: '1px solid var(--glass-border)',
                fontFamily: "var(--font-code)",
                fontSize: '9px',
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
    </>
  )
}
