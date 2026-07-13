import { useState, useRef } from 'react'
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
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

      <div style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 60px) clamp(30px, 4vw, 40px)' }}>
        <div className="container">

          {/* Code Editor Footer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass"
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.06)',
              marginBottom: '40px'
            }}>

            {/* Editor Title Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)'
            }}>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
              </div>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: "'JetBrains Mono', monospace" }}>
                technoziant.config.ts
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['Git', 'npm', 'CI/CD'].map(t => (
                  <span key={t} style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Code Content */}
            <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              {/* Left - Config */}
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', lineHeight: '24px' }}>
                <CodeLine num={1} indent={0}>
                  <span style={{ color: '#c678dd' }}>export const</span>
                  <span style={{ color: '#e4eaf5' }}> technoziant = {'{'}</span>
                </CodeLine>
                <CodeLine num={2} indent={1}>
                  <span style={{ color: '#e06c75' }}>name</span>
                  <span style={{ color: '#abb2bf' }}>: </span>
                  <span style={{ color: '#98c379' }}>'Technoziant'</span>
                  <span style={{ color: '#abb2bf' }}>,</span>
                </CodeLine>
                <CodeLine num={3} indent={1}>
                  <span style={{ color: '#e06c75' }}>tagline</span>
                  <span style={{ color: '#abb2bf' }}>: </span>
                  <span style={{ color: '#98c379' }}>'We craft digital products'</span>
                  <span style={{ color: '#abb2bf' }}>,</span>
                </CodeLine>
                <CodeLine num={4} indent={1}>
                  <span style={{ color: '#e06c75' }}>location</span>
                  <span style={{ color: '#abb2bf' }}>: </span>
                  <span style={{ color: '#98c379' }}>'India'</span>
                  <span style={{ color: '#abb2bf' }}>,</span>
                </CodeLine>
                <CodeLine num={5} indent={1}>
                  <span style={{ color: '#e06c75' }}>email</span>
                  <span style={{ color: '#abb2bf' }}>: </span>
                  <span style={{ color: '#98c379' }}>'business@technoziant.com'</span>
                  <span style={{ color: '#abb2bf' }}>,</span>
                </CodeLine>
                <CodeLine num={6} indent={1}>
                  <span style={{ color: '#e06c75' }}>socials</span>
                  <span style={{ color: '#abb2bf' }}>: {'{'}</span>
                </CodeLine>
                <CodeLine num={7} indent={2}>
                  <span style={{ color: '#e06c75' }}>linkedin</span>
                  <span style={{ color: '#abb2bf' }}>: </span>
                  <a href="https://www.linkedin.com/in/technoziant" target="_blank" rel="noopener noreferrer"
                    style={{ color: '#61afef', textDecoration: 'none' }}
                    onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
                    'linkedin/in/technoziant'
                  </a>
                  <span style={{ color: '#abb2bf' }}>,</span>
                </CodeLine>
                <CodeLine num={8} indent={2}>
                  <span style={{ color: '#e06c75' }}>twitter</span>
                  <span style={{ color: '#abb2bf' }}>: </span>
                  <a href="https://x.com/technoziant" target="_blank" rel="noopener noreferrer"
                    style={{ color: '#61afef', textDecoration: 'none' }}
                    onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
                    '@technoziant'
                  </a>
                  <span style={{ color: '#abb2bf' }}>,</span>
                </CodeLine>
                <CodeLine num={9} indent={2}>
                  <span style={{ color: '#e06c75' }}>github</span>
                  <span style={{ color: '#abb2bf' }}>: </span>
                  <a href="https://github.com/technoziant" target="_blank" rel="noopener noreferrer"
                    style={{ color: '#61afef', textDecoration: 'none' }}
                    onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
                    'github/technoziant'
                  </a>
                  <span style={{ color: '#abb2bf' }}>,</span>
                </CodeLine>
                <CodeLine num={10} indent={2}>
                  <span style={{ color: '#e06c75' }}>instagram</span>
                  <span style={{ color: '#abb2bf' }}>: </span>
                  <a href="https://instagram.com/technoziant" target="_blank" rel="noopener noreferrer"
                    style={{ color: '#61afef', textDecoration: 'none' }}
                    onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
                    '@technoziant'
                  </a>
                </CodeLine>
                <CodeLine num={11} indent={1}>
                  <span style={{ color: '#abb2bf' }}>{'}'}</span>
                  <span style={{ color: '#abb2bf' }}>,</span>
                </CodeLine>
                <CodeLine num={12} indent={1}>
                  <span style={{ color: '#e06c75' }}>services</span>
                  <span style={{ color: '#abb2bf' }}>: [</span>
                </CodeLine>
                <CodeLine num={13} indent={2}>
                  <span style={{ color: '#98c379' }}>'web'</span>
                  <span style={{ color: '#abb2bf' }}>, </span>
                  <span style={{ color: '#98c379' }}>'mobile'</span>
                  <span style={{ color: '#abb2bf' }}>, </span>
                  <span style={{ color: '#98c379' }}>'design'</span>
                  <span style={{ color: '#abb2bf' }}>, </span>
                  <span style={{ color: '#98c379' }}>'cloud'</span>
                  <span style={{ color: '#abb2bf' }}>, </span>
                  <span style={{ color: '#98c379' }}>'ai'</span>
                </CodeLine>
                <CodeLine num={14} indent={1}>
                  <span style={{ color: '#abb2bf' }}>]</span>
                </CodeLine>
                <CodeLine num={15} indent={0}>
                  <span style={{ color: '#abb2bf' }}>{'}'}</span>
                </CodeLine>
              </div>

              {/* Right - Subscribe & Links */}
              <div>
                <div style={{ marginBottom: '28px' }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#6a737d', marginBottom: '4px' }}>
                    {'// Subscribe to our newsletter'}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#e4eaf5', marginBottom: '12px' }}>
                    <span style={{ color: '#c678dd' }}>const</span> <span style={{ color: '#e06c75' }}>newsletter</span> = <span style={{ color: '#61afef' }}>await</span> subscribe(
                  </div>

                  <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px', marginBottom: '8px', marginLeft: '20px' }}>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        color: '#98c379',
                        fontSize: '12px',
                        outline: 'none',
                        fontFamily: "'JetBrains Mono', monospace"
                      }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      style={{
                        padding: '10px 18px',
                        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontFamily: "'JetBrains Mono', monospace",
                        whiteSpace: 'nowrap'
                      }}>
                      {subscribed ? '✓ Sent' : 'Subscribe'}
                    </motion.button>
                  </form>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#abb2bf', marginLeft: '20px' }}>
                    ); <span style={{ color: '#6a737d' }}>// {subscribed ? 'Successfully subscribed!' : 'Join 500+ subscribers'}</span>
                  </div>
                </div>

                {/* Quick Links */}
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#6a737d', marginBottom: '8px' }}>
                  {'// Quick navigation'}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  {[
                    { label: 'Home', href: '/' },
                    { label: 'Work', href: '/work' },
                    { label: 'Services', href: '/services' },
                    { label: 'About', href: '/about' },
                    { label: 'Contact', href: '/contact' },
                    { label: 'Careers', href: '/careers' }
                  ].map(link => (
                    <a key={link.label} href={link.href}
                      onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '11px',
                        color: 'rgba(255,255,255,0.4)',
                        textDecoration: 'none',
                        padding: '4px 0',
                        transition: 'color 0.2s'
                      }}>
                      <span style={{ color: '#61afef' }}>{'>'}</span> {link.label}
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
            gap: '12px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255,255,255,0.04)'
          }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}>
              <span style={{ color: '#6a737d' }}>{'>'}</span> © 2026 Technoziant. Crafted with passion in India.
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.15)' }}>
                v2.0.0
              </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(79,142,255,0.1)', color: '#4f8eff', border: '1px solid rgba(79,142,255,0.15)' }}>
                MIT License
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function CodeLine({ num, indent = 0, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', paddingLeft: `${indent * 20}px` }}>
      <span style={{
        color: 'rgba(255,255,255,0.12)',
        marginRight: '16px',
        userSelect: 'none',
        fontSize: '11px',
        minWidth: '16px',
        textAlign: 'right'
      }}>
        {num}
      </span>
      <span>{children}</span>
    </div>
  )
}
