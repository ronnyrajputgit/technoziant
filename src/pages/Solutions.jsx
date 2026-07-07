import { TextReveal } from '../components/ui/TextReveal'
import { WaterDropCard } from '../components/ui/Cards'
import { solutions } from '../data/projects'
import { useApp } from '../context/AppContext'
import { Link } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'

const slugMap = {
  'E-Commerce Platform': 'e-commerce-platform',
  'Healthcare Portal': 'healthcare-portal',
  'Real Estate Platform': 'real-estate-platform',
  'Learning Management': 'learning-management',
  'Logistics Tracker': 'logistics-tracker'
}

export function Solutions() {
  const { setCursorType } = useApp()
  return (
    <main style={{ paddingTop: '110px', minHeight: '100vh' }}>
      <section className="container" style={{ marginBottom: '48px' }}>
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>Solutions</div></TextReveal>
        <TextReveal delay={0.1}><h1 style={{ fontSize: 'clamp(44px, 8vw, 100px)', fontWeight: '700', lineHeight: 0.95, marginBottom: '16px' }}>Industry<br /><span className="text-gradient">Solutions</span></h1></TextReveal>
        <TextReveal delay={0.2}><p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '480px' }}>Tailored solutions for various industries, combining deep domain expertise with cutting-edge technology.</p></TextReveal>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {solutions.map((sol, i) => (
            <Link to={`/solutions/${slugMap[sol.title] || sol.title.toLowerCase().replace(/\s+/g, '-')}`} key={sol.id}>
              <WaterDropCard color="var(--accent)" style={{ padding: 0, overflow: 'hidden' }}>
                <div onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '320px' }}>
                  <div style={{ order: i % 2 === 0 ? 1 : 2, padding: 'clamp(20px, 3vw, 36px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span className="liquid-glass" style={{ display: 'inline-flex', padding: '4px 10px', borderRadius: '100px', fontSize: '9px', color: 'var(--accent)', fontWeight: '500', marginBottom: '12px', width: 'fit-content' }}>Case Study</span>
                    <h3 style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: '700', marginBottom: '10px', letterSpacing: '-0.02em' }}>{sol.title}</h3>
                    <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '16px' }}>{sol.description}</p>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '14px' }}>
                      {sol.technologies.map(t => <span key={t} className="liquid-glass" style={{ padding: '3px 9px', borderRadius: '100px', fontSize: '10px', color: 'var(--accent)', fontWeight: '500' }}>{t}</span>)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--accent)', fontWeight: '500' }}>
                      View Case Study <span>→</span>
                    </div>
                  </div>
                  <div style={{ order: i % 2 === 0 ? 2 : 1, position: 'relative', overflow: 'hidden', minHeight: '180px' }}>
                    <img src={sol.image} alt={sol.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(${i % 2 === 0 ? 'to right' : 'to left'}, var(--bg) 0%, transparent 40%)` }} />
                  </div>
                </div>
              </WaterDropCard>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
