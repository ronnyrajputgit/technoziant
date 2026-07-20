import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TextReveal } from '../components/ui/TextReveal'
import { GlowCard } from '../components/ui/Cards'
import { Footer } from '../components/layout/Footer'
import { api } from '../utils/api'

const Icon = ({ d, color = 'currentColor', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

const icons = {
  whatsapp: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z',
  email: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
  linkedin: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
  twitter: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z',
  instagram: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z',
  phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
  map: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6z',
  youtube: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z M9.75 15.02V8.48l5.75 3.27-5.75 3.27z'
}

const defaultConnectMethods = [
  { icon: 'whatsapp', title: 'WhatsApp', value: '+91 9771291336', link: 'https://wa.me/919771291336', color: '#25D366', description: 'Quick chat anytime' },
  { icon: 'email', title: 'Email', value: 'business@technoziant.com', link: 'mailto:business@technoziant.com', color: '#4f8eff', description: 'For detailed inquiries' },
  { icon: 'phone', title: 'Contact Us', value: '+91 8882716189', link: 'tel:+918882716189', color: '#06d6a0', description: 'Mon-Fri 10AM-6PM' },
  { icon: 'linkedin', title: 'LinkedIn', value: 'Technoziant', link: 'https://www.linkedin.com/in/technoziant', color: '#0A66C2', description: 'Connect professionally' },
  { icon: 'twitter', title: 'Twitter / X', value: '@technoziant', link: 'https://x.com/technoziant', color: '#1DA1F2', description: 'Follow our updates' },
  { icon: 'instagram', title: 'Instagram', value: '@technoziant', link: 'https://instagram.com/technoziant', color: '#E4405F', description: 'See our visual work' },
  { icon: 'youtube', title: 'YouTube', value: 'Technoziant', link: 'https://youtube.com/@technoziant', color: '#FF0000', description: 'Watch our tutorials' },
  { icon: 'map', title: 'Office', value: 'Deoghar, Jharkhand', link: 'https://maps.google.com/?q=Deoghar+Jharkhand', color: '#fbbf24', description: 'Visit us 10AM-6PM' }
]

const defaultOfficeInfo = [
  { icon: 'map', label: 'address', val: 'Deoghar, Jharkhand, India', color: '#fbbf24' },
  { icon: 'phone', label: 'hours', val: 'Mon - Fri: 10:00 AM - 6:00 PM', color: '#06d6a0' },
  { icon: 'email', label: 'general', val: 'business@technoziant.com', color: '#4f8eff' },
  { icon: 'phone', label: 'contact', val: '+91 8882716189', color: '#a855f7' },
  { icon: 'whatsapp', label: 'whatsapp', val: '+91 9771291336', color: '#25D366' }
]

function ConnectCard({ method, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.a ref={ref} href={method.link} target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.76, 0, 0.24, 1] }}
      className="liquid-glass texture-noise"
      style={{
        display: 'flex', alignItems: 'center', gap: '14px', padding: '16px',
        borderRadius: '12px', textDecoration: 'none', color: 'var(--text)',
        cursor: 'pointer', transition: 'all 0.3s', border: '1px solid var(--glass-border)',
        position: 'relative', overflow: 'hidden'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${method.color}40`
        e.currentTarget.style.boxShadow = `0 4px 20px ${method.color}15`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--glass-border)'
        e.currentTarget.style.boxShadow = 'none'
      }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: '10px',
        background: `${method.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, border: `1px solid ${method.color}20`
      }}>
        <Icon d={icons[method.icon]} color={method.color} size={18} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
          <span style={{ fontSize: '13px', fontWeight: '600', fontFamily: "var(--font-code)" }}>{method.title}</span>
          <span style={{ fontSize: '11px', color: method.color }}>{'->'}</span>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: "var(--font-code)" }}>
          {method.value}
        </div>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', opacity: 0.6 }}>{method.description}</div>
      </div>
    </motion.a>
  )
}

export function Contact() {
  const [f, setF] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [focus, setFocus] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [settings, setSettings] = useState({})

  useEffect(() => {
    api.getSettings().then(data => {
      const map = {}
      data.forEach(s => { map[s.key] = s.value })
      setSettings(map)
    }).catch(() => {})
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setF({ name: '', email: '', company: '', service: '', message: '' })
  }

  const inp = (n) => ({
    width: '100%', background: 'transparent', border: 'none',
    borderBottom: `1px solid ${focus === n ? 'var(--accent)' : 'var(--glass-border)'}`,
    padding: '12px 0', fontSize: '13px', color: 'var(--text)', outline: 'none',
    transition: 'border-color 0.3s', fontFamily: "var(--font-code)"
  })

  const email = settings.contact_email || 'business@technoziant.com'
  const phone = settings.contact_phone || '+91 8882716189'
  const whatsapp = settings.contact_whatsapp || '+91 9771291336'
  const address = settings.contact_address || 'Deoghar, Jharkhand'
  const hours = settings.contact_hours || 'Mon - Fri: 10:00 AM - 6:00 PM'

  return (
    <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section className="container" style={{ marginBottom: '32px' }}>
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>get in touch</div></TextReveal>
        <TextReveal delay={0.1}><h1 style={{ fontSize: 'clamp(36px, 7vw, 80px)', fontWeight: '700', lineHeight: 0.95, marginBottom: '12px' }}>Let's create<br /><span className="text-gradient">something amazing</span></h1></TextReveal>
        <TextReveal delay={0.2}><p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '420px' }}>Choose your preferred way to connect. We're available across multiple platforms.</p></TextReveal>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '32px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '10px' }}>
            {defaultConnectMethods.map((method, i) => {
              const m = { ...method }
              if (method.icon === 'email') m.value = email
              if (method.icon === 'phone') m.value = phone
              if (method.icon === 'whatsapp') m.value = whatsapp
              if (method.icon === 'map') m.value = address
              return <ConnectCard key={i} method={m} index={i} />
            })}
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
            <div>
              <TextReveal><h2 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: '700', marginBottom: '8px' }}>Send a Message</h2></TextReveal>
              <TextReveal delay={0.1}><p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.6 }}>Fill out the form and we'll get back to you within 24 hours.</p></TextReveal>
              <form onSubmit={handleSubmit}>
                {[['name', 'name', 'John Doe', 'text'], ['email', 'email', 'john@example.com', 'email'], ['company', 'company', 'Company Inc', 'text'], ['service', 'service', 'Web, Mobile, Design...', 'text']].map(([n, l, ph, t]) => (
                  <div key={n} style={{ marginBottom: '14px' }}>
                    <label style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px', display: 'block', fontFamily: "var(--font-code)" }}>{l}</label>
                    <input type={t} value={f[n]} onChange={e => setF({ ...f, [n]: e.target.value })} onFocus={() => setFocus(n)} onBlur={() => setFocus(null)} placeholder={ph} style={inp(n)} />
                  </div>
                ))}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px', display: 'block', fontFamily: "var(--font-code)" }}>message</label>
                  <textarea value={f.message} onChange={e => setF({ ...f, message: e.target.value })} onFocus={() => setFocus('message')} onBlur={() => setFocus(null)} placeholder="Tell us about your project..." rows={3} style={{ ...inp('message'), resize: 'none' }} />
                </div>
                {submitted ? (
                  <div style={{ padding: '12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: '#22c55e', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)', textAlign: 'center', fontFamily: "var(--font-code)" }}>
                    ✓ Message sent successfully!
                  </div>
                ) : (
                  <motion.button type="submit" whileHover={{ scale: 1.02, boxShadow: '0 0 20px var(--accent)' }} whileTap={{ scale: 0.98 }}
                    style={{ padding: '12px 28px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: '#fff', width: '100%', background: 'linear-gradient(135deg, #22c55e, #16a34a)', fontFamily: "var(--font-code)" }}>
                    {'>'} send message
                  </motion.button>
                )}
              </form>
            </div>

            <div>
              <TextReveal><h2 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: '700', marginBottom: '8px' }}>Office Info</h2></TextReveal>
              <TextReveal delay={0.1}><p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.6 }}>Visit us or reach out through any channel.</p></TextReveal>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { icon: 'map', label: 'address', val: address, color: '#fbbf24' },
                  { icon: 'phone', label: 'hours', val: hours, color: '#06d6a0' },
                  { icon: 'email', label: 'general', val: email, color: '#4f8eff' },
                  { icon: 'phone', label: 'contact', val: phone, color: '#a855f7' },
                  { icon: 'whatsapp', label: 'whatsapp', val: whatsapp, color: '#25D366' }
                ].map((item, i) => (
                  <GlowCard key={i} style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon d={icons[item.icon]} color={item.color} size={16} />
                      <div>
                        <div style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1px', fontFamily: "var(--font-code)" }}>{item.label}</div>
                        <div style={{ fontSize: '12px', fontWeight: '500', fontFamily: "var(--font-code)" }}>{item.val}</div>
                      </div>
                    </div>
                  </GlowCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
