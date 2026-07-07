import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { TextReveal } from '../ui/TextReveal'

export function TechStack() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-25%', '0%'])

  const r1 = ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'GraphQL', 'Redis']
  const r2 = ['AWS', 'Docker', 'Kubernetes', 'TensorFlow', 'Three.js', 'Flutter', 'Swift', 'Kotlin', 'Go', 'Rust']
  const e1 = ['⚛️', '▲', '💚', '📘', '🟢', '🐍', '🐘', '🍃', '◆', '🔴']
  const e2 = ['☁️', '🐳', '⚙️', '🧠', '🎮', '💙', '🍎', '🟣', '🔵', '🦀']

  return (
    <section ref={ref} className="section" style={{ overflow: 'hidden' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>Technology</div></TextReveal>
        <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(34px, 5vw, 64px)', fontWeight: '700', lineHeight: 1 }}>Our <span className="text-gradient">Tech Stack</span></h2></TextReveal>
      </div>
      {[{ items: r1, emojis: e1, m: x1 }, { items: r2, emojis: e2, m: x2 }].map((row, ri) => (
        <div key={ri} style={{ marginBottom: '12px' }}>
          <motion.div style={{ x: row.m, display: 'flex', gap: '10px', padding: '0 clamp(20px, 4vw, 60px)' }}>
            {[...row.items, ...row.items].map((t, i) => (
              <div key={`${ri}-${i}`} className="liquid-glass texture-noise" style={{ minWidth: '130px', padding: '14px 18px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <span style={{ fontSize: '15px' }}>{row.emojis[i % row.emojis.length]}</span>
                <span style={{ fontSize: '12px', fontWeight: '500', whiteSpace: 'nowrap' }}>{t}</span>
              </div>
            ))}
          </motion.div>
        </div>
      ))}
    </section>
  )
}
