import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TextReveal } from '../ui/TextReveal'
import { useApp } from '../../context/AppContext'
import { api } from '../../utils/api'

export function CTA() {
  const { setCursorType } = useApp()
  const [settings, setSettings] = useState({})

  useEffect(() => {
    api.getSettings().then(data => {
      const map = {}
      data.forEach(s => { map[s.key] = s.value })
      setSettings(map)
    }).catch(() => {})
  }, [])

  const ctaTitle = settings.cta_title || "Let's create amazing"
  const ctaDesc = settings.cta_description || "Let's discuss your project and create something amazing together."
  const label1 = settings.cta_label_1 || 'get in touch'
  const label2 = settings.cta_label_2 || 'view work'

  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(40px, 6vw, 80px) 0' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <TextReveal>
          <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>ready to start</div>
        </TextReveal>
        <div style={{ overflow: 'hidden', marginBottom: '4px' }}>
          <motion.h2 initial={{ y: '110%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            style={{ fontSize: 'clamp(32px, 7vw, 80px)', fontWeight: '700', lineHeight: 1, letterSpacing: '-0.04em', fontFamily: 'var(--font-h)' }}>
            {ctaTitle.split(' ').map((word, i) => {
              const isGradient = word.toLowerCase() === 'amazing'
              return <span key={i}>{i > 0 ? ' ' : ''}{isGradient ? <span className="text-gradient">{word}</span> : word}</span>
            })}
          </motion.h2>
        </div>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', maxWidth: '360px' }}>
          {ctaDesc}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/contact" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            style={{ display: 'inline-block' }}>
            <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--accent)' }} whileTap={{ scale: 0.95 }}
              style={{ padding: '12px 28px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#fff', cursor: 'pointer', textAlign: 'center', fontFamily: "var(--font-code)", background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
              {'>'} {label1}
            </motion.div>
          </Link>
          <Link to="/work" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            style={{ display: 'inline-block' }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="liquid-glass" style={{ padding: '12px 28px', borderRadius: '8px', fontSize: '13px', fontWeight: '500', color: 'var(--text)', cursor: 'pointer', textAlign: 'center', fontFamily: "var(--font-code)" }}>
              {'>'} {label2}
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
