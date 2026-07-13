import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { NetworkAnimation } from '../ui/NetworkAnimation'

export function Hero() {
  const ref = useRef(null)
  const { setCursorType } = useApp()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.97])

  return (
    <section ref={ref} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: '80px', paddingBottom: '60px' }}>
      <NetworkAnimation />

      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '10%', left: '15%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, var(--accent), transparent 70%)', opacity: 0.06, filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, var(--accent-2), transparent 70%)', opacity: 0.05, filter: 'blur(80px)' }} />
      </div>

      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.025,
        backgroundImage: `linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)`,
        backgroundSize: '80px 80px' }} />

      <motion.div style={{ y, opacity, scale, position: 'relative', zIndex: 1 }} className="container">
        <div style={{ marginBottom: '16px' }}>
          {['We craft', 'digital', 'products'].map((line, i) => (
            <div key={i} style={{ overflow: 'hidden', marginBottom: i === 2 ? '0' : '2px' }}>
              <motion.h1 initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 + i * 0.08 }}
                style={{ fontSize: 'clamp(48px, 10vw, 130px)', fontWeight: '700', lineHeight: 0.95, letterSpacing: '-0.04em', fontFamily: 'var(--font-h)' }}>
                {i === 1 ? <span className="text-gradient">{line}</span> : line}
                {i === 2 && <span style={{ opacity: 0.15 }}>.</span>}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '400px', lineHeight: 1.7, marginBottom: '20px' }}>
          Creative studio blending storytelling, art, and cutting-edge technology to deliver award-winning digital experiences.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          <Link to="/work" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            style={{ display: 'inline-block' }}>
            <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--accent)' }} whileTap={{ scale: 0.95 }}
              className="liquid-glass-strong" style={{ padding: '12px 28px', color: 'var(--text)', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', textAlign: 'center', fontFamily: "var(--font-code)" }}>
              {'> view_work'}
            </motion.div>
          </Link>
          <Link to="/contact" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            style={{ display: 'inline-block' }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="liquid-glass" style={{ padding: '12px 28px', color: 'var(--text)', borderRadius: '8px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', textAlign: 'center', fontFamily: "var(--font-code)" }}>
              {'> start_project'}
            </motion.div>
          </Link>
        </motion.div>

        {/* Code snippet stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          className="liquid-glass" style={{ padding: '16px 20px', borderRadius: '10px', maxWidth: '400px', fontFamily: "var(--font-code)", fontSize: '11px', lineHeight: '20px' }}>
          <div style={{ color: 'var(--code-comment)' }}>{'// our impact'}</div>
          <div><span style={{ color: 'var(--code-keyword)' }}>const</span> <span style={{ color: 'var(--code-property)' }}>stats</span> = {'{'}</div>
          <div style={{ paddingLeft: '16px' }}><span style={{ color: 'var(--code-property)' }}>projects</span>: <span style={{ color: 'var(--code-string)' }}>'150+'</span>,</div>
          <div style={{ paddingLeft: '16px' }}><span style={{ color: 'var(--code-property)' }}>clients</span>: <span style={{ color: 'var(--code-string)' }}>'50+'</span>,</div>
          <div style={{ paddingLeft: '16px' }}><span style={{ color: 'var(--code-property)' }}>awards</span>: <span style={{ color: 'var(--code-string)' }}>'12+'</span>,</div>
          <div style={{ paddingLeft: '16px' }}><span style={{ color: 'var(--code-property)' }}>satisfaction</span>: <span style={{ color: 'var(--code-string)' }}>'99%'</span></div>
          <div>{'}'}</div>
        </motion.div>
      </motion.div>
    </section>
  )
}
