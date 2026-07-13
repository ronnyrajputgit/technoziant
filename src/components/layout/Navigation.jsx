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
            style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
            onClick={() => setIsOpen(false)}>
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'absolute', top: 0, right: 0, bottom: 0,
                width: 'min(85vw, 340px)', padding: '24px 20px',
                display: 'flex', flexDirection: 'column',
                background: 'rgba(12, 12, 12, 0.98)', backdropFilter: 'blur(24px)',
                borderLeft: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '-20px 0 60px rgba(0,0,0,0.5)'
              }}>
              {/* Close button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
                <button onClick={() => setIsOpen(false)} style={{
                  width: '40px', height: '40px', borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                  cursor: 'pointer', color: 'rgba(255,255,255,0.5)', transition: 'all 0.2s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}>
                  ✕
                </button>
              </div>

              {/* Navigation links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                {links.map((ln, i) => (
                  <motion.div key={ln.p}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}>
                    <Link to={ln.p} onClick={() => setIsOpen(false)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '16px 14px', borderRadius: '12px', textDecoration: 'none',
                        color: location.pathname === ln.p ? '#fff' : 'rgba(255,255,255,0.45)',
                        fontSize: '16px', fontWeight: location.pathname === ln.p ? '600' : '400',
                        transition: 'all 0.2s', letterSpacing: '0.01em',
                        background: location.pathname === ln.p ? 'rgba(255,255,255,0.06)' : 'transparent'
                      }}>
                      <span>{ln.l}</span>
                      <span style={{ opacity: 0.3, fontSize: '13px' }}>→</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Bottom section */}
              <div style={{ marginTop: 'auto' }}>
                {/* Theme toggle */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                  style={{ marginBottom: '16px' }}>
                  <button onClick={toggleTheme} style={{
                    width: '100%', padding: '14px', borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    fontSize: '13px', fontWeight: '500',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                    cursor: 'pointer', color: 'rgba(255,255,255,0.6)', transition: 'all 0.2s'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}>
                    <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                </motion.div>

                {/* CTA */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                  <Link to="/contact" onClick={() => setIsOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      padding: '16px', borderRadius: '14px', fontSize: '15px', fontWeight: '600',
                      textDecoration: 'none', background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                      color: '#fff', transition: 'all 0.3s', boxShadow: '0 8px 30px rgba(34,197,94,0.25)'
                    }}>
                    Get in Touch →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@media(max-width:900px){.desktop-nav{display:none!important}}`}</style>
    </>
  )
}
