import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useApp } from '../../context/AppContext'

const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/technoziant', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { name: 'Twitter', url: 'https://x.com/technoziant', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { name: 'YouTube', url: 'https://youtube.com/@technoziant', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
  { name: 'Instagram', url: 'https://instagram.com/technoziant', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg> },
  { name: 'WhatsApp', url: 'https://wa.me/919876543210', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> }
]

export function Footer() {
  const { setCursorType, theme } = useApp()
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

  const codeColors = {
    keyword: 'var(--code-keyword)',
    string: 'var(--code-string)',
    fn: 'var(--code-fn)',
    method: 'var(--code-method)',
    property: 'var(--code-property)',
    text: 'var(--code-text)',
    comment: 'var(--code-comment)',
    bg: 'var(--code-bg)',
    border: 'var(--code-border)'
  }

  return (
    <footer ref={ref} style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
      <div style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${codeColors.border}, transparent)` }} />

      <div style={{ padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 60px) clamp(24px, 3vw, 32px)' }}>
        <div className="container">

          {/* Code Editor Footer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              background: codeColors.bg,
              border: `1px solid ${codeColors.border}`,
              marginBottom: '32px'
            }}>

            {/* Editor Title Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 16px',
              borderBottom: `1px solid ${codeColors.border}`,
              background: 'var(--surface)'
            }}>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
              </div>
              <span style={{ fontSize: '10px', color: codeColors.comment, fontFamily: "var(--font-code)" }}>
                technoziant.config.ts
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['TS', 'ESLint'].map(t => (
                  <span key={t} style={{ fontSize: '8px', padding: '2px 6px', borderRadius: '3px', background: 'var(--surface)', color: codeColors.comment, fontFamily: "var(--font-code)" }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Code Content */}
            <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
              {/* Left - Config */}
              <div style={{ fontFamily: "var(--font-code)", fontSize: '11px', lineHeight: '22px' }}>
                <CodeLine num={1}><span style={{ color: codeColors.comment }}>{'// Technoziant Configuration'}</span></CodeLine>
                <CodeLine num={2}><span style={{ color: codeColors.keyword }}>export const</span> <span style={{ color: codeColors.property }}>config</span> = {'{'}</CodeLine>
                <CodeLine num={3} indent={1}><span style={{ color: codeColors.property }}>name</span>: <span style={{ color: codeColors.string }}>'Technoziant'</span>,</CodeLine>
                <CodeLine num={4} indent={1}><span style={{ color: codeColors.property }}>tagline</span>: <span style={{ color: codeColors.string }}>'We craft digital products'</span>,</CodeLine>
                <CodeLine num={5} indent={1}><span style={{ color: codeColors.property }}>email</span>: <span style={{ color: codeColors.string }}>'business@technoziant.com'</span>,</CodeLine>
                <CodeLine num={6} indent={1}><span style={{ color: codeColors.property }}>location</span>: <span style={{ color: codeColors.string }}>'India'</span>,</CodeLine>
                <CodeLine num={7} indent={1}><span style={{ color: codeColors.property }}>services</span>: [</CodeLine>
                <CodeLine num={8} indent={2}><span style={{ color: codeColors.string }}>'web'</span>, <span style={{ color: codeColors.string }}>'mobile'</span>, <span style={{ color: codeColors.string }}>'design'</span>,</CodeLine>
                <CodeLine num={9} indent={2}><span style={{ color: codeColors.string }}>'cloud'</span>, <span style={{ color: codeColors.string }}>'ai/ml'</span></CodeLine>
                <CodeLine num={10} indent={1}>]</CodeLine>
                <CodeLine num={11}>{'}'}</CodeLine>
              </div>

              {/* Right - Social & Links */}
              <div>
                {/* Social Links */}
                <div style={{ fontFamily: "var(--font-code)", fontSize: '11px', color: codeColors.comment, marginBottom: '10px' }}>
                  {'// Connect with us'}
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {socialLinks.map(social => (
                    <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer"
                      onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '6px 12px', borderRadius: '6px',
                        background: 'var(--surface)', border: `1px solid ${codeColors.border}`,
                        fontSize: '11px', color: 'var(--text-muted)',
                        fontFamily: "var(--font-code)", textDecoration: 'none',
                        transition: 'all 0.2s'
                      }}>
                      {social.icon}
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>

                {/* Newsletter */}
                <div style={{ fontFamily: "var(--font-code)", fontSize: '11px', color: codeColors.comment, marginBottom: '8px' }}>
                  {'// Subscribe'}
                </div>
                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                  <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      background: 'var(--surface)',
                      border: `1px solid ${codeColors.border}`,
                      borderRadius: '6px',
                      color: codeColors.string,
                      fontSize: '11px',
                      outline: 'none',
                      fontFamily: "var(--font-code)"
                    }}
                  />
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    type="submit"
                    style={{
                      padding: '8px 14px',
                      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: "var(--font-code)"
                    }}>
                    {subscribed ? '✓' : '→'}
                  </motion.button>
                </form>

                {/* Quick Links */}
                <div style={{ fontFamily: "var(--font-code)", fontSize: '10px', color: codeColors.comment, marginBottom: '6px' }}>
                  {'// navigation'}
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[
                    { label: 'Home', href: '/' },
                    { label: 'Work', href: '/work' },
                    { label: 'Services', href: '/services' },
                    { label: 'About', href: '/about' },
                    { label: 'Contact', href: '/contact' }
                  ].map(link => (
                    <a key={link.label} href={link.href}
                      onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                      style={{
                        fontFamily: "var(--font-code)",
                        fontSize: '10px',
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        transition: 'all 0.2s'
                      }}>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            paddingTop: '16px',
            borderTop: `1px solid ${codeColors.border}`
          }}>
            <div style={{ fontFamily: "var(--font-code)", fontSize: '10px', color: codeColors.comment }}>
              © 2026 Technoziant. All rights reserved.
            </div>
            <div style={{ fontFamily: "var(--font-code)", fontSize: '10px', color: codeColors.comment }}>
              Software · Cloud · DevOps · AI
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function CodeLine({ num, indent = 0, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', paddingLeft: `${indent * 16}px` }}>
      <span style={{
        color: 'var(--text-muted)',
        opacity: 0.3,
        marginRight: '14px',
        userSelect: 'none',
        fontSize: '10px',
        minWidth: '14px',
        textAlign: 'right'
      }}>
        {num}
      </span>
      <span>{children}</span>
    </div>
  )
}
