import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TextReveal } from '../components/ui/TextReveal'
import { WaterDropCard } from '../components/ui/Cards'
import { services } from '../data/projects'
import { useApp } from '../context/AppContext'
import { Footer } from '../components/layout/Footer'

const icons = {
  web: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  mobile: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>,
  brand: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  design: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  cloud: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>,
  ai: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a4 4 0 00-4 4v2H6a2 2 0 00-2 2v2a2 2 0 002 2h2v2a4 4 0 008 0v-2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2V6a4 4 0 00-4-4z"/></svg>
}

const slugMap = {
  'Web Development': 'web-development',
  'Mobile Apps': 'mobile-apps',
  'Brand & Identity': 'brand-identity',
  'UI/UX Design': 'ui-ux-design',
  'Cloud & DevOps': 'cloud-devops',
  'AI & Machine Learning': 'ai-machine-learning'
}

const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Python', icon: '🐍' },
  { name: 'Flutter', icon: '💙' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Docker', icon: '🐳' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'GraphQL', icon: '◆' },
  { name: 'Redis', icon: '🔴' }
]

export function Services() {
  const { setCursorType } = useApp()
  return (
    <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section className="container" style={{ marginBottom: '32px' }}>
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>services</div></TextReveal>
        <TextReveal delay={0.1}><h1 style={{ fontSize: 'clamp(40px, 8vw, 90px)', fontWeight: '700', lineHeight: 0.95, marginBottom: '12px' }}>What we<br /><span className="text-gradient">do best</span></h1></TextReveal>
        <TextReveal delay={0.2}><p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '420px' }}>Comprehensive digital services designed to elevate your brand and create meaningful experiences.</p></TextReveal>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 0 }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {services.map(s => (
            <Link to={`/services/${slugMap[s.title] || s.title.toLowerCase().replace(/\s+/g, '-')}`} key={s.id}>
              <WaterDropCard color={s.color} style={{ padding: 0 }}>
                <div onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                  style={{ display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: '16px', padding: '18px', alignItems: 'center' }}>
                  <div className="liquid-glass" style={{ width: '38px', height: '38px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>{icons[s.icon]}</div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '3px' }}>{s.title}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', lineHeight: 1.5 }}>{s.description}</p>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {s.features.map(f => <span key={f} className="liquid-glass" style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '9px', color: s.color, fontFamily: "var(--font-code)" }}>{f}</span>)}
                    </div>
                  </div>
                  <div className="liquid-glass" style={{ padding: '5px 12px', borderRadius: '6px', fontSize: '10px', color: s.color, fontWeight: '500', whiteSpace: 'nowrap', fontFamily: "var(--font-code)" }}>
                    {'->'}
                  </div>
                </div>
              </WaterDropCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>tech_stack</div></TextReveal>
            <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', lineHeight: 1 }}>Technologies We <span className="text-gradient">Use</span></h2></TextReveal>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '8px' }}>
            {techStack.map((tech, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="liquid-glass" style={{ padding: '16px', borderRadius: '8px', textAlign: 'center', cursor: 'default' }}>
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{tech.icon}</div>
                <div style={{ fontSize: '11px', fontWeight: '500', fontFamily: "var(--font-code)" }}>{tech.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>industries</div></TextReveal>
            <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', lineHeight: 1 }}>Industries We <span className="text-gradient">Serve</span></h2></TextReveal>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
            {[
              { name: 'Startups', desc: 'MVP development, rapid prototyping, scaling', icon: '🚀' },
              { name: 'E-Commerce', desc: 'Marketplaces, payment integration, analytics', icon: '🛒' },
              { name: 'Healthcare', desc: 'HIPAA compliance, telemedicine, EHR', icon: '🏥' },
              { name: 'Finance', desc: 'Fintech, banking, secure transactions', icon: '💰' },
              { name: 'Education', desc: 'LMS, virtual classrooms, assessment', icon: '📚' },
              { name: 'Logistics', desc: 'Fleet tracking, supply chain, optimization', icon: '🚚' }
            ].map((industry, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="liquid-glass" style={{ padding: '18px', borderRadius: '10px' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{industry.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{industry.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{industry.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
        <div className="container">
          <TextReveal><h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', lineHeight: 1.1, marginBottom: '16px' }}>Ready to start?</h2></TextReveal>
          <TextReveal delay={0.1}><p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', maxWidth: '360px', margin: '0 auto 20px' }}>Let's discuss your project and find the right solution.</p></TextReveal>
          <Link to="/contact" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            style={{ display: 'inline-block' }}>
            <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--accent)' }} whileTap={{ scale: 0.95 }}
              style={{ padding: '12px 28px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: '#fff', cursor: 'pointer', textAlign: 'center', fontFamily: "var(--font-code)", background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
              {'>'} get_in_touch
            </motion.div>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
