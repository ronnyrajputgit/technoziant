import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

export function Hero() {
  const ref = useRef(null)
  const { setCursorType } = useApp()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95])

  return (
    <section ref={ref} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '10%', left: '15%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, var(--accent), transparent 70%)', opacity: 0.06, filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, var(--accent-2), transparent 70%)', opacity: 0.05, filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', top: '50%', left: '60%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, var(--accent-3), transparent 70%)', opacity: 0.04, filter: 'blur(60px)' }} />
      </div>

      {/* Grid texture */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.025,
        backgroundImage: `linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)`,
        backgroundSize: '80px 80px' }} />

      <motion.div style={{ y, opacity, scale }} className="container">
        {/* Heading with clear separation */}
        <div style={{ marginBottom: '24px' }}>
          {['We craft', 'digital', 'experiences'].map((line, i) => (
            <div key={i} style={{ overflow: 'hidden', marginBottom: i === 2 ? '0' : '4px' }}>
              <motion.h1 initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 + i * 0.08 }}
                style={{ fontSize: 'clamp(52px, 11vw, 148px)', fontWeight: '700', lineHeight: 0.94, letterSpacing: '-0.04em', fontFamily: 'var(--font-h)' }}>
                {i === 1 ? <span className="text-gradient">{line}</span> : line}
                {i === 2 && <span style={{ opacity: 0.15 }}>.</span>}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '420px', lineHeight: 1.7, marginBottom: '28px' }}>
          We are a creative studio that blends storytelling, art, and cutting-edge technology to deliver award-winning digital experiences.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '60px' }}>
          <Link to="/work" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
            <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 40px var(--accent)' }} whileTap={{ scale: 0.95 }}
              className="liquid-glass-strong" style={{ padding: '15px 34px', color: 'var(--text)', borderRadius: '100px', fontSize: '13px', fontWeight: '600', letterSpacing: '0.02em' }}>
              View Our Work →
            </motion.button>
          </Link>
          <Link to="/contact" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="liquid-glass" style={{ padding: '15px 34px', color: 'var(--text)', borderRadius: '100px', fontSize: '13px', fontWeight: '500' }}>
              Start a Project
            </motion.button>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          {[{ n: '150+', l: 'Projects' }, { n: '50+', l: 'Clients' }, { n: '12+', l: 'Awards' }, { n: '99%', l: 'Satisfaction' }].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: '26px', fontWeight: '700', fontFamily: 'var(--font-h)' }}><span className="text-gradient">{s.n}</span></div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        style={{ position: 'absolute', bottom: '36px', left: 'clamp(20px, 4vw, 60px)', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, var(--text-muted), transparent)' }} />
      </motion.div>
    </section>
  )
}
