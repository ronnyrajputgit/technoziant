import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export function WaterDropCard({ children, className = '', style = {}, color = 'var(--accent)', onClick }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  const [m, setM] = useState({ x: 0, y: 0 })
  const [h, setH] = useState(false)

  return (
    <motion.div ref={ref} className={`liquid-glass texture-noise ${className}`} onClick={onClick}
      onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setM({ x: e.clientX - r.left, y: e.clientY - r.top }) }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      style={{ cursor: 'pointer', ...style }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', zIndex: 0,
        background: `radial-gradient(450px circle at ${m.x}px ${m.y}px, ${color}14, transparent 50%)`, opacity: h ? 1 : 0, transition: 'opacity 0.4s' }} />
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </motion.div>
  )
}

export function GlassCard({ children, className = '', style = {} }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  return (
    <motion.div ref={ref} className={`liquid-glass texture-noise ${className}`}
      initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }} style={style}>
      {children}
    </motion.div>
  )
}

export function GlowCard({ children, className = '', style = {}, glowColor = 'var(--accent)', onClick }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  const [h, setH] = useState(false)
  return (
    <motion.div ref={ref} className={`liquid-glass texture-noise ${className}`} onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      style={{ boxShadow: h ? `0 8px 40px ${glowColor}15` : 'none', cursor: 'pointer', transition: 'box-shadow 0.4s', ...style }}>
      {children}
    </motion.div>
  )
}
