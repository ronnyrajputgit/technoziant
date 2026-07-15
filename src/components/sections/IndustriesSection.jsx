import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TextReveal } from '../ui/TextReveal'

const industries = [
  { name: 'Startups', icon: '🚀', flow: ['ideate', 'build', 'launch', 'scale'], img: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=80' },
  { name: 'E-Commerce', icon: '🛒', flow: ['catalog', 'cart', 'checkout', 'revenue'], img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80' },
  { name: 'Healthcare', icon: '🏥', flow: ['patient', 'diagnose', 'treat', 'follow-up'], img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80' },
  { name: 'Finance', icon: '💰', flow: ['auth', 'transact', 'verify', 'settle'], img: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=400&q=80' },
  { name: 'Education', icon: '📚', flow: ['enroll', 'learn', 'practice', 'certify'], img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&q=80' },
  { name: 'Logistics', icon: '🚚', flow: ['track', 'route', 'deliver', 'confirm'], img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80' }
]

export function IndustriesSection() {
  const [active, setActive] = useState(null)

  return (
    <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>industries</div></TextReveal>
          <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', lineHeight: 1 }}>Industries We <span className="text-gradient">Serve</span></h2></TextReveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
          {industries.map((ind, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="liquid-glass" style={{ padding: '16px', borderRadius: '10px', cursor: 'pointer' }}
              onClick={() => setActive(active === i ? null : i)}>
              <div style={{ fontSize: '28px', marginBottom: '6px' }}>{ind.icon}</div>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>{ind.name}</div>

              <AnimatePresence>
                {active === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                    <img src={ind.img} alt={ind.name} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px', marginBottom: '8px' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                      {ind.flow.map((step, j) => (
                        <motion.div key={j} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: j * 0.1 }}
                          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '8px', padding: '3px 6px', borderRadius: '4px', background: 'rgba(34,197,94,0.1)', color: '#22c55e', fontFamily: "var(--font-code)" }}>{step}</span>
                          {j < ind.flow.length - 1 && <span style={{ fontSize: '7px', color: 'var(--text-muted)' }}>→</span>}
                        </motion.div>
                      ))}
                    </div>
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
