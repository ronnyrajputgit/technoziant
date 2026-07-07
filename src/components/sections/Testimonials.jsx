import { TextReveal } from '../ui/TextReveal'
import { GlowCard } from '../ui/Cards'
import { testimonials } from '../../data/projects'

export function Testimonials() {
  return (
    <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>Testimonials</div></TextReveal>
          <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(34px, 5vw, 64px)', fontWeight: '700', lineHeight: 1 }}>What Clients <span className="text-gradient">Say</span></h2></TextReveal>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {testimonials.map(t => (
            <GlowCard key={t.id} glowColor="var(--accent)" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div className="liquid-glass" style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
                  <img src={t.image} alt={t.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div><div style={{ fontSize: '13px', fontWeight: '600' }}>{t.author}</div><div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.company}</div></div>
              </div>
              <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '14px' }}>"{t.quote}"</p>
              <div style={{ display: 'flex', gap: '2px' }}>{[1, 2, 3, 4, 5].map(s => <span key={s} style={{ color: '#fbbf24', fontSize: '12px' }}>★</span>)}</div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
