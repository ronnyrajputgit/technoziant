import { motion } from 'framer-motion'
import { TextReveal } from '../components/ui/TextReveal'
import { GlowCard, WaterDropCard } from '../components/ui/Cards'
import { team, awards } from '../data/projects'
import { useApp } from '../context/AppContext'
import { Footer } from '../components/layout/Footer'

export function About() {
  const { setCursorType } = useApp()
  return (
    <main style={{ paddingTop: '110px', minHeight: '100vh' }}>
      <section className="container">
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>About Us</div></TextReveal>
        <TextReveal delay={0.1}><h1 style={{ fontSize: 'clamp(44px, 8vw, 100px)', fontWeight: '700', lineHeight: 0.95, marginBottom: '16px' }}>We are a team<br />of <span className="text-gradient">passionate</span><br />makers</h1></TextReveal>
        <TextReveal delay={0.2}><p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '520px', marginBottom: '50px' }}>Founded in 2012, we blend story, art & technology as an in-house team of passionate makers. Our industry-leading web toolset consistently delivers award-winning work through quality & performance.</p></TextReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', marginBottom: '80px' }}>
          {[{ n: '12+', l: 'Years' }, { n: '200+', l: 'Projects' }, { n: '50+', l: 'Team' }, { n: '40+', l: 'Awards' }].map((s, i) => (
            <GlowCard key={i} style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '700', fontFamily: 'var(--font-h)', marginBottom: '2px' }}><span className="text-gradient">{s.n}</span></div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.l}</div>
            </GlowCard>
          ))}
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <TextReveal><h2 style={{ fontSize: 'clamp(34px, 5vw, 64px)', fontWeight: '700', lineHeight: 1 }}>Meet the <span className="text-gradient">Team</span></h2></TextReveal>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
            {team.map(m => (
              <GlowCard key={m.id} glowColor="var(--accent)" style={{ padding: 0, overflow: 'hidden' }}>
                <div onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
                  <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                    <motion.img src={m.image} alt={m.name} whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '18px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '2px' }}>{m.name}</h3>
                    <p style={{ fontSize: '11px', color: 'var(--accent)', marginBottom: '6px' }}>{m.role}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{m.bio}</p>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <TextReveal><h2 style={{ fontSize: 'clamp(34px, 5vw, 64px)', fontWeight: '700', lineHeight: 1 }}>Our <span className="text-gradient">Awards</span></h2></TextReveal>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
            {awards.map((a, i) => (
              <GlowCard key={i} style={{ padding: '18px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{a.icon}</div>
                <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '1px', fontFamily: 'var(--font-h)' }}>{a.count}x</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{a.name}</div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px', opacity: 0.6 }}>{a.year}</div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
