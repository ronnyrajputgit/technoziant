import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TextReveal } from '../ui/TextReveal'
import { useApp } from '../../context/AppContext'

export function CTA() {
  const { setCursorType } = useApp()
  return (
    <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '20%', left: '30%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, var(--accent), transparent 70%)', opacity: 0.05, filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, var(--accent-2), transparent 70%)', opacity: 0.04, filter: 'blur(60px)' }} />
      </div>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>Start a Project</div></TextReveal>
        {["Let's create", 'something', 'amazing'].map((line, i) => (
          <div key={i} style={{ overflow: 'hidden', marginBottom: i === 2 ? '32px' : '6px' }}>
            <motion.h2 initial={{ y: '110%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: i * 0.08 }}
              style={{ fontSize: 'clamp(44px, 9vw, 120px)', fontWeight: '700', lineHeight: 0.95, letterSpacing: '-0.04em', fontFamily: 'var(--font-h)' }}>
              {i === 1 ? <span className="text-gradient">{line}</span> : line}{i === 2 && <span style={{ opacity: 0.15 }}>.</span>}
            </motion.h2>
          </div>
        ))}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/contact" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
            <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 40px var(--accent)' }} whileTap={{ scale: 0.95 }}
              className="liquid-glass-strong" style={{ padding: '15px 34px', borderRadius: '100px', fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>Get in Touch</motion.button>
          </Link>
          <Link to="/work" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="liquid-glass" style={{ padding: '15px 34px', borderRadius: '100px', fontSize: '13px', fontWeight: '500', color: 'var(--text)' }}>View Work</motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
