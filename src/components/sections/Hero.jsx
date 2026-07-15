import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { NetworkAnimation } from '../ui/NetworkAnimation'

const clients = [
  { name: 'Bloom Corp', type: 'E-Commerce', color: '#22c55e' },
  { name: 'PulseMed', type: 'Healthcare', color: '#3b82f6' },
  { name: 'FinSecure', type: 'Fintech', color: '#a855f7' },
  { name: 'DataCorp', type: 'Analytics', color: '#f59e0b' },
  { name: 'Echo Inc', type: 'Social', color: '#06d6a0' }
]

function CountUp({ target, duration = 2 }) {
  const [count, setCount] = useState(0)
  const num = parseInt(target)

  useEffect(() => {
    let start = 0
    const increment = num / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= num) { setCount(num); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [num, duration])

  return <span>{count}{target.includes('+') ? '+' : target.includes('%') ? '%' : ''}</span>
}

export function Hero() {
  const ref = useRef(null)
  const { setCursorType } = useApp()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const [clientIndex, setClientIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setClientIndex(prev => (prev + 1) % clients.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section ref={ref} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: '80px', paddingBottom: '40px' }}>
      <NetworkAnimation />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.025,
        backgroundImage: `linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)`,
        backgroundSize: '80px 80px' }} />

      <motion.div style={{ y, opacity, position: 'relative', zIndex: 1, width: '100%', padding: '0 clamp(20px, 5vw, 80px)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
            {/* Left - Text */}
            <div>
              <div style={{ marginBottom: '16px' }}>
                {['We craft', 'digital', 'products'].map((line, i) => (
                  <div key={i} style={{ overflow: 'hidden', marginBottom: i === 2 ? '0' : '4px' }}>
                    <motion.h1 initial={{ y: '110%' }} animate={{ y: 0 }}
                      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 + i * 0.08 }}
                      style={{ fontSize: 'clamp(48px, 10vw, 100px)', fontWeight: '700', lineHeight: 0.92, letterSpacing: '-0.04em', fontFamily: 'var(--font-h)' }}>
                      {i === 1 ? <span className="text-gradient">{line}</span> : line}
                      {i === 2 && <span style={{ opacity: 0.15 }}>.</span>}
                    </motion.h1>
                  </div>
                ))}
              </div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '480px', lineHeight: 1.7, marginBottom: '24px' }}>
                Creative studio blending storytelling, art, and cutting-edge technology to deliver award-winning digital experiences.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
                style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
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

              {/* Stats */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {[
                  { n: '150+', l: 'Projects', color: '#22c55e' },
                  { n: '50+', l: 'Clients', color: '#3b82f6' },
                  { n: '12+', l: 'Awards', color: '#a855f7' },
                  { n: '99%', l: 'Satisfaction', color: '#f59e0b' }
                ].map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + i * 0.1 }}
                    className="liquid-glass" style={{ padding: '14px 10px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '22px', fontWeight: '700', fontFamily: 'var(--font-h)', color: s.color }}>
                      <CountUp target={s.n} />
                    </div>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.l}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right - Client Carousel */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
              className="liquid-glass" style={{ padding: '24px', borderRadius: '16px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginBottom: '16px' }}>{'// trusted_by'}</div>
              
              <AnimatePresence mode="wait">
                <motion.div key={clientIndex}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${clients[clientIndex].color}15`, border: `1px solid ${clients[clientIndex].color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                      {clientIndex === 0 ? '🛒' : clientIndex === 1 ? '🏥' : clientIndex === 2 ? '💰' : clientIndex === 3 ? '📊' : '💬'}
                    </div>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: '700', fontFamily: 'var(--font-h)' }}>{clients[clientIndex].name}</div>
                      <div style={{ fontSize: '11px', color: clients[clientIndex].color, fontFamily: "var(--font-code)" }}>{clients[clientIndex].type}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                {clients.map((_, i) => (
                  <div key={i} style={{ width: i === clientIndex ? '20px' : '6px', height: '6px', borderRadius: '3px', background: i === clientIndex ? clients[i].color : 'var(--glass-border)', transition: 'all 0.3s' }} />
                ))}
              </div>

              {/* Tech stack preview */}
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--glass-border)' }}>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginBottom: '10px' }}>{'// tech_stack'}</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {['React', 'Next.js', 'Node.js', 'Flutter', 'AWS', 'TypeScript'].map((tech, i) => (
                    <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 + i * 0.1 }}
                      className="liquid-glass" style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
