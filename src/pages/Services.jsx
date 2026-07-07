import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TextReveal } from '../components/ui/TextReveal'
import { WaterDropCard } from '../components/ui/Cards'
import { services } from '../data/projects'
import { useApp } from '../context/AppContext'
import { Footer } from '../components/layout/Footer'

const icons = {
  web: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  mobile: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>,
  brand: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  design: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  cloud: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>,
  ai: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a4 4 0 00-4 4v2H6a2 2 0 00-2 2v2a2 2 0 002 2h2v2a4 4 0 008 0v-2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2V6a4 4 0 00-4-4z"/></svg>
}

const slugMap = {
  'Web Development': 'web-development',
  'Mobile Apps': 'mobile-apps',
  'Brand & Identity': 'brand-identity',
  'UI/UX Design': 'ui-ux-design',
  'Cloud & DevOps': 'cloud-devops',
  'AI & Machine Learning': 'ai-machine-learning'
}

export function Services() {
  const { setCursorType } = useApp()
  return (
    <main style={{ paddingTop: '110px', minHeight: '100vh' }}>
      <section className="container" style={{ marginBottom: '48px' }}>
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>Services</div></TextReveal>
        <TextReveal delay={0.1}><h1 style={{ fontSize: 'clamp(44px, 8vw, 100px)', fontWeight: '700', lineHeight: 0.95, marginBottom: '16px' }}>What we<br /><span className="text-gradient">do best</span></h1></TextReveal>
        <TextReveal delay={0.2}><p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '420px' }}>Comprehensive digital services designed to elevate your brand and create meaningful experiences.</p></TextReveal>
      </section>
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 0 }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {services.map(s => (
            <Link to={`/services/${slugMap[s.title] || s.title.toLowerCase().replace(/\s+/g, '-')}`} key={s.id}>
              <WaterDropCard color={s.color} style={{ padding: 0 }}>
                <div onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                  style={{ display: 'grid', gridTemplateColumns: '44px 1fr auto', gap: '20px', padding: '20px', alignItems: 'center' }}>
                  <div className="liquid-glass" style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>{icons[s.icon]}</div>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: '600', marginBottom: '4px' }}>{s.title}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', lineHeight: 1.5 }}>{s.description}</p>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      {s.features.map(f => <span key={f} className="liquid-glass" style={{ padding: '2px 7px', borderRadius: '100px', fontSize: '9px', color: s.color }}>{f}</span>)}
                    </div>
                  </div>
                  <div className="liquid-glass" style={{ padding: '6px 14px', borderRadius: '100px', fontSize: '11px', color: s.color, fontWeight: '500', whiteSpace: 'nowrap' }}>
                    Explore →
                  </div>
                </div>
              </WaterDropCard>
            </Link>
          ))}
        </div>
      </section>
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
        <div className="container">
          <TextReveal><h2 style={{ fontSize: 'clamp(30px, 4vw, 50px)', fontWeight: '700', lineHeight: 1.1, marginBottom: '20px' }}>Ready to start?</h2></TextReveal>
          <Link to="/contact" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
            <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 40px var(--accent)' }} whileTap={{ scale: 0.95 }}
              className="liquid-glass-strong" style={{ padding: '15px 34px', borderRadius: '100px', fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>Get in Touch</motion.button>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
