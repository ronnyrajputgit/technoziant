import { useState } from 'react'
import { motion } from 'framer-motion'
import { TextReveal } from '../components/ui/TextReveal'
import { WaterDropCard } from '../components/ui/Cards'
import { ProjectModal } from '../components/ui/ProjectModal'
import { projects } from '../data/projects'
import { useApp } from '../context/AppContext'
import { Footer } from '../components/layout/Footer'

export function Work() {
  const { setCursorType } = useApp()
  const [h, setH] = useState(null)
  const [f, setF] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const filtered = f === 'all' ? projects : projects.filter(p => p.category === f)

  const openProject = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeProject = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <main style={{ paddingTop: '110px', minHeight: '100vh' }}>
      <section className="container" style={{ marginBottom: '48px' }}>
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>Our Work</div></TextReveal>
        <TextReveal delay={0.1}><h1 style={{ fontSize: 'clamp(44px, 8vw, 100px)', fontWeight: '700', lineHeight: 0.95, marginBottom: '16px' }}>Selected<br /><span className="text-gradient">Projects</span></h1></TextReveal>
        <TextReveal delay={0.2}><p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '420px', marginBottom: '32px' }}>Crafting digital experiences for startups, enterprises, and everything in between.</p></TextReveal>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['all', 'web', 'mobile'].map(fl => (
            <button key={fl} onClick={() => setF(fl)} className={f === fl ? 'liquid-glass-strong' : 'liquid-glass'}
              style={{ padding: '7px 16px', borderRadius: '100px', fontSize: '11px', fontWeight: '500', color: 'var(--text)' }}>
              {fl.charAt(0).toUpperCase() + fl.slice(1)}
            </button>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '12px' }}>
            {filtered.map(p => (
              <WaterDropCard key={p.id} color={p.color} style={{ padding: 0 }}>
                <div onClick={() => openProject(p)}
                  onMouseEnter={() => { setH(p.id); setCursorType('project') }}
                  onMouseLeave={() => { setH(null); setCursorType('default') }}
                  style={{ cursor: 'pointer' }}>
                  <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', borderRadius: '20px 20px 0 0' }}>
                    <motion.img src={p.image} alt={p.title} animate={{ scale: h === p.id ? 1.05 : 1 }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: h === p.id ? 1 : 0 }}
                      style={{ position: 'absolute', inset: 0, background: `${p.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="liquid-glass-strong" style={{ padding: '10px 24px', borderRadius: '100px', fontSize: '12px', fontWeight: '600', color: 'var(--text)' }}>
                        View Project ↗
                      </span>
                    </motion.div>
                  </div>
                  <div style={{ padding: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <div><h3 style={{ fontSize: '16px', fontWeight: '600', letterSpacing: '-0.02em', marginBottom: '2px' }}>{p.title}</h3><p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{p.subtitle}</p></div>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{p.year}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px', lineHeight: 1.5 }}>{p.description}</p>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      {p.tags.slice(0, 3).map(t => <span key={t} className="liquid-glass" style={{ padding: '2px 8px', borderRadius: '100px', fontSize: '9px', fontWeight: '500', color: p.color }}>{t}</span>)}
                    </div>
                  </div>
                </div>
              </WaterDropCard>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeProject} />
      <Footer />
    </main>
  )
}
