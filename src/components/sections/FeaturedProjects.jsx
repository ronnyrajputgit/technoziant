import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import { useApp } from '../../context/AppContext'
import { TextReveal } from '../ui/TextReveal'
import { WaterDropCard } from '../ui/Cards'

export function FeaturedProjects() {
  const ref = useRef(null)
  const { setCursorType } = useApp()
  const [hovered, setHovered] = useState(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  return (
    <section ref={ref} className="section" style={{ overflow: 'hidden' }}>
      <div className="container" style={{ marginBottom: '40px' }}>
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>Selected Work</div></TextReveal>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
          <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(34px, 5vw, 64px)', fontWeight: '700', lineHeight: 1, letterSpacing: '-0.03em' }}>Featured <span className="text-gradient">Projects</span></h2></TextReveal>
          <TextReveal delay={0.2}><Link to="/work" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')} style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '500' }}>View All →</Link></TextReveal>
        </div>
      </div>
      <motion.div style={{ x }}>
        <div style={{ display: 'flex', gap: '16px', padding: '0 clamp(20px, 4vw, 60px)' }}>
          {projects.slice(0, 5).map(p => (
            <WaterDropCard key={p.id} color={p.color} style={{ minWidth: '280px', width: '34vw', padding: 0 }}>
              <Link to="/work" style={{ display: 'block' }}>
                <div onMouseEnter={() => { setHovered(p.id); setCursorType('project') }} onMouseLeave={() => { setHovered(null); setCursorType('default') }}
                  style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', borderRadius: '20px 20px 0 0' }}>
                  <motion.img src={p.image} alt={p.title} animate={{ scale: hovered === p.id ? 1.05 : 1 }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: hovered === p.id ? 1 : 0 }}
                    style={{ position: 'absolute', inset: 0, background: `${p.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="liquid-glass-strong" style={{ padding: '8px 20px', borderRadius: '100px', fontSize: '11px', fontWeight: '600', color: 'var(--text)' }}>View Project</span>
                  </motion.div>
                </div>
                <div style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div><h3 style={{ fontSize: '16px', fontWeight: '600', letterSpacing: '-0.02em', marginBottom: '2px' }}>{p.title}</h3><p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{p.subtitle}</p></div>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{p.year}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {p.tags.slice(0, 3).map(t => <span key={t} className="liquid-glass" style={{ padding: '2px 8px', fontSize: '9px', fontWeight: '500', borderRadius: '100px', color: p.color }}>{t}</span>)}
                  </div>
                </div>
              </Link>
            </WaterDropCard>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
