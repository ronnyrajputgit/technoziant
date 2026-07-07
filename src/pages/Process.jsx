import { Link } from 'react-router-dom'
import { TextReveal } from '../components/ui/TextReveal'
import { WaterDropCard } from '../components/ui/Cards'
import { processSteps } from '../data/projects'
import { useApp } from '../context/AppContext'
import { Footer } from '../components/layout/Footer'

const slugMap = {
  'Discovery': 'discovery',
  'Strategy': 'strategy',
  'Design': 'design',
  'Development': 'development',
  'Launch': 'launch',
  'Support': 'support'
}

export function Process() {
  const { setCursorType } = useApp()
  return (
    <main style={{ paddingTop: '110px', minHeight: '100vh' }}>
      <section className="container" style={{ marginBottom: '48px' }}>
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>Our Process</div></TextReveal>
        <TextReveal delay={0.1}><h1 style={{ fontSize: 'clamp(44px, 8vw, 100px)', fontWeight: '700', lineHeight: 0.95, marginBottom: '16px' }}>How we <span className="text-gradient">work</span></h1></TextReveal>
        <TextReveal delay={0.2}><p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '460px' }}>A proven methodology refined over 12 years of delivering exceptional digital experiences.</p></TextReveal>
      </section>
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
            {processSteps.map(step => (
              <Link to={`/process/${slugMap[step.title] || step.title.toLowerCase()}`} key={step.step}>
                <WaterDropCard color="var(--accent)" style={{ padding: 0, cursor: 'pointer' }}>
                  <div onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')} style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                      <span style={{ fontSize: '28px' }}>{step.icon}</span>
                      <span className="liquid-glass" style={{ fontSize: '10px', color: 'var(--accent)', letterSpacing: '0.1em', fontWeight: '600', padding: '3px 9px', borderRadius: '100px' }}>Step {step.step}</span>
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>{step.title}</h3>
                    <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '12px' }}>{step.description}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--accent)', fontWeight: '500' }}>
                      Explore Phase <span>→</span>
                    </div>
                  </div>
                </WaterDropCard>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
