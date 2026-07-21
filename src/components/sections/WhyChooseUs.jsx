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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {advantages.map((item, i) => {
            const color = colors[i % colors.length]
            const icon = item.description || item.icon || defaultIcons[i % defaultIcons.length]
            const subtitle = item.icon || item.description
            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                whileHover={{ y: -4, boxShadow: `0 12px 40px ${color}20` }}
                className="liquid-glass" style={{ padding: '20px', borderRadius: '12px', borderLeft: `3px solid ${color}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text)' }}>{item.title}</div>
                    <div style={{ fontSize: '11px', color: color, fontFamily: "var(--font-code)", fontWeight: '500' }}>{subtitle}</div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
