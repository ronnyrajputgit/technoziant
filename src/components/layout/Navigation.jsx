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
    { p: '/', l: 'Home', icon: '🏠' },
    { p: '/work', l: 'Work', icon: '💼' },
    { p: '/services', l: 'Services', icon: '⚙️' },
    { p: '/solutions', l: 'Solutions', icon: '💡' },
    { p: '/leaders', l: 'Leaders', icon: '👥' },
    { p: '/process', l: 'Process', icon: '📋' },
    { p: '/about', l: 'About', icon: 'ℹ️' },
    { p: '/careers', l: 'Careers', icon: '🎯' },
    { p: '/faq', l: 'FAQ', icon: '❓' },
    { p: '/contact', l: 'Contact', icon: '✉️' }
  ]

  return (
    <>
      <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className={scrolled ? 'liquid-glass-strong texture-noise' : ''}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '14px clamp(20px, 4vw, 60px)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none',
          transition: 'all 0.4s',
          ...(scrolled ? { borderBottom: '1px solid var(--glass-border)' } : {})
        }}>
        <Link to="/" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
          style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'var(--font-h)', display: 'flex', alignItems: 'center', gap: '2px' }}>
          <span className="text-gradient">MIMO</span><span style={{ opacity: 0.25 }}>/</span><span>STUDIO</span>
        </Link>

        <div className="desktop-nav" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {links.slice(0, 7).map(ln => (
            <Link key={ln.p} to={ln.p} onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
              className={location.pathname === ln.p ? 'liquid-glass' : ''}
              style={{
                fontSize: '11px', padding: '6px 12px', borderRadius: '100px', fontWeight: '500',
                color: location.pathname === ln.p ? 'var(--text)' : 'var(--text-muted)',
                transition: 'all 0.3s', letterSpacing: '0.02em',
                border: location.pathname === ln.p ? '1px solid var(--glass-border)' : '1px solid transparent'
              }}>
              {ln.l}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <motion.button onClick={toggleTheme} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            className="liquid-glass"
            style={{ width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </motion.button>
          <Link to="/contact" className="desktop-nav liquid-glass-strong"
            onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            style={{ fontSize: '11px', padding: '9px 18px', borderRadius: '100px', fontWeight: '600', letterSpacing: '0.04em' }}>
            Start Project
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            className="liquid-glass"
            style={{ width: '38px', height: '38px', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <motion.div animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 5 : 0 }} style={{ width: '16px', height: '1.5px', background: 'var(--text)' }} />
            <motion.div animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }} style={{ width: '16px', height: '1.5px', background: 'var(--text)' }} />
            <motion.div animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -5 : 0 }} style={{ width: '10px', height: '1.5px', background: 'var(--text)' }} />
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
                position: 'absolute', top: '70px', left: 'clamp(20px, 4vw, 60px)', right: 'clamp(20px, 4vw, 60px)',
                borderRadius: '20px', padding: '20px', maxHeight: 'calc(100vh - 100px)', overflowY: 'auto'
              }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text)' }}>Navigation</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <motion.button onClick={toggleTheme} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    className="liquid-glass" style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>
                    {theme === 'dark' ? '☀️' : '🌙'}
                  </motion.button>
                  <button onClick={() => setIsOpen(false)} className="liquid-glass" style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: 'var(--text)' }}>✕</button>
                </div>
              </div>

              {/* Bubble grid */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                {links.map((ln, i) => (
                  <motion.div key={ln.p}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03, duration: 0.3 }}>
                    <Link to={ln.p} onClick={() => setIsOpen(false)}
                      onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                      className={location.pathname === ln.p ? 'liquid-glass-strong' : 'liquid-glass'}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '10px 16px', borderRadius: '100px',
                        color: location.pathname === ln.p ? 'var(--text)' : 'var(--text-muted)',
                        fontSize: '13px', fontWeight: '500', transition: 'all 0.2s'
                      }}>
                      <span style={{ fontSize: '14px' }}>{ln.icon}</span>
                      {ln.l}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Quick links */}
              <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '14px' }}>
                <div style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px', fontWeight: '600' }}>Quick Actions</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Link to="/contact" onClick={() => setIsOpen(false)} className="liquid-glass-strong"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '100px', fontSize: '12px', fontWeight: '600', color: 'var(--text)' }}>
                    ✉️ Get in Touch
                  </Link>
                  <Link to="/work" onClick={() => setIsOpen(false)} className="liquid-glass"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '100px', fontSize: '12px', fontWeight: '500', color: 'var(--text-muted)' }}>
                    💼 View Work
                  </Link>
                  <Link to="/careers" onClick={() => setIsOpen(false)} className="liquid-glass"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '100px', fontSize: '12px', fontWeight: '500', color: 'var(--text-muted)' }}>
                    🎯 Careers
                  </Link>
                </div>
              </div>

              {/* Footer */}
              <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '12px', marginTop: '14px', display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
                <span>hello@mimostudio.dev</span>
                <span>© 2024 MIMO/STUDIO</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@media(max-width:900px){.desktop-nav{display:none!important}}`}</style>
    </>
  )
}
