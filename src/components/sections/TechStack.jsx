import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { TextReveal } from '../ui/TextReveal'
import { api } from '../../utils/api'

const defaultEmojis = ['⚛️', '▲', '💚', '📘', '🟢', '🐍', '🐘', '🍃', '◆', '🔴', '☁️', '🐳', '⚙️', '🧠', '🎮', '💙', '🍎', '🟣', '🔵', '🦀']

export function TechStack() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-20%', '0%'])
  const [items, setItems] = useState([])

  useEffect(() => {
    api.getContent('tech_stack', { visible: 'true' }).then(setItems).catch(() => {})
  }, [])

  if (!items.length) return null

  const half = Math.ceil(items.length / 2)
  const row1 = items.slice(0, half)
  const row2 = items.slice(half)

  return (
    <section ref={ref} className="section" style={{ borderTop: '1px solid var(--glass-border)', overflow: 'hidden' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '24px' }}>
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>tech stack</div></TextReveal>
        <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', lineHeight: 1 }}>Our <span className="text-gradient">Tech Stack</span></h2></TextReveal>
      </div>
      {[{ items: row1, m: x1 }, { items: row2, m: x2 }].map((row, ri) => (
        <div key={ri} style={{ marginBottom: '8px' }}>
          <motion.div style={{ x: row.m, display: 'flex', gap: '8px', padding: '0 clamp(16px, 4vw, 40px)' }}>
            {[...row.items, ...row.items].map((t, i) => (
              <div key={`${ri}-${i}`} className="liquid-glass texture-noise" style={{ minWidth: '110px', padding: '10px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                <span style={{ fontSize: '14px' }}>{t.icon || defaultEmojis[i % defaultEmojis.length]}</span>
                <span style={{ fontSize: '11px', fontWeight: '500', whiteSpace: 'nowrap' }}>{t.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      ))}
    </section>
  )
}
