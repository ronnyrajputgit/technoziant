import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TextReveal } from '../ui/TextReveal'
import { api } from '../../utils/api'

const defaultIcons = ['🚀', '🛒', '🏥', '💰', '📚', '🚚', '⚡', '🏗️', '🎮', '📡']

export function IndustriesSection() {
  const [active, setActive] = useState(null)
  const [industries, setIndustries] = useState([])

  useEffect(() => {
    api.getContent('industries', { visible: 'true' }).then(setIndustries).catch(() => {})
  }, [])

  if (!industries.length) return null

  return (
    <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>industries</div></TextReveal>
          <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', lineHeight: 1 }}>Industries We <span className="text-gradient">Serve</span></h2></TextReveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
          {industries.map((ind, i) => (
            <motion.div key={ind.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="liquid-glass" style={{ padding: '16px', borderRadius: '10px', cursor: 'pointer' }}
              onClick={() => setActive(active === ind.id ? null : ind.id)}>
              <div style={{ fontSize: '28px', marginBottom: '6px' }}>{ind.icon || defaultIcons[i % defaultIcons.length]}</div>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>{ind.title}</div>

              <AnimatePresence>
                {active === ind.id && ind.description && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{ind.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
