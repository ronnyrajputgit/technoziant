import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { api } from '../../utils/api'
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

const projectColors = ['#4f8eff', '#a855f7', '#06d6a0', '#f472b6', '#fbbf24', '#ef4444', '#22d3ee', '#10b981']

function ProjectCard({ p, hovered, setHovered, setCursorType, openProject }) {
  const color = p.color || projectColors[(p.id || 0) % projectColors.length]
  return (
    <WaterDropCard color={color} style={{ minWidth: '280px', maxWidth: '320px', flex: '0 0 auto', padding: 0 }}>
      <div onClick={() => openProject(p)} style={{ display: 'block', cursor: 'pointer' }}>
        <div onMouseEnter={() => { setHovered(p.id); setCursorType('project') }} onMouseLeave={() => { setHovered(null); setCursorType('default') }}
          style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
          <motion.img src={p.image} alt={p.title} animate={{ scale: hovered === p.id ? 1.05 : 1 }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {p.logo && (
            <div style={{ position: 'absolute', top: '10px', left: '10px', width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img src={p.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          )}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: hovered === p.id ? 1 : 0 }}
            style={{ position: 'absolute', inset: 0, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="liquid-glass-strong" style={{ padding: '6px 16px', borderRadius: '6px', fontSize: '10px', fontWeight: '600', color: 'var(--text)', fontFamily: "var(--font-code)" }}>{'>'} view</span>
          </motion.div>
        </div>
        <div style={{ padding: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <div><h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '1px' }}>{p.title}</h3><p style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{p.subtitle || p.description?.substring(0, 40)}</p></div>
            <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{p.year || ''}</span>
          </div>
          <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
            {(p.tech || p.tags || []).slice(0, 3).map((t, i) => <span key={i} className="liquid-glass" style={{ padding: '2px 6px', fontSize: '8px', fontWeight: '500', borderRadius: '3px', color, fontFamily: "var(--font-code)" }}>{t}</span>)}
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
  const [isModalOpen, setIsModalOpen] = useState(null)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.getContent('featured_projects', { visible: 'true' }).then(data => {
      const seen = new Set()
      const formatted = (data || []).reduce((acc, p) => {
        const key = p.title?.toLowerCase().trim()
        if (seen.has(key)) return acc
        seen.add(key)
        acc.push({
          id: p.id,
          title: p.title,
          subtitle: p.subtitle || p.description?.substring(0, 40),
          description: p.description,
          year: p.year || '',
          color: projectColors[(p.id || 0) % projectColors.length],
          image: p.image,
          images: Array.isArray(p.images) ? p.images : [],
          tags: p.tech || [],
          category: p.category,
          client: p.client || '',
          duration: p.duration || '',
          team: p.team || '',
          result: p.result || '',
          logo: p.logo || '',
        })
        return acc
      }, [])
      setProjects(formatted)
    }).catch(() => {})
  }, [])

  const openProject = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const displayProjects = projects.length > 0 ? projects : []

  if (displayProjects.length === 0) return null

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
          {displayProjects.map(p => (
            <ProjectCard key={p.id} p={p} hovered={hovered} setHovered={setHovered} setCursorType={setCursorType} openProject={openProject} />
          ))}
          {displayProjects.map(p => (
            <ProjectCard key={`dup-${p.id}`} p={p} hovered={hovered} setHovered={setHovered} setCursorType={setCursorType} openProject={openProject} />
          ))}
        </div>
      </div>
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedProject(null) }} />
    </section>
  )
}
