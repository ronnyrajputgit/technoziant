import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { NetworkAnimation } from '../ui/NetworkAnimation'
import { api } from '../../utils/api'

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
  const [stats, setStats] = useState([])
  const [settings, setSettings] = useState({})
  const [techItems, setTechItems] = useState([])

  useEffect(() => {
    api.getContent('stats', { visible: 'true' }).then(setStats).catch(() => {})
    api.getContent('tech_stack', { visible: 'true' }).then(setTechItems).catch(() => {})
    api.getSettings().then(data => {
      const map = {}
      data.forEach(s => { map[s.key] = s.value })
      setSettings(map)
    }).catch(() => {})
  }, [])

  const clients = []
  for (let i = 1; i <= 5; i++) {
    const name = settings[`hero_client_${i}_name`]
    if (name) {
      clients.push({
        name,
        type: settings[`hero_client_${i}_type`] || '',
        icon: settings[`hero_client_${i}_icon`] || '🏢',
      })
    }
  }
  const defaultClientsFallback = [
    { name: 'Bloom Corp', type: 'E-Commerce', icon: '🛒' },
    { name: 'PulseMed', type: 'Healthcare', icon: '🏥' },
    { name: 'FinSecure', type: 'Fintech', icon: '💰' },
    { name: 'DataCorp', type: 'Analytics', icon: '📊' },
    { name: 'Echo Inc', type: 'Social', icon: '💬' }
  ]
  const activeClients = clients.length > 0 ? clients : defaultClientsFallback

  useEffect(() => {
    const timer = setInterval(() => {
      setClientIndex(prev => (prev + 1) % activeClients.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [activeClients.length])

  const heroTitle = settings.hero_title?.split('\n') || ['We craft', 'digital', 'products']
  const heroDesc = settings.hero_description || 'Creative studio blending storytelling, art, and cutting-edge technology to deliver award-winning digital experiences.'

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
                {heroTitle.map((line, i) => (
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
                {heroDesc}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
                style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
                <Link to="/work" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                  style={{ display: 'inline-block' }}>
                  <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--accent)' }} whileTap={{ scale: 0.95 }}
                    className="liquid-glass-strong" style={{ padding: '14px 32px', color: 'var(--text)', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', textAlign: 'center', fontFamily: "var(--font-code)" }}>
                    {'>'} view work
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
                style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {stats.slice(0, 3).map((s, i) => {
                  const colors = ['#22c55e', '#3b82f6', '#a855f7']
                  return (
                    <motion.div key={s.id || i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + i * 0.1 }}
                      className="liquid-glass" style={{ padding: '14px 10px', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '22px', fontWeight: '700', fontFamily: 'var(--font-h)', color: colors[i] }}>
                        <CountUp target={s.value || '0'} />
                      </div>
                      <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>

            {/* Right - Client Carousel */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
              className="liquid-glass" style={{ padding: '24px', borderRadius: '16px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginBottom: '16px' }}>{'// trusted by'}</div>
              
              <AnimatePresence mode="wait">
                <motion.div key={clientIndex}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${['#22c55e','#3b82f6','#a855f7','#f59e0b','#06d6a0'][clientIndex % 5]}15`, border: `1px solid ${['#22c55e','#3b82f6','#a855f7','#f59e0b','#06d6a0'][clientIndex % 5]}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                      {activeClients[clientIndex]?.icon || '🏢'}
                    </div>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: '700', fontFamily: 'var(--font-h)' }}>{activeClients[clientIndex]?.name}</div>
                      <div style={{ fontSize: '11px', color: ['#22c55e','#3b82f6','#a855f7','#f59e0b','#06d6a0'][clientIndex % 5], fontFamily: "var(--font-code)" }}>{activeClients[clientIndex]?.type}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                {activeClients.map((_, i) => (
                  <div key={i} style={{ width: i === clientIndex ? '20px' : '6px', height: '6px', borderRadius: '3px', background: i === clientIndex ? ['#22c55e','#3b82f6','#a855f7','#f59e0b','#06d6a0'][i % 5] : 'var(--glass-border)', transition: 'all 0.3s' }} />
                ))}
              </div>

              {/* Tech stack preview */}
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--glass-border)' }}>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginBottom: '10px' }}>{'// tech stack'}</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {techItems.slice(0, 6).map((tech, i) => (
                    <motion.span key={tech.id || i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 + i * 0.1 }}
                      className="liquid-glass" style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>
                      {tech.name}
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
