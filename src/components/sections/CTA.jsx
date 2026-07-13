import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TextReveal } from '../ui/TextReveal'
import { useApp } from '../../context/AppContext'

export function CTA() {
  const { setCursorType } = useApp()
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(40px, 6vw, 80px) 0' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '20%', left: '30%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, var(--accent), transparent 70%)', opacity: 0.05, filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, var(--accent-2), transparent 70%)', opacity: 0.04, filter: 'blur(60px)' }} />
      </div>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <TextReveal>
          <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Start a Project</div>
        </TextReveal>
        <div style={{ overflow: 'hidden', marginBottom: '4px' }}>
          <motion.h2 initial={{ y: '110%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            style={{ fontSize: 'clamp(36px, 8vw, 100px)', fontWeight: '700', lineHeight: 1, letterSpacing: '-0.04em', fontFamily: 'var(--font-h)' }}>
            Let's create <span className="text-gradient">amazing</span>
          </motion.h2>
        </div>
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '16px' }}>
          <Link to="/contact" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            style={{ display: 'inline-block' }}>
            <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--accent)' }} whileTap={{ scale: 0.95 }}
              className="liquid-glass-strong" style={{ padding: '12px 28px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: 'var(--text)', cursor: 'pointer', textAlign: 'center', fontFamily: "var(--font-code)" }}>
              {'> get_in_touch'}
            </motion.div>
          </Link>
          <Link to="/work" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            style={{ display: 'inline-block' }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="liquid-glass" style={{ padding: '12px 28px', borderRadius: '8px', fontSize: '12px', fontWeight: '500', color: 'var(--text)', cursor: 'pointer', textAlign: 'center', fontFamily: "var(--font-code)" }}>
              {'> view_work'}
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
