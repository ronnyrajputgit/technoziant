import { Link } from 'react-router-dom'
import { services } from '../../data/projects'
import { useApp } from '../../context/AppContext'
import { TextReveal } from '../ui/TextReveal'
import { WaterDropCard } from '../ui/Cards'

const slugMap = {
  'Web Development': 'web-development',
  'Mobile Apps': 'mobile-apps',
  'Brand & Identity': 'brand-identity',
  'UI/UX Design': 'ui-ux-design',
  'Cloud & DevOps': 'cloud-devops',
  'AI & Machine Learning': 'ai-machine-learning'
}

const icons = {
  web: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  mobile: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>,
  brand: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  design: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  cloud: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>,
  ai: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a4 4 0 00-4 4v2H6a2 2 0 00-2 2v2a2 2 0 002 2h2v2a4 4 0 008 0v-2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2V6a4 4 0 00-4-4z"/></svg>
}

export function ServicesGrid() {
  const { setCursorType } = useApp()
  return (
    <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>What We Do</div></TextReveal>
            <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(34px, 5vw, 64px)', fontWeight: '700', lineHeight: 1, letterSpacing: '-0.03em' }}>Our <span className="text-gradient">Services</span></h2></TextReveal>
          </div>
          <TextReveal delay={0.2}><Link to="/services" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')} style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '500' }}>View All →</Link></TextReveal>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {services.map(s => (
            <Link to={`/services/${slugMap[s.title] || s.title.toLowerCase().replace(/\s+/g, '-')}`} key={s.id}>
              <WaterDropCard color={s.color} style={{ padding: 0 }}>
                <div onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')} style={{ padding: '24px' }}>
                  <div className="liquid-glass" style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: s.color }}>{icons[s.icon]}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{s.title}</h3>
                  <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '14px' }}>{s.description}</p>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {s.features.map(f => <span key={f} className="liquid-glass" style={{ padding: '2px 7px', borderRadius: '100px', fontSize: '9px', color: 'var(--text-muted)' }}>{f}</span>)}
                  </div>
                </div>
              </WaterDropCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
