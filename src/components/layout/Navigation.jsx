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
    { p: '/', l: 'Home' },
    { p: '/work', l: 'Work' },
    { p: '/services', l: 'Services' },
    { p: '/about', l: 'About' },
    { p: '/contact', l: 'Contact' }
  ]

  return (
    <>
      <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        style={{
          position: 'fixed', top: '16px', left: 'clamp(16px, 3vw, 60px)', right: 'clamp(16px, 3vw, 60px)', zIndex: 100,
          padding: '0 8px 0 20px',
          height: '64px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderRadius: '100px',
          background: scrolled ? 'rgba(15, 15, 15, 0.85)' : 'rgba(15, 15, 15, 0.5)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.1)',
          transition: 'all 0.4s ease'
        }}>
        <Link to="/" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '17px', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-h)'
          }}>T</div>
          <span style={{
            fontSize: '18px', fontWeight: '700', fontFamily: 'var(--font-h)',
            letterSpacing: '-0.02em', color: '#fff'
          }}>
            Techno<span style={{ color: '#22c55e' }}>ziant</span>
          </span>
        </Link>

        <div className="desktop-nav" style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
          {links.map(ln => (
            <Link key={ln.p} to={ln.p} onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
              style={{
                fontSize: '13px', padding: '8px 14px', borderRadius: '100px', fontWeight: '500',
                color: location.pathname === ln.p ? '#fff' : 'rgba(255,255,255,0.5)',
                background: location.pathname === ln.p ? 'rgba(255,255,255,0.1)' : 'transparent',
                transition: 'all 0.3s', letterSpacing: '0.01em', textDecoration: 'none',
                border: 'none'
              }}>
              {ln.l}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <motion.button onClick={toggleTheme} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', background: 'rgba(255,255,255,0.1)', border: 'none',
              cursor: 'pointer', color: '#fff'
            }}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </motion.button>
          <Link to="/contact" className="desktop-nav"
            onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            style={{
              fontSize: '13px', padding: '10px 20px', borderRadius: '100px', fontWeight: '600',
              letterSpacing: '0.02em', textDecoration: 'none',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: '#fff', transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(34,197,94,0.3)'
            }}>
            Get in Touch
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            style={{
              width: '40px', height: '40px', borderRadius: '50%',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '5px', background: 'rgba(255,255,255,0.1)', border: 'none',
              cursor: 'pointer'
            }}>
            <motion.div animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }} style={{ width: '18px', height: '1.5px', background: '#fff' }} />
            <motion.div animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }} style={{ width: '18px', height: '1.5px', background: '#fff' }} />
            <motion.div animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }} style={{ width: '12px', height: '1.5px', background: '#fff' }} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
            onClick={() => setIsOpen(false)}>
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'absolute', top: '90px', left: 'clamp(16px, 3vw, 60px)', right: 'clamp(16px, 3vw, 60px)',
                borderRadius: '24px', padding: '24px', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto',
                background: 'rgba(15, 15, 15, 0.95)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
              }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Navigation</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <motion.button onClick={toggleTheme} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    style={{
                      width: '34px', height: '34px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px', background: 'rgba(255,255,255,0.1)', border: 'none',
                      cursor: 'pointer', color: '#fff'
                    }}>
                    {theme === 'dark' ? '☀️' : '🌙'}
                  </motion.button>
                  <button onClick={() => setIsOpen(false)} style={{
                    width: '34px', height: '34px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', background: 'rgba(255,255,255,0.1)', border: 'none',
                    cursor: 'pointer', color: '#fff'
                  }}>✕</button>
                </div>
              </div>

              {/* Navigation links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                {links.map((ln, i) => (
                  <motion.div key={ln.p}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}>
                    <Link to={ln.p} onClick={() => setIsOpen(false)}
                      onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '14px 18px', borderRadius: '14px', textDecoration: 'none',
                        color: location.pathname === ln.p ? '#fff' : 'rgba(255,255,255,0.5)',
                        fontSize: '15px', fontWeight: '500', transition: 'all 0.2s',
                        background: location.pathname === ln.p ? 'rgba(255,255,255,0.08)' : 'transparent'
                      }}>
                      <span>{ln.l}</span>
                      <span style={{ opacity: 0.4, fontSize: '14px' }}>→</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                <Link to="/contact" onClick={() => setIsOpen(false)} onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '14px', borderRadius: '14px', fontSize: '14px', fontWeight: '600',
                    textDecoration: 'none', background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: '#fff', transition: 'all 0.3s'
                  }}>
                  Get in Touch →
                </Link>
              </div>

              {/* Footer */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px', marginTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
                <span>hello@technoziant.com</span>
                <span>© 2024 Technoziant</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@media(max-width:900px){.desktop-nav{display:none!important}}`}</style>
    </>
  )
}
