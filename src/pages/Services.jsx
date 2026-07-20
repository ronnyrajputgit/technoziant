import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TextReveal } from '../components/ui/TextReveal'
import { WaterDropCard } from '../components/ui/Cards'
import { useApp } from '../context/AppContext'
import { Footer } from '../components/layout/Footer'
import { api } from '../utils/api'

const slugMap = {
  'Web Development': 'web-development',
  'Mobile Apps': 'mobile-apps',
  'Brand & Identity': 'brand-identity',
  'UI/UX Design': 'ui-ux-design',
  'Cloud & DevOps': 'cloud-devops',
  'AI & Machine Learning': 'ai-machine-learning'
}

const icons = {
  web: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  mobile: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>,
  brand: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  design: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  cloud: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>,
  ai: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a4 4 0 00-4 4v2H6a2 2 0 00-2 2v2a2 2 0 002 2h2v2a4 4 0 008 0v-2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2V6a4 4 0 00-4-4z"/></svg>
}

const serviceColors = ['#4f8eff', '#a855f7', '#f472b6', '#06d6a0', '#22d3ee', '#fbbf24', '#ef4444']
const defaultTechIcons = ['⚛️', '▲', '🟢', '📘', '🐍', '💙', '☁️', '🐳', '🐘', '🍃', '◆', '🔴']
const defaultIndIcons = ['🚀', '🛒', '🏥', '💰', '📚', '🚚', '⚡', '🏗️', '🎮', '📡']

export function Services() {
  const { setCursorType } = useApp()
  const [activeIndustry, setActiveIndustry] = useState(null)
  const [services, setServices] = useState([])
  const [industries, setIndustries] = useState([])
  const [techStack, setTechStack] = useState([])

  useEffect(() => {
    api.getContent('services', { visible: 'true' }).then(setServices).catch(() => {})
    api.getContent('industries', { visible: 'true' }).then(setIndustries).catch(() => {})
    api.getContent('tech_stack', { visible: 'true' }).then(setTechStack).catch(() => {})
  }, [])

  return (
    <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section className="container" style={{ marginBottom: '32px' }}>
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>services</div></TextReveal>
        <TextReveal delay={0.1}><h1 style={{ fontSize: 'clamp(40px, 8vw, 90px)', fontWeight: '700', lineHeight: 0.95, marginBottom: '12px' }}>What we<br /><span className="text-gradient">do best</span></h1></TextReveal>
        <TextReveal delay={0.2}><p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '420px' }}>Comprehensive digital solutions for every industry. From startups to enterprises.</p></TextReveal>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 0 }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {services.map((s, i) => (
            <Link to={`/services/${slugMap[s.title] || s.title.toLowerCase().replace(/\s+/g, '-')}`} key={s.id}>
              <WaterDropCard color={serviceColors[i % serviceColors.length]} style={{ padding: 0 }}>
                <div onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                  style={{ display: 'grid', gridTemplateColumns: '70px 1fr auto', gap: '14px', padding: '14px', alignItems: 'center' }}>
                  <div className="liquid-glass" style={{ width: '60px', height: '60px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: serviceColors[i % serviceColors.length] }}>
                    {icons[s.icon] || icons.web}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '3px' }}>{s.title}</h3>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{s.description}</p>
                  </div>
                  <div className="liquid-glass" style={{ padding: '5px 12px', borderRadius: '6px', fontSize: '10px', color: serviceColors[i % serviceColors.length], fontWeight: '500', whiteSpace: 'nowrap', fontFamily: "var(--font-code)" }}>
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
            <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>tech stack</div></TextReveal>
            <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', lineHeight: 1 }}>Technologies We <span className="text-gradient">Use</span></h2></TextReveal>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px' }}>
            {techStack.map((tech, i) => (
              <motion.div key={tech.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="liquid-glass" style={{ padding: '14px', borderRadius: '8px', textAlign: 'center', cursor: 'default' }}>
                <div style={{ fontSize: '22px', marginBottom: '4px' }}>{tech.icon || defaultTechIcons[i % defaultTechIcons.length]}</div>
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
            <TextReveal delay={0.2}><p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '400px', margin: '12px auto 0', lineHeight: 1.6 }}>Click any industry to see more details.</p></TextReveal>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
            {industries.map((industry, i) => (
              <motion.div key={industry.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="liquid-glass" style={{ padding: '18px', borderRadius: '10px', cursor: 'pointer' }}
                onClick={() => setActiveIndustry(activeIndustry === industry.id ? null : industry.id)}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{industry.icon || defaultIndIcons[i % defaultIndIcons.length]}</div>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{industry.title}</div>
                {industry.description && <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '8px' }}>{industry.description}</div>}

                <AnimatePresence>
                  {activeIndustry === industry.id && industry.description && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                      <div style={{ paddingTop: '8px', borderTop: '1px solid var(--glass-border)' }}>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{industry.description}</p>
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
            <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>why us</div></TextReveal>
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
                  {'>'} get in touch
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
