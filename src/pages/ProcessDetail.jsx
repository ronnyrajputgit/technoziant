import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import { processDetails } from '../data/processDetails'
import { WaterDropCard } from '../components/ui/Cards'
import { useApp } from '../context/AppContext'
import { Footer } from '../components/layout/Footer'

function ScrollReveal({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const dirs = { up: { y: 40 }, down: { y: -40 }, left: { x: -40 }, right: { x: 40 } }
  return (
    <motion.div ref={ref} initial={{ opacity: 0, ...dirs[direction] }} animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.76, 0, 0.24, 1] }}>{children}</motion.div>
  )
}

function ActivityCard({ activity, index, color }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}>
      <WaterDropCard color={color} style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
          <img src={activity.image} alt={activity.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg) 0%, transparent 60%)' }} />
          <span style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '24px' }}>{activity.icon}</span>
        </div>
        <div style={{ padding: '18px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '6px' }}>{activity.title}</h3>
          <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'var(--text-muted)' }}>{activity.description}</p>
        </div>
      </WaterDropCard>
    </motion.div>
  )
}

function SupportChannel({ channel, index, color }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}>
      <WaterDropCard color={color} style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', minHeight: '140px' }}>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img src={channel.image} alt={channel.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 40%, var(--bg) 100%)' }} />
          </div>
          <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '20px' }}>{channel.icon}</span>
              <h3 style={{ fontSize: '15px', fontWeight: '600' }}>{channel.title}</h3>
            </div>
            <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '10px' }}>{channel.description}</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="liquid-glass" style={{ padding: '3px 8px', borderRadius: '100px', fontSize: '9px', color }}>🕐 {channel.availability}</span>
              <span className="liquid-glass" style={{ padding: '3px 8px', borderRadius: '100px', fontSize: '9px', color }}>⚡ {channel.responseTime}</span>
            </div>
          </div>
        </div>
      </WaterDropCard>
    </motion.div>
  )
}

function PlanCard({ plan, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}>
      <WaterDropCard color={plan.color} style={{ padding: '28px', textAlign: 'center', border: index === 1 ? `2px solid ${plan.color}40` : undefined }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>{plan.name}</h3>
        <div style={{ fontSize: '28px', fontWeight: '700', fontFamily: 'var(--font-h)', marginBottom: '16px' }}>
          <span className="text-gradient">{plan.price}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
          {plan.features.map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span style={{ color: '#06d6a0', fontSize: '10px' }}>✓</span> {f}
            </div>
          ))}
        </div>
      </WaterDropCard>
    </motion.div>
  )
}

function MetricCard({ metric, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}>
      <WaterDropCard color="#22d3ee" style={{ padding: '20px', textAlign: 'center' }}>
        <span style={{ fontSize: '24px', marginBottom: '8px', display: 'block' }}>{metric.icon}</span>
        <div style={{ fontSize: '22px', fontWeight: '700', fontFamily: 'var(--font-h)' }}>
          <span className="text-gradient">{metric.value}</span>
        </div>
        <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>{metric.label}</p>
      </WaterDropCard>
    </motion.div>
  )
}

function SupportSection({ process }) {
  return (
    <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span className="liquid-glass" style={{ display: 'inline-block', padding: '5px 14px', borderRadius: '100px', fontSize: '10px', color: process.color, fontWeight: '600', letterSpacing: '0.1em', marginBottom: '14px' }}>
              Support Channels
            </span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', fontFamily: 'var(--font-h)', marginBottom: '8px' }}>
              Multiple Ways to <span className="text-gradient">Get Help</span>
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              From AI-powered instant responses to dedicated human experts, we've got every support channel covered.
            </p>
          </div>
        </ScrollReveal>

        {/* Auto-scrolling horizontal cards */}
        <div style={{ overflow: 'hidden', margin: '0 -20px', padding: '20px 0' }}>
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', gap: '16px', width: 'fit-content' }}>
            {[...process.channels, ...process.channels].map((ch, i) => (
              <div key={i} className="liquid-glass texture-noise" style={{ minWidth: '280px', padding: '20px', borderRadius: 'var(--radius)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '24px' }}>{ch.icon}</span>
                  <h3 style={{ fontSize: '14px', fontWeight: '600' }}>{ch.title}</h3>
                </div>
                <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '10px' }}>{ch.description}</p>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span className="liquid-glass" style={{ padding: '3px 8px', borderRadius: '100px', fontSize: '9px', color: process.color }}>🕐 {ch.availability}</span>
                  <span className="liquid-glass" style={{ padding: '3px 8px', borderRadius: '100px', fontSize: '9px', color: process.color }}>⚡ {ch.responseTime}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Detailed cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px', marginTop: '40px' }}>
          {process.channels.map((ch, i) => <SupportChannel key={i} channel={ch} index={i} color={process.color} />)}
        </div>

        {/* Support Plans */}
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginTop: '60px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '700', fontFamily: 'var(--font-h)' }}>
              Support <span className="text-gradient">Plans</span>
            </h2>
          </div>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {process.plans.map((plan, i) => <PlanCard key={i} plan={plan} index={i} />)}
        </div>

        {/* Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginTop: '40px' }}>
          {process.metrics.map((m, i) => <MetricCard key={i} metric={m} index={i} />)}
        </div>
      </div>
    </section>
  )
}

export function ProcessDetail() {
  const { slug } = useParams()
  const { setCursorType } = useApp()
  const process = processDetails[slug]

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  if (!process) {
    return (
      <main style={{ paddingTop: '110px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '16px' }}>Process Not Found</h1>
          <Link to="/process" style={{ color: 'var(--accent)' }}>← Back to Process</Link>
        </div>
      </main>
    )
  }

  const hasDeliverables = process.deliverables && process.deliverables.length > 0
  const hasTools = process.tools && process.tools.length > 0

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* Hero */}
      <section ref={heroRef} style={{ position: 'relative', height: '65vh', minHeight: '450px', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <motion.div style={{ y: heroY, opacity: heroOpacity, position: 'absolute', inset: 0 }}>
          <img src={process.heroImage} alt={process.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, var(--bg) 0%, ${process.color}15 40%, transparent 70%)` }} />
        </motion.div>
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: '48px' }}>
          <Link to="/process" className="liquid-glass" style={{ display: 'inline-flex', padding: '6px 14px', borderRadius: '100px', fontSize: '11px', color: 'var(--text)', marginBottom: '20px' }}>
            ← Back to Process
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
            <span style={{ fontSize: '36px' }}>{process.icon}</span>
            <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: '700', lineHeight: 0.95, fontFamily: 'var(--font-h)' }}>
              {process.title}
            </motion.h1>
          </div>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ fontSize: '14px', color: process.color, marginBottom: '6px', fontWeight: '500' }}>{process.subtitle}</motion.p>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '500px', lineHeight: 1.7 }}>{process.description}</motion.p>
        </div>
      </section>

      {/* Support Section or Activities */}
      {slug === 'support' ? (
        <SupportSection process={process} />
      ) : (
        <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
          <div className="container">
            <ScrollReveal>
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <span className="liquid-glass" style={{ display: 'inline-block', padding: '5px 14px', borderRadius: '100px', fontSize: '10px', color: process.color, fontWeight: '600', letterSpacing: '0.1em', marginBottom: '14px' }}>
                  Activities
                </span>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', fontFamily: 'var(--font-h)' }}>
                  What We <span className="text-gradient">Do</span>
                </h2>
              </div>
            </ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
              {process.activities.map((a, i) => <ActivityCard key={i} activity={a} index={i} color={process.color} />)}
            </div>
          </div>
        </section>
      )}

      {/* Deliverables */}
      {hasDeliverables && (
        <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
          <div className="container">
            <ScrollReveal>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '700', marginBottom: '20px' }}>Deliverables</h2>
            </ScrollReveal>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {process.deliverables.map((d, i) => (
                <ScrollReveal key={d} delay={i * 0.05}>
                  <span className="liquid-glass" style={{ display: 'inline-block', padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: '500' }}>{d}</span>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tools */}
      {hasTools && (
        <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
          <div className="container">
            <ScrollReveal>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '700', marginBottom: '20px' }}>Tools We Use</h2>
            </ScrollReveal>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {process.tools.map((t, i) => (
                <ScrollReveal key={t} delay={i * 0.05}>
                  <span className="liquid-glass" style={{ display: 'inline-block', padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: '500', color: process.color }}>{t}</span>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', marginBottom: '16px' }}>Ready to Begin?</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '28px' }}>Let's start with {process.title.toLowerCase()} for your project.</p>
          <Link to="/contact" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
            <motion.button whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${process.color}` }} whileTap={{ scale: 0.95 }}
              className="liquid-glass-strong" style={{ padding: '16px 40px', borderRadius: '100px', fontSize: '14px', fontWeight: '600', color: 'var(--text)' }}>
              Get Started →
            </motion.button>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
