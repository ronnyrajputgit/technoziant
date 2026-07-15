import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import { solutionDetails } from '../data/solutionDetails'
import { WaterDropCard } from '../components/ui/Cards'
import { useApp } from '../context/AppContext'
import { Footer } from '../components/layout/Footer'

function ScrollSection({ children, className = '', style = {} }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} style={style}>
      {children}
    </motion.div>
  )
}

function ProblemCard({ problem, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}>
      <WaterDropCard color="#ef4444" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
          <span style={{ fontSize: '28px' }}>{problem.icon}</span>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '17px', fontWeight: '600', marginBottom: '6px' }}>{problem.title}</h3>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '8px' }}>{problem.description}</p>
            <span className="liquid-glass" style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '100px', fontSize: '10px', color: '#ef4444', fontWeight: '600' }}>
              Impact: {problem.impact}
            </span>
          </div>
        </div>
      </WaterDropCard>
    </motion.div>
  )
}

function SolutionCard({ solution, index, color }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}>
      <WaterDropCard color={color} style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600' }}>{solution.title}</h3>
          <span className="liquid-glass" style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '10px', color: '#06d6a0', fontWeight: '600' }}>
            ✓ {solution.result}
          </span>
        </div>
        <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '14px' }}>{solution.description}</p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {solution.tech.map(t => (
            <span key={t} className="liquid-glass" style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '10px', color, fontWeight: '500' }}>{t}</span>
          ))}
        </div>
      </WaterDropCard>
    </motion.div>
  )
}

function PhaseItem({ phase, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div key={index} ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}>
      <WaterDropCard color={phase.color} style={{ padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: '20px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div className="liquid-glass" style={{ width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px', color: phase.color, fontWeight: '700', fontSize: '14px' }}>
              W{phase.week}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '2px' }}>{phase.title}</h4>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Week {phase.week}</p>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {phase.items.map(item => (
              <span key={item} className="liquid-glass" style={{ padding: '3px 8px', borderRadius: '100px', fontSize: '10px', color: 'var(--text-muted)' }}>{item}</span>
            ))}
          </div>
        </div>
      </WaterDropCard>
    </motion.div>
  )
}

function MetricItem({ m, index, color }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div key={index} ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}>
      <WaterDropCard color={color} style={{ padding: '24px', textAlign: 'center' }}>
        <span style={{ fontSize: '28px', marginBottom: '12px', display: 'block' }}>{m.icon}</span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '16px', color: '#ef4444', textDecoration: 'line-through', opacity: 0.6 }}>{m.before}</span>
          <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>→</span>
          <span style={{ fontSize: '22px', fontWeight: '700', color: '#06d6a0' }}>{m.after}</span>
        </div>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{m.label}</p>
      </WaterDropCard>
    </motion.div>
  )
}

export function SolutionDetail() {
  const { slug } = useParams()
  const { setCursorType } = useApp()
  const solution = solutionDetails[slug]

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  if (!solution) {
    return (
      <main style={{ paddingTop: '110px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '16px' }}>Solution Not Found</h1>
          <Link to="/solutions" style={{ color: 'var(--accent)' }}>← Back to Solutions</Link>
        </div>
      </main>
    )
  }

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* Hero */}
      <section ref={heroRef} style={{ position: 'relative', height: '70vh', minHeight: '500px', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <motion.div style={{ y: heroY, opacity: heroOpacity, position: 'absolute', inset: 0 }}>
          <img src={solution.heroImage} alt={solution.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, var(--bg) 0%, ${solution.color}15 40%, transparent 70%)` }} />
        </motion.div>
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: '48px' }}>
          <Link to="/solutions" className="liquid-glass" style={{ display: 'inline-flex', padding: '6px 14px', borderRadius: '100px', fontSize: '11px', color: 'var(--text)', marginBottom: '20px' }}>
            ← Back to Solutions
          </Link>
          <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: '700', lineHeight: 0.95, marginBottom: '8px', fontFamily: 'var(--font-h)' }}>
            {solution.title}
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ fontSize: '14px', color: solution.color, marginBottom: '8px', fontWeight: '500' }}>{solution.subtitle}</motion.p>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '500px', lineHeight: 1.7 }}>{solution.tagline}</motion.p>
        </div>
      </section>

      {/* Problems Section */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <ScrollSection>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span className="liquid-glass" style={{ display: 'inline-block', padding: '5px 14px', borderRadius: '100px', fontSize: '10px', color: '#ef4444', fontWeight: '600', letterSpacing: '0.1em', marginBottom: '14px' }}>
                The Problem
              </span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', fontFamily: 'var(--font-h)' }}>
                Challenges We <span style={{ color: '#ef4444' }}>Solved</span>
              </h2>
            </div>
          </ScrollSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px' }}>
            {solution.problems.map((p, i) => <ProblemCard key={i} problem={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <ScrollSection>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span className="liquid-glass" style={{ display: 'inline-block', padding: '5px 14px', borderRadius: '100px', fontSize: '10px', color: '#06d6a0', fontWeight: '600', letterSpacing: '0.1em', marginBottom: '14px' }}>
                The Solution
              </span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', fontFamily: 'var(--font-h)' }}>
                How We <span className="text-gradient">Fixed It</span>
              </h2>
            </div>
          </ScrollSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px' }}>
            {solution.solutions.map((s, i) => <SolutionCard key={i} solution={s} index={i} color={solution.color} />)}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <ScrollSection>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span className="liquid-glass" style={{ display: 'inline-block', padding: '5px 14px', borderRadius: '100px', fontSize: '10px', color: solution.color, fontWeight: '600', letterSpacing: '0.1em', marginBottom: '14px' }}>
                Timeline
              </span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', fontFamily: 'var(--font-h)' }}>
                Project <span className="text-gradient">Timeline</span>
              </h2>
            </div>
          </ScrollSection>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {solution.phases.map((phase, i) => (
              <PhaseItem key={i} phase={phase} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <ScrollSection>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', fontFamily: 'var(--font-h)' }}>
                Results <span className="text-gradient">Delivered</span>
              </h2>
            </div>
          </ScrollSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {solution.metrics.map((m, i) => (
              <MetricItem key={i} m={m} index={i} color={solution.color} />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <ScrollSection>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '700', marginBottom: '20px', fontFamily: 'var(--font-h)' }}>Tech Stack</h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {solution.techStack.map(t => (
                <span key={t} className="liquid-glass" style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '12px', fontWeight: '500' }}>{t}</span>
              ))}
            </div>
          </ScrollSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', marginBottom: '16px' }}>Want Similar Results?</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '28px' }}>Let's discuss how we can solve your challenges.</p>
          <Link to="/contact" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
            <motion.button whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${solution.color}` }} whileTap={{ scale: 0.95 }}
              className="liquid-glass-strong" style={{ padding: '16px 40px', borderRadius: '100px', fontSize: '14px', fontWeight: '600', color: 'var(--text)' }}>
              Start Your Project →
            </motion.button>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
