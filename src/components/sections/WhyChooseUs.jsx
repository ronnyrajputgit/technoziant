import { motion } from 'framer-motion'
import { TextReveal } from '../ui/TextReveal'

const advantages = [
  { icon: '⚡', title: 'Fast Delivery', desc: '99% on-time delivery rate', color: '#22c55e' },
  { icon: '🔧', title: 'Modern Stack', desc: 'React, Next.js, Node.js, Cloud', color: '#3b82f6' },
  { icon: '🛡️', title: '24/7 Support', desc: 'Round the clock maintenance', color: '#a855f7' },
  { icon: '📈', title: 'Scalable', desc: 'Built for growth', color: '#f59e0b' },
  { icon: '🏆', title: 'Award Winning', desc: '12+ design awards', color: '#ef4444' },
  { icon: '🤝', title: 'Trusted', desc: '50+ global clients', color: '#06b6d4' }
]

export function WhyChooseUs() {
  return (
    <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>why_us</div></TextReveal>
          <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', lineHeight: 1 }}>Why Choose <span className="text-gradient">Technoziant</span></h2></TextReveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
          {advantages.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -3, boxShadow: `0 8px 30px ${item.color}15` }}
              className="liquid-glass" style={{ padding: '18px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.icon}</div>
              <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '4px', color: item.color }}>{item.title}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
