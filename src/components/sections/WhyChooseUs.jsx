import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TextReveal } from '../ui/TextReveal'
import { api } from '../../utils/api'

const colors = ['#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ef4444', '#06b6d4']
const defaultIcons = ['⚡', '🔧', '🛡️', '📈', '🏆', '🤝']

export function WhyChooseUs() {
  const [advantages, setAdvantages] = useState([])

  useEffect(() => {
    api.getContent('why_choose', { visible: 'true' }).then(setAdvantages).catch(() => {})
  }, [])

  if (!advantages.length) return null

  return (
    <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>why us</div></TextReveal>
          <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', lineHeight: 1 }}>Why Choose <span className="text-gradient">Technoziant</span></h2></TextReveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
          {advantages.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -3, boxShadow: `0 8px 30px ${colors[i % colors.length]}15` }}
              className="liquid-glass" style={{ padding: '18px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.description || item.icon || defaultIcons[i % defaultIcons.length]}</div>
              <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '4px', color: colors[i % colors.length] }}>{item.title}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.icon || item.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
