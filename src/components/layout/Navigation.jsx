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
    { p: '/leaders', l: 'Team' },
    { p: '/about', l: 'About' },
    { p: '/contact', l: 'Contact' }
  ]

  return (
    <>
      <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className={scrolled ? 'liquid-glass-strong texture-noise' : ''}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '0 clamp(20px, 4vw, 60px)',
          height: '72px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none',
          transition: 'all 0.4s',
          ...(scrolled ? { borderBottom: '1px solid var(--glass-border)' } : {})
        }}>
        <Link to="/" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-h)'
          }}>T</div>
          <span style={{
            fontSize: '20px', fontWeight: '700', fontFamily: 'var(--font-h)',
            letterSpacing: '-0.02em', color: 'var(--text)'
          }}>
            Techno<span style={{ color: 'var(--accent-3)' }}>ziant</span>
          </span>
        </Link>

        <div className="desktop-nav" style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
          {links.map(ln => (
            <Link key={ln.p} to={ln.p} onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
              className={location.pathname === ln.p ? 'liquid-glass' : ''}
              style={{
                fontSize: '13px', padding: '8px 16px', borderRadius: '100px', fontWeight: '500',
                color: location.pathname === ln.p ? 'var(--text)' : 'var(--text-muted)',
                transition: 'all 0.3s', letterSpacing: '0.01em', textDecoration: 'none',
                border: location.pathname === ln.p ? '1px solid var(--glass-border)' : '1px solid transparent'
              }}>
              {ln.l}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <motion.button onClick={toggleTheme} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            className="liquid-glass"
            style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </motion.button>
          <Link to="/contact" className="desktop-nav"
            onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            style={{
              fontSize: '13px', padding: '10px 22px', borderRadius: '100px', fontWeight: '600',
              letterSpacing: '0.02em', textDecoration: 'none',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: '#fff', transition: 'all 0.3s'
            }}>
            Get in Touch
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            className="liquid-glass"
            style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
            <motion.div animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }} style={{ width: '18px', height: '1.5px', background: 'var(--text)' }} />
            <motion.div animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }} style={{ width: '18px', height: '1.5px', background: 'var(--text)' }} />
            <motion.div animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }} style={{ width: '12px', height: '1.5px', background: 'var(--text)' }} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
            onClick={() => setIsOpen(false)}>
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              onClick={e => e.stopPropagation()}
              className="liquid-glass-strong texture-noise"
              style={{
                position: 'absolute', top: '84px', left: 'clamp(20px, 4vw, 60px)', right: 'clamp(20px, 4vw, 60px)',
                borderRadius: '24px', padding: '24px', maxHeight: 'calc(100vh - 110px)', overflowY: 'auto'
              }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Navigation</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <motion.button onClick={toggleTheme} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    className="liquid-glass" style={{ width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                    {theme === 'dark' ? '☀️' : '🌙'}
                  </motion.button>
                  <button onClick={() => setIsOpen(false)} className="liquid-glass" style={{ width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: 'var(--text)' }}>✕</button>
                </div>
              </div>

              {/* Navigation links - vertical list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '20px' }}>
                {links.map((ln, i) => (
                  <motion.div key={ln.p}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}>
                    <Link to={ln.p} onClick={() => setIsOpen(false)}
                      onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                      className={location.pathname === ln.p ? 'liquid-glass-strong' : 'liquid-glass'}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '14px 18px', borderRadius: '14px', textDecoration: 'none',
                        color: location.pathname === ln.p ? 'var(--text)' : 'var(--text-muted)',
                        fontSize: '15px', fontWeight: '500', transition: 'all 0.2s'
                      }}>
                      <span>{ln.l}</span>
                      <span style={{ opacity: 0.4, fontSize: '14px' }}>→</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '16px' }}>
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
              <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '14px', marginTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
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
