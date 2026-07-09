import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TextReveal } from '../components/ui/TextReveal'
import { WaterDropCard, GlowCard } from '../components/ui/Cards'
import { useApp } from '../context/AppContext'
import { Footer } from '../components/layout/Footer'

const connectMethods = [
  { icon: '💬', title: 'WhatsApp', value: '+91 98765 43210', link: 'https://wa.me/919876543210', color: '#25D366', description: 'Quick chat anytime' },
  { icon: '✉️', title: 'Email', value: 'hello@technoziant.com', link: 'mailto:hello@technoziant.com', color: '#4f8eff', description: 'For detailed inquiries' },
  { icon: '💼', title: 'LinkedIn', value: 'Technoziant', link: 'https://linkedin.com/company/technoziant', color: '#0A66C2', description: 'Connect professionally' },
  { icon: '🐦', title: 'Twitter / X', value: '@technoziant', link: 'https://x.com/technoziant', color: '#1DA1F2', description: 'Follow our updates' },
  { icon: '📸', title: 'Instagram', value: '@technoziant', link: 'https://instagram.com/technoziant', color: '#E4405F', description: 'See our visual work' },
  { icon: '🐙', title: 'GitHub', value: 'technoziant', link: 'https://github.com/technoziant', color: '#8b5cf6', description: 'Check our open source' },
  { icon: '📞', title: 'Phone', value: '+91 98765 43210', link: 'tel:+919876543210', color: '#06d6a0', description: 'Mon-Fri 9AM-6PM IST' },
  { icon: '📍', title: 'Office', value: 'India', link: 'https://maps.google.com/?q=India', color: '#fbbf24', description: 'Visit us anytime' },
  { icon: '🎮', title: 'Discord', value: 'Technoziant Community', link: 'https://discord.gg/technoziant', color: '#5865F2', description: 'Join our community' },
  { icon: '📺', title: 'YouTube', value: 'Technoziant', link: 'https://youtube.com/@technoziant', color: '#FF0000', description: 'Watch our tutorials' }
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
        borderRadius: '14px', textDecoration: 'none', color: 'var(--text)',
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
        width: '44px', height: '44px', borderRadius: '12px',
        background: `${method.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '20px', flexShrink: 0, border: `1px solid ${method.color}20`
      }}>
        {method.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
          <span style={{ fontSize: '13px', fontWeight: '600' }}>{method.title}</span>
          <span style={{ fontSize: '12px', color: method.color }}>→</span>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {method.value}
        </div>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', opacity: 0.6 }}>{method.description}</div>
      </div>
    </motion.a>
  )
}

export function Contact() {
  const { setCursorType } = useApp()
  const [f, setF] = useState({ name: '', email: '', company: '', service: '', budget: '', message: '' })
  const [focus, setFocus] = useState(null)

  const inp = (n) => ({
    width: '100%', background: 'transparent', border: 'none',
    borderBottom: `1px solid ${focus === n ? 'var(--accent)' : 'var(--glass-border)'}`,
    padding: '12px 0', fontSize: '14px', color: 'var(--text)', outline: 'none',
    transition: 'border-color 0.3s', fontFamily: 'var(--font-b)'
  })

  return (
    <main style={{ paddingTop: '110px', minHeight: '100vh' }}>
      <section className="container" style={{ marginBottom: '40px' }}>
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>Get in Touch</div></TextReveal>
        <TextReveal delay={0.1}><h1 style={{ fontSize: 'clamp(40px, 7vw, 90px)', fontWeight: '700', lineHeight: 0.95, marginBottom: '12px' }}>Let's create<br /><span className="text-gradient">something amazing</span></h1></TextReveal>
        <TextReveal delay={0.2}><p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '420px' }}>Choose your preferred way to connect. We're available across multiple platforms.</p></TextReveal>
      </section>

      {/* Multiple Ways to Connect */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '40px' }}>
        <div className="container">
          <TextReveal>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span className="liquid-glass" style={{ display: 'inline-block', padding: '5px 14px', borderRadius: '100px', fontSize: '10px', color: 'var(--accent)', fontWeight: '600', letterSpacing: '0.1em', marginBottom: '12px' }}>
                10+ Ways to Connect
              </span>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '700', fontFamily: 'var(--font-h)' }}>
                Multiple Ways to <span className="text-gradient">Reach Us</span>
              </h2>
            </div>
          </TextReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
            {connectMethods.map((method, i) => <ConnectCard key={i} method={method} index={i} />)}
          </div>

          {/* Quick Connect Banner */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="liquid-glass texture-noise" style={{ marginTop: '24px', padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Need immediate help?</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Our WhatsApp bot responds instantly 24/7</div>
            </div>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#25D365', borderRadius: '100px', fontSize: '12px', fontWeight: '600', color: '#fff', textDecoration: 'none' }}>
              💬 Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '36px' }}>
            <div>
              <TextReveal><h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: '700', marginBottom: '8px' }}>Send a Message</h2></TextReveal>
              <TextReveal delay={0.1}><p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>Fill out the form and we'll get back to you within 24 hours.</p></TextReveal>
              <form onSubmit={e => e.preventDefault()}>
                {[['name', 'Your Name', 'John Doe', 'text'], ['email', 'Email', 'john@example.com', 'email'], ['company', 'Company', 'Company Inc', 'text'], ['service', 'Service', 'Web, Mobile, Design...', 'text'], ['budget', 'Budget', '$10K - $50K', 'text']].map(([n, l, ph, t]) => (
                  <div key={n} style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>{l}</label>
                    <input type={t} value={f[n]} onChange={e => setF({ ...f, [n]: e.target.value })} onFocus={() => setFocus(n)} onBlur={() => setFocus(null)} placeholder={ph} style={inp(n)} />
                  </div>
                ))}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Details</label>
                  <textarea value={f.message} onChange={e => setF({ ...f, message: e.target.value })} onFocus={() => setFocus('message')} onBlur={() => setFocus(null)} placeholder="Tell us about your project..." rows={3} style={{ ...inp('message'), resize: 'none' }} />
                </div>
                <motion.button type="submit" whileHover={{ scale: 1.02, boxShadow: '0 0 30px var(--accent)' }} whileTap={{ scale: 0.98 }}
                  className="liquid-glass-strong" style={{ padding: '13px 30px', borderRadius: '100px', fontSize: '13px', fontWeight: '600', color: 'var(--text)', width: '100%' }}>Send Message</motion.button>
              </form>
            </div>

            <div>
              <TextReveal><h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: '700', marginBottom: '8px' }}>Office Info</h2></TextReveal>
              <TextReveal delay={0.1}><p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>Visit us or reach out through any channel.</p></TextReveal>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[['📍', 'Address', 'India'], ['🕐', 'Hours', 'Mon - Fri: 9:00 AM - 6:00 PM IST'], ['📧', 'General', 'hello@technoziant.com'], ['💼', 'Business', 'partnerships@technoziant.com'], ['🚨', 'Emergency', 'support@technoziant.com']].map(([icon, label, val], i) => (
                  <GlowCard key={i} style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '16px' }}>{icon}</span>
                      <div>
                        <div style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1px' }}>{label}</div>
                        <div style={{ fontSize: '12px', fontWeight: '500' }}>{val}</div>
                      </div>
                    </div>
                  </GlowCard>
                ))}
              </div>

              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>Follow Us</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {[['💬', '#25D366'], ['💼', '#0A66C2'], ['🐦', '#1DA1F2'], ['📸', '#E4405F'], ['🐙', '#8b5cf6'], ['📺', '#FF0000']].map(([icon, color], i) => (
                    <a key={i} href="#" className="liquid-glass" style={{ width: '34px', height: '34px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', transition: 'all 0.3s', border: '1px solid transparent' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = `${color}40`}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
