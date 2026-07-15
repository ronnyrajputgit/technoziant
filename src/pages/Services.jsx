import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TextReveal } from '../components/ui/TextReveal'
import { WaterDropCard } from '../components/ui/Cards'
import { useApp } from '../context/AppContext'
import { Footer } from '../components/layout/Footer'

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

const industries = [
  { name: 'Startups', desc: 'MVP development, rapid prototyping, scaling', icon: '🚀', flow: ['ideate', 'build', 'launch', 'scale'] },
  { name: 'E-Commerce', desc: 'Marketplaces, payment integration, analytics', icon: '🛒', flow: ['catalog', 'cart', 'checkout', 'revenue'] },
  { name: 'Healthcare', desc: 'HIPAA compliance, telemedicine, EHR', icon: '🏥', flow: ['patient', 'diagnose', 'treat', 'follow-up'] },
  { name: 'Finance', desc: 'Fintech, banking, secure transactions', icon: '💰', flow: ['auth', 'transact', 'verify', 'settle'] },
  { name: 'Education', desc: 'LMS, virtual classrooms, assessment', icon: '📚', flow: ['enroll', 'learn', 'practice', 'certify'] },
  { name: 'Logistics', desc: 'Fleet tracking, supply chain, optimization', icon: '🚚', flow: ['track', 'route', 'deliver', 'confirm'] }
]

export function Services() {
  const { setCursorType } = useApp()
  const [activeIndustry, setActiveIndustry] = useState(null)

  return (
    <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section className="container" style={{ marginBottom: '32px' }}>
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>services</div></TextReveal>
        <TextReveal delay={0.1}><h1 style={{ fontSize: 'clamp(40px, 8vw, 90px)', fontWeight: '700', lineHeight: 0.95, marginBottom: '12px' }}>What we<br /><span className="text-gradient">do best</span></h1></TextReveal>
        <TextReveal delay={0.2}><p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '420px' }}>Comprehensive digital solutions for every industry. From startups to enterprises.</p></TextReveal>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 0 }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {services.map(s => (
            <Link to={`/services/${slugMap[s.title] || s.title.toLowerCase().replace(/\s+/g, '-')}`} key={s.id}>
              <WaterDropCard color={s.color} style={{ padding: 0 }}>
                <div onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                  style={{ display: 'grid', gridTemplateColumns: '70px 1fr auto', gap: '14px', padding: '14px', alignItems: 'center' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '3px' }}>{s.title}</h3>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{s.description}</p>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px' }}>
            {techStack.map((tech, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="liquid-glass" style={{ padding: '14px', borderRadius: '8px', textAlign: 'center', cursor: 'default' }}>
                <div style={{ fontSize: '22px', marginBottom: '4px' }}>{tech.icon}</div>
                <div style={{ fontSize: '10px', fontWeight: '500', fontFamily: "var(--font-code)" }}>{tech.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Industries */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>industries</div></TextReveal>
            <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', lineHeight: 1 }}>Industries We <span className="text-gradient">Serve</span></h2></TextReveal>
            <TextReveal delay={0.2}><p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '400px', margin: '12px auto 0', lineHeight: 1.6 }}>Click any industry to see the workflow pipeline.</p></TextReveal>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
            {industries.map((industry, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="liquid-glass" style={{ padding: '18px', borderRadius: '10px', cursor: 'pointer' }}
                onClick={() => setActiveIndustry(activeIndustry === i ? null : i)}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{industry.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{industry.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '8px' }}>{industry.desc}</div>

                <AnimatePresence>
                  {activeIndustry === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--glass-border)' }}>
                        {industry.flow.map((step, j) => (
                          <motion.div key={j} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: j * 0.1 }}
                            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '9px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(34,197,94,0.1)', color: '#22c55e', fontFamily: "var(--font-code)" }}>{step}</span>
                            {j < industry.flow.length - 1 && <span style={{ fontSize: '8px', color: 'var(--text-muted)' }}>→</span>}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>why_us</div></TextReveal>
            <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', lineHeight: 1 }}>Why Choose <span className="text-gradient">Technoziant</span></h2></TextReveal>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="liquid-glass" style={{ borderRadius: '10px', overflow: 'hidden', maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 14px', borderBottom: '1px solid var(--glass-border)', background: 'var(--surface)' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#28c840' }} />
              <span style={{ marginLeft: '8px', fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>advantages.ts</span>
            </div>
            <div style={{ padding: '20px', fontFamily: "var(--font-code)", fontSize: '12px', lineHeight: '24px' }}>
              <div><span style={{ color: 'var(--code-comment)' }}>{'// Why teams choose us'}</span></div>
              <div><span style={{ color: 'var(--code-keyword)' }}>export const</span> <span style={{ color: 'var(--code-property)' }}>advantages</span> = {'{'}</div>
              {[
                { key: 'experience', val: '20+ years combined' },
                { key: 'delivery', val: '99% on-time delivery' },
                { key: 'support', val: '24/7 maintenance' },
                { key: 'tech', val: 'Modern stack only' },
                { key: 'process', val: 'Agile methodology' },
                { key: 'result', val: 'Award-winning work' }
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  style={{ paddingLeft: '16px' }}>
                  <span style={{ color: 'var(--code-property)' }}>{item.key}</span>: <span style={{ color: 'var(--code-string)' }}>'{item.val}'</span>,
                </motion.div>
              ))}
              <div>{'}'}</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
        <div className="container">
          <div className="liquid-glass" style={{ padding: '32px', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <TextReveal><h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: '700', lineHeight: 1.1, marginBottom: '12px' }}>Ready to start?</h2></TextReveal>
              <TextReveal delay={0.1}><p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', maxWidth: '360px', margin: '0 auto 16px' }}>Let's discuss your project and find the right solution.</p></TextReveal>
              <Link to="/contact" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                style={{ display: 'inline-block' }}>
                <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--accent)' }} whileTap={{ scale: 0.95 }}
                  style={{ padding: '12px 28px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: '#fff', cursor: 'pointer', textAlign: 'center', fontFamily: "var(--font-code)", background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
                  {'>'} get_in_touch
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
