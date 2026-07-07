import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import { serviceDetails } from '../data/serviceDetails'
import { WaterDropCard } from '../components/ui/Cards'
import { useApp } from '../context/AppContext'
import { Footer } from '../components/layout/Footer'

function PhaseCard({ phase, index, color }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      style={{ display: 'grid', gridTemplateColumns: index % 2 === 0 ? '1fr 1fr' : '1fr 1fr', gap: '24px', alignItems: 'center', marginBottom: '80px' }}>
      {/* Content side */}
      <div style={{ order: index % 2 === 0 ? 1 : 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <span style={{ fontSize: '28px' }}>{phase.icon}</span>
          <span className="liquid-glass" style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '10px', color, fontWeight: '600', letterSpacing: '0.1em' }}>
            Phase {String(index + 1).padStart(2, '0')}
          </span>
          <span className="liquid-glass" style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '9px', color: 'var(--text-muted)' }}>
            {phase.duration}
          </span>
        </div>
        <h3 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: '700', marginBottom: '12px', fontFamily: 'var(--font-h)' }}>
          {phase.title}
        </h3>
        <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '400px' }}>
          {phase.description}
        </p>
      </div>

      {/* Code/Visual side */}
      <div style={{ order: index % 2 === 0 ? 2 : 1 }}>
        <WaterDropCard color={color} style={{ padding: 0 }}>
          <div style={{ padding: '0' }}>
            {/* Terminal header */}
            <div className="liquid-glass" style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--glass-border)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginLeft: '8px' }}>
                {phase.id}.js
              </span>
            </div>
            {/* Code content */}
            <div style={{ padding: '20px', background: 'rgba(0,0,0,0.2)' }}>
              <pre style={{ margin: 0, fontSize: '12px', lineHeight: 1.7, color: 'var(--text)', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                <code>{phase.code}</code>
              </pre>
            </div>
          </div>
        </WaterDropCard>
      </div>
    </motion.div>
  )
}

function PhaseTimeline({ phases, color }) {
  return (
    <div style={{ position: 'relative' }}>
      {/* Vertical line */}
      <div style={{
        position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px',
        background: `linear-gradient(to bottom, transparent, ${color}40, transparent)`,
        transform: 'translateX(-50%)'
      }} />

      {phases.map((phase, i) => (
        <div key={phase.id} style={{ position: 'relative', marginBottom: '40px' }}>
          {/* Timeline dot */}
          <div style={{
            position: 'absolute', left: '50%', top: '20px', width: '12px', height: '12px',
            borderRadius: '50%', background: color, border: '3px solid var(--bg)',
            transform: 'translateX(-50%)', zIndex: 2
          }} />

          <PhaseCard phase={phase} index={i} color={color} />
        </div>
      ))}
    </div>
  )
}

export function ServiceDetail() {
  const { slug } = useParams()
  const { setCursorType } = useApp()
  const service = serviceDetails[slug]

  if (!service) {
    return (
      <main style={{ paddingTop: '110px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '16px' }}>Service Not Found</h1>
          <Link to="/services" style={{ color: 'var(--accent)' }}>← Back to Services</Link>
        </div>
      </main>
    )
  }

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* Hero */}
      <section ref={heroRef} style={{ position: 'relative', height: '70vh', minHeight: '500px', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <motion.div style={{ y: heroY, opacity: heroOpacity, position: 'absolute', inset: 0 }}>
          <img src={service.heroImage} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, var(--bg) 0%, ${service.color}15 40%, transparent 70%)` }} />
        </motion.div>

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: '48px' }}>
          <Link to="/services" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            className="liquid-glass" style={{ display: 'inline-flex', padding: '6px 14px', borderRadius: '100px', fontSize: '11px', color: 'var(--text)', marginBottom: '20px' }}>
            ← Back to Services
          </Link>
          <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}
            style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: '700', lineHeight: 0.95, marginBottom: '12px', fontFamily: 'var(--font-h)' }}>
            {service.title}
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
            style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '500px', lineHeight: 1.7 }}>
            {service.description}
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
            {service.stats.map((stat, i) => (
              <WaterDropCard key={i} color={service.color} style={{ padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '700', fontFamily: 'var(--font-h)', marginBottom: '4px' }}>
                  <span className="text-gradient">{stat.value}</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{stat.label}</div>
              </WaterDropCard>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', marginBottom: '24px', fontFamily: 'var(--font-h)' }}>
            Technologies We <span className="text-gradient">Use</span>
          </h2>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {service.technologies.map(tech => (
              <span key={tech} className="liquid-glass" style={{ padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: '500', color: 'var(--text)' }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Development Phases - Scroll Animated */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="liquid-glass" style={{ display: 'inline-flex', padding: '6px 16px', borderRadius: '100px', fontSize: '10px', color: service.color, fontWeight: '600', letterSpacing: '0.1em', marginBottom: '16px' }}>
              Our Process
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', marginBottom: '12px', fontFamily: 'var(--font-h)' }}>
              From Idea to <span className="text-gradient">Reality</span>
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              Scroll through our development process to see how we bring your vision to life, phase by phase.
            </p>
          </div>

          {/* Scroll progress indicator */}
          <ScrollProgress phases={service.phases} color={service.color} />

          {/* Phase cards */}
          <div style={{ marginTop: '40px' }}>
            {service.phases.map((phase, i) => (
              <PhaseCard key={phase.id} phase={phase} index={i} color={service.color} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', marginBottom: '16px', fontFamily: 'var(--font-h)' }}>
            Ready to Start?
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '28px', maxWidth: '400px', margin: '0 auto 28px' }}>
            Let's discuss your project and create something amazing together.
          </p>
          <Link to="/contact" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
            <motion.button whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${service.color}` }} whileTap={{ scale: 0.95 }}
              className="liquid-glass-strong" style={{ padding: '16px 40px', borderRadius: '100px', fontSize: '14px', fontWeight: '600', color: 'var(--text)' }}>
              Get in Touch →
            </motion.button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function ScrollProgress({ phases, color }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })

  return (
    <div ref={ref} className="liquid-glass" style={{ padding: '16px 24px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '12px', maxWidth: '600px', margin: '0 auto' }}>
      {phases.map((phase, i) => (
        <div key={phase.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, flexShrink: 0 }} />
          <span style={{ fontSize: '9px', color: 'var(--text-muted)', whiteSpace: 'nowrap', display: window.innerWidth > 600 ? 'block' : 'none' }}>{phase.title.split(' ')[0]}</span>
          {i < phases.length - 1 && <div style={{ flex: 1, height: '1px', background: `${color}30` }} />}
        </div>
      ))}
    </div>
  )
}
