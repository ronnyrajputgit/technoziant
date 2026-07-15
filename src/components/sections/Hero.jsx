import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { NetworkAnimation } from '../ui/NetworkAnimation'

export function Hero() {
  const ref = useRef(null)
  const { setCursorType } = useApp()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: '80px', paddingBottom: '40px' }}>
      <NetworkAnimation />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.025,
        backgroundImage: `linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)`,
        backgroundSize: '80px 80px' }} />

      <motion.div style={{ y, opacity, position: 'relative', zIndex: 1, width: '100%', padding: '0 clamp(20px, 5vw, 80px)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '16px' }}>
            {['We craft', 'digital', 'products'].map((line, i) => (
              <div key={i} style={{ overflow: 'hidden', marginBottom: i === 2 ? '0' : '4px' }}>
                <motion.h1 initial={{ y: '110%' }} animate={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 + i * 0.08 }}
                  style={{ fontSize: 'clamp(52px, 12vw, 160px)', fontWeight: '700', lineHeight: 0.92, letterSpacing: '-0.04em', fontFamily: 'var(--font-h)' }}>
                  {i === 1 ? <span className="text-gradient">{line}</span> : line}
                  {i === 2 && <span style={{ opacity: 0.15 }}>.</span>}
                </motion.h1>
              </div>
            ))}
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ fontSize: '16px', color: 'var(--text-muted)', maxWidth: '550px', lineHeight: 1.7, marginBottom: '24px' }}>
            Creative studio blending storytelling, art, and cutting-edge technology to deliver award-winning digital experiences.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <Link to="/work" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
              style={{ display: 'inline-block' }}>
              <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--accent)' }} whileTap={{ scale: 0.95 }}
                className="liquid-glass-strong" style={{ padding: '14px 32px', color: 'var(--text)', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', textAlign: 'center', fontFamily: "var(--font-code)" }}>
                {'>'} view_work
              </motion.div>
            </Link>
            <Link to="/services" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
              style={{ display: 'inline-block' }}>
              <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--accent)' }} whileTap={{ scale: 0.95 }}
                className="liquid-glass" style={{ padding: '14px 32px', color: 'var(--text)', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', textAlign: 'center', fontFamily: "var(--font-code)" }}>
                {'>'} services
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats Cards - Full Width */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', maxWidth: '700px' }}>
            {[
              { n: '150+', l: 'Projects', color: '#22c55e' },
              { n: '50+', l: 'Clients', color: '#3b82f6' },
              { n: '12+', l: 'Awards', color: '#a855f7' },
              { n: '99%', l: 'Satisfaction', color: '#f59e0b' }
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + i * 0.1 }}
                className="liquid-glass" style={{ padding: '18px 14px', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', fontFamily: 'var(--font-h)', color: s.color }}>{s.n}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
