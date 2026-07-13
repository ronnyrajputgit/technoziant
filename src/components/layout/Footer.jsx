import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useApp } from '../../context/AppContext'

export function Footer() {
  const { setCursorType } = useApp()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <footer ref={ref} style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
      {/* Top accent line */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

      <div style={{ padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 60px) clamp(40px, 5vw, 60px)' }}>
        <div className="container">

          {/* Giant rotating text */}
          <motion.div
            initial={{ opacity: 0, rotate: -5 }}
            animate={isInView ? { opacity: 1, rotate: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '80px', overflow: 'hidden' }}>
            <h2 style={{
              fontSize: 'clamp(60px, 12vw, 160px)',
              fontWeight: '900',
              fontFamily: 'var(--font-h)',
              lineHeight: 0.85,
              letterSpacing: '-0.05em',
              color: 'var(--text)',
              margin: 0
            }}>
              <span style={{ display: 'block', opacity: 0.08 }}>Techno</span>
              <span style={{ display: 'block', opacity: 0.05, marginLeft: '10%' }}>ziant</span>
            </h2>
          </motion.div>

          {/* Main content grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px', marginBottom: '80px' }}>

            {/* Left - Big CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Let's Talk
              </div>
              <h3 style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: '700',
                fontFamily: 'var(--font-h)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '20px',
                color: 'var(--text)'
              }}>
                Got a project<br />
                in <span className="text-gradient">mind</span>?
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '28px', maxWidth: '320px' }}>
                Drop us a line. We'd love to hear about your idea and how we can bring it to life.
              </p>
              <Link to="/contact" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
                <motion.div
                  whileHover={{ scale: 1.02, gap: '16px' }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: 'var(--text)',
                    cursor: 'pointer'
                  }}>
                  <span style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    transition: 'all 0.3s'
                  }}>→</span>
                  Start a Project
                </motion.div>
              </Link>
            </motion.div>

            {/* Middle - Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Reach Us
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { label: 'Email', value: 'business@technoziant.com', icon: '✉' },
                  { label: 'Phone', value: '+91 98765 43210', icon: '☎' },
                  { label: 'Location', value: 'India', icon: '◎' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '2px' }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '2px' }}>{item.label}</div>
                      <div style={{ fontSize: '14px', color: 'var(--text)', fontWeight: '500' }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Stay Updated
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                Subscribe for updates, insights, and exclusive content.
              </p>
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    padding: '14px 16px',
                    background: 'transparent',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    color: 'var(--text)',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: 'var(--font-b)',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={e => e.target.style.borderColor = '#22c55e'}
                  onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                />
                {subscribed ? (
                  <div style={{ padding: '14px', borderRadius: '12px', fontSize: '13px', fontWeight: '600', color: '#06d6a0', background: 'rgba(6,214,160,0.1)', border: '1px solid rgba(6,214,160,0.2)', textAlign: 'center' }}>
                    Subscribed successfully!
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    style={{
                      padding: '14px',
                      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-b)',
                      transition: 'opacity 0.3s'
                    }}>
                    Subscribe
                  </motion.button>
                )}
              </form>
            </motion.div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--glass-border)', marginBottom: '40px' }} />

          {/* Links row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '40px', marginBottom: '60px' }}>

            {/* Nav links */}
            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {[
                { title: 'Company', links: [{ l: 'Home', p: '/' }, { l: 'Work', p: '/work' }, { l: 'Services', p: '/services' }, { l: 'Contact', p: '/contact' }] },
                { title: 'About', links: [{ l: 'About Us', p: '/about' }, { l: 'Careers', p: '/careers' }, { l: 'FAQ', p: '/faq' }] },
                { title: 'Social', links: [{ l: 'LinkedIn', p: 'https://www.linkedin.com/in/technoziant' }, { l: 'Twitter', p: 'https://x.com/technoziant' }, { l: 'Instagram', p: 'https://instagram.com/technoziant' }, { l: 'GitHub', p: 'https://github.com/technoziant' }] }
              ].map((col, i) => (
                <div key={i}>
                  <div style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: '600' }}>
                    {col.title}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {col.links.map(link => (
                      <li key={link.l} style={{ marginBottom: '8px' }}>
                        <a href={link.p} target={link.p.startsWith('http') ? '_blank' : '_self'} rel={link.p.startsWith('http') ? 'noopener noreferrer' : undefined}
                          onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                          style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s', textDecoration: 'none' }}>
                          {link.l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Logo */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-h)'
                }}>T</div>
                <span style={{ fontSize: '20px', fontWeight: '700', fontFamily: 'var(--font-h)', letterSpacing: '-0.02em' }}>
                  Techno<span style={{ color: '#22c55e' }}>ziant</span>
                </span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                © 2026 All rights reserved
              </div>
            </div>
          </motion.div>

          {/* Bottom - Large decorative text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            style={{ textAlign: 'center', position: 'relative' }}>
            <div style={{
              fontSize: 'clamp(12px, 1.5vw, 16px)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              opacity: 0.3,
              fontFamily: 'var(--font-h)'
            }}>
              Crafted with passion in India
            </div>

            {/* Decorative dots */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '20px'
            }}>
              {[...Array(5)].map((_, i) => (
                <div key={i} style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: 'var(--text-muted)',
                  opacity: 0.2
                }} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
