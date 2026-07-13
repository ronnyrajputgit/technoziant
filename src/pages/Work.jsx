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
    <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section className="container" style={{ marginBottom: '32px' }}>
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>our_work</div></TextReveal>
        <TextReveal delay={0.1}><h1 style={{ fontSize: 'clamp(40px, 8vw, 90px)', fontWeight: '700', lineHeight: 0.95, marginBottom: '12px' }}>Selected<br /><span className="text-gradient">Projects</span></h1></TextReveal>
        <TextReveal delay={0.2}><p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '420px', marginBottom: '24px' }}>Crafting digital experiences for startups, enterprises, and everything in between.</p></TextReveal>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['all', 'web', 'mobile'].map(fl => (
            <button key={fl} onClick={() => setF(fl)} className={f === fl ? 'liquid-glass-strong' : 'liquid-glass'}
              style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '11px', fontWeight: '500', color: 'var(--text)', fontFamily: "var(--font-code)" }}>
              {fl === 'all' ? '* all' : fl}
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
                  <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
                    <motion.img src={p.image} alt={p.title} animate={{ scale: h === p.id ? 1.05 : 1 }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: h === p.id ? 1 : 0 }}
                      style={{ position: 'absolute', inset: 0, background: `${p.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="liquid-glass-strong" style={{ padding: '8px 20px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', color: 'var(--text)', fontFamily: "var(--font-code)" }}>
                        {'>'} view_project
                      </span>
                    </motion.div>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <div>
                        <h3 style={{ fontSize: '15px', fontWeight: '600', letterSpacing: '-0.02em', marginBottom: '2px' }}>{p.title}</h3>
                        <p style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{p.subtitle}</p>
                      </div>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{p.year}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px', lineHeight: 1.5 }}>{p.description}</p>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {p.tags.map(t => <span key={t} className="liquid-glass" style={{ padding: '2px 7px', borderRadius: '4px', fontSize: '9px', fontWeight: '500', color: p.color, fontFamily: "var(--font-code)" }}>{t}</span>)}
                    </div>
                  </div>
                </div>
              </WaterDropCard>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>how_we_work</div></TextReveal>
            <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', lineHeight: 1 }}>Our <span className="text-gradient">Process</span></h2></TextReveal>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your vision and goals', icon: '🔍' },
              { step: '02', title: 'Strategy', desc: 'Planning the technical architecture', icon: '📋' },
              { step: '03', title: 'Design', desc: 'Creating intuitive interfaces', icon: '🎨' },
              { step: '04', title: 'Develop', desc: 'Building with clean code', icon: '⚡' },
              { step: '05', title: 'Launch', desc: 'Deploying with confidence', icon: '🚀' },
              { step: '06', title: 'Support', desc: 'Ongoing maintenance', icon: '🛡️' }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="liquid-glass" style={{ padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ fontSize: '9px', color: '#22c55e', fontFamily: "var(--font-code)", marginBottom: '4px' }}>{item.step}</div>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{item.title}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeProject} />
      <Footer />
    </main>
  )
}
