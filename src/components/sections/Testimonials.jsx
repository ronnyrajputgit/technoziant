import { useState, useEffect } from 'react'
import { TextReveal } from '../ui/TextReveal'
import { GlowCard } from '../ui/Cards'
import { api } from '../../utils/api'

export function Testimonials() {
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    api.getContent('testimonials').then(data => {
      setTestimonials(data.filter(t => t.approved))
    }).catch(() => {})
  }, [])

  if (!testimonials.length) return null

  return (
    <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>testimonials</div></TextReveal>
          <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', lineHeight: 1 }}>What Clients <span className="text-gradient">Say</span></h2></TextReveal>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
          {testimonials.map(t => (
            <GlowCard key={t.id} glowColor="var(--accent)" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div className="liquid-glass" style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden' }}>
                  {t.avatar ? <img src={t.avatar} alt={t.client_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600' }}>{t.client_name?.[0]}</div>}
                </div>
                <div><div style={{ fontSize: '12px', fontWeight: '600' }}>{t.client_name}</div><div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{t.company}</div></div>
              </div>
              <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '10px' }}>"{t.feedback}"</p>
              <div style={{ display: 'flex', gap: '2px' }}>{[1, 2, 3, 4, 5].map(s => <span key={s} style={{ color: s <= (t.rating || 5) ? '#fbbf24' : 'var(--glass-border)', fontSize: '10px' }}>★</span>)}</div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
