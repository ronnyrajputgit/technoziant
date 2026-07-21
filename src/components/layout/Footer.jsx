import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { api } from '../../utils/api'

const defaultSocialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/technoziant', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { name: 'Twitter', url: 'https://x.com/technoziant', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { name: 'YouTube', url: 'https://youtube.com/@technoziant', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
  { name: 'Instagram', url: 'https://instagram.com/technoziant', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg> },
  { name: 'WhatsApp', url: 'https://wa.me/919771291336', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> }
]

const defaultServices = ['Web Development', 'Mobile Apps', 'UI/UX Design', 'Cloud & DevOps', 'AI & ML']
const defaultCompany = [{ label: 'About', href: '/about' }, { label: 'Work', href: '/work' }, { label: 'Careers', href: '/careers' }, { label: 'Contact', href: '/contact' }, { label: 'FAQ', href: '/faq' }]

export function Footer() {
  const { setCursorType } = useApp()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [footerData, setFooterData] = useState([])
  const [settings, setSettings] = useState({})

  useEffect(() => {
    api.getContent('footer_content', { visible: 'true' }).then(setFooterData).catch(() => {})
    api.getSettings().then(data => {
      const map = {}
      data.forEach(s => { map[s.key] = s.value })
      setSettings(map)
    }).catch(() => {})
  }, [])

  const servicesList = footerData.filter(f => f.section === 'services')
  const companyList = footerData.filter(f => f.section === 'company')
  const contactList = footerData.filter(f => f.section === 'contact')

  return (
    <footer ref={ref} style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--glass-border), transparent)' }} />
      <div style={{ padding: 'clamp(32px, 5vw, 60px) clamp(16px, 4vw, 40px) clamp(20px, 3vw, 28px)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px' }}>
              {/* Brand */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '5px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '800', color: '#fff', fontFamily: "var(--font-code)" }}>{'>'}</div>
                  <span style={{ fontSize: '12px', fontWeight: '600', fontFamily: "var(--font-code)", color: 'var(--text)' }}>
                    <span style={{ color: '#22c55e' }}>techno</span><span style={{ color: 'var(--text-muted)' }}>ziant</span>
                  </span>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '12px' }}>
                  {settings.footer_description || 'We craft digital products. Creative studio blending storytelling, art, and technology.'}
                </p>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {defaultSocialLinks.map(social => (
                    <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer"
                      onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                      style={{ width: '28px', height: '28px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', textDecoration: 'none', transition: 'all 0.2s' }}>
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <div style={{ fontSize: '10px', fontWeight: '600', color: 'var(--text)', marginBottom: '10px', fontFamily: "var(--font-code)" }}>services</div>
                {(servicesList.length ? servicesList : defaultServices.map(s => ({ title: s, url: '/services' }))).map((s, i) => (
                  <a key={s.id || i} href={s.url || '/services'} style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#22c55e'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>{s.title}</a>
                ))}
              </div>

              {/* Company */}
              <div>
                <div style={{ fontSize: '10px', fontWeight: '600', color: 'var(--text)', marginBottom: '10px', fontFamily: "var(--font-code)" }}>company</div>
                {(companyList.length ? companyList : defaultCompany).map((link, i) => (
                  <a key={link.id || link.label || i} href={link.url || link.href} style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#22c55e'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>{link.title || link.label}</a>
                ))}
              </div>

              {/* Contact */}
              <div>
                <div style={{ fontSize: '10px', fontWeight: '600', color: 'var(--text)', marginBottom: '10px', fontFamily: "var(--font-code)" }}>contact</div>
                {contactList.length ? contactList.map((c, i) => (
                  <div key={c.id || i} style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>{c.title}</div>
                )) : (
                  <>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>📧 business@technoziant.com</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>📱 +91 8882716189</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>💬 WhatsApp: +91 9771291336</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>📍 Deoghar, Jharkhand</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>🕐 10 AM - 6 PM</div>
                  </>
                )}
                {/* QR Code for Feedback */}
                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ padding: '6px', background: '#fff', borderRadius: '8px', display: 'inline-block' }}>
                    <QRCodeSVG value={`${typeof window !== 'undefined' ? window.location.origin : 'https://technoziant.com'}/feedback`} size={64} bgColor="#ffffff" fgColor="#0a0e1a" />
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: '600', color: 'var(--text)', fontFamily: "var(--font-code)" }}>Scan for Feedback</div>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Rate & review us</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', paddingTop: '16px', borderTop: '1px solid var(--glass-border)' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>© 2026 Technoziant. All rights reserved.</div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }].map(link => (
                <a key={link.label} href={link.href} style={{ fontSize: '10px', color: 'var(--text-muted)', textDecoration: 'none' }}>{link.label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
