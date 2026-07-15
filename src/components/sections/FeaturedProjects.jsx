import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import { useApp } from '../../context/AppContext'
import { TextReveal } from '../ui/TextReveal'
import { WaterDropCard } from '../ui/Cards'
import { ProjectModal } from '../ui/ProjectModal'

const autoScrollStyle = `
  @keyframes autoScroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .auto-scroll-track {
    display: flex;
    gap: 12px;
    animation: autoScroll 30s linear infinite;
    width: max-content;
  }
  .auto-scroll-track:hover {
    animation-play-state: paused;
  }
`

function ProjectCard({ p, hovered, setHovered, setCursorType, openProject }) {
  return (
    <WaterDropCard color={p.color} style={{ minWidth: '280px', maxWidth: '320px', flex: '0 0 auto', padding: 0 }}>
      <div onClick={() => openProject(p)} style={{ display: 'block', cursor: 'pointer' }}>
        <div onMouseEnter={() => { setHovered(p.id); setCursorType('project') }} onMouseLeave={() => { setHovered(null); setCursorType('default') }}
          style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
          <motion.img src={p.image} alt={p.title} animate={{ scale: hovered === p.id ? 1.05 : 1 }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: hovered === p.id ? 1 : 0 }}
            style={{ position: 'absolute', inset: 0, background: `${p.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="liquid-glass-strong" style={{ padding: '6px 16px', borderRadius: '6px', fontSize: '10px', fontWeight: '600', color: 'var(--text)', fontFamily: "var(--font-code)" }}>{'>'} view</span>
          </motion.div>
        </div>
        <div style={{ padding: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <div><h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '1px' }}>{p.title}</h3><p style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{p.subtitle}</p></div>
            <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{p.year}</span>
          </div>
          <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
            {p.tags.slice(0, 3).map(t => <span key={t} className="liquid-glass" style={{ padding: '2px 6px', fontSize: '8px', fontWeight: '500', borderRadius: '3px', color: p.color, fontFamily: "var(--font-code)" }}>{t}</span>)}
          </div>
        </div>
      </div>
    </WaterDropCard>
  )
}

export function FeaturedProjects() {
  const ref = useRef(null)
  const { setCursorType } = useApp()
  const [hovered, setHovered] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openProject = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const featuredProjects = projects.slice(0, 5)

  return (
    <section ref={ref} className="section" style={{ borderTop: '1px solid var(--glass-border)', overflow: 'hidden' }}>
      <style>{autoScrollStyle}</style>
      <div className="container" style={{ marginBottom: '24px' }}>
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>featured work</div></TextReveal>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '8px' }}>
          <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', lineHeight: 1, letterSpacing: '-0.03em' }}>Featured <span className="text-gradient">Projects</span></h2></TextReveal>
          <TextReveal delay={0.2}><Link to="/work" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')} style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: '500', fontFamily: "var(--font-code)" }}>view all →</Link></TextReveal>
        </div>
      </div>
      <div style={{ overflow: 'hidden', paddingBottom: '8px', paddingLeft: 'clamp(20px, 5vw, 80px)', paddingRight: 'clamp(20px, 5vw, 80px)' }}>
        <div className="auto-scroll-track">
          {featuredProjects.map(p => (
            <ProjectCard key={p.id} p={p} hovered={hovered} setHovered={setHovered} setCursorType={setCursorType} openProject={openProject} />
          ))}
          {featuredProjects.map(p => (
            <ProjectCard key={`dup-${p.id}`} p={p} hovered={hovered} setHovered={setHovered} setCursorType={setCursorType} openProject={openProject} />
          ))}
        </div>
      </div>
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedProject(null) }} />
    </section>
  )
}
