import { useState } from 'react'
import { motion } from 'framer-motion'
import { TextReveal } from '../components/ui/TextReveal'
import { WaterDropCard } from '../components/ui/Cards'
import { ProjectModal } from '../components/ui/ProjectModal'
import { projects } from '../data/projects'
import { useApp } from '../context/AppContext'
import { Footer } from '../components/layout/Footer'

const projectSnippets = [
  {
    title: 'E-Commerce Platform',
    client: 'Bloom Corp',
    code: `const store = new BloomStore({
  vendors: 500+,
  products: '100K+',
  payments: ['stripe', 'razorpay'],
  ai: { recommendations: true }
});

await store.launch({ scale: 'auto' });`,
    color: '#22c55e'
  },
  {
    title: 'Healthcare Portal',
    client: 'PulseMed',
    code: `const telemedicine = new Telehealth({
  hipaa: true,
  video: 'webrtc',
  doctors: '10K+',
  patients: 'unlimited',
  compliance: ['hipaa', 'gdpr']
});

await telemedicine.deploy();`,
    color: '#3b82f6'
  },
  {
    title: 'Fintech App',
    client: 'FinSecure',
    code: `const banking = new FinSecure({
  auth: 'biometric',
  transfers: 'instant',
  countries: 180+,
  security: 'bank-grade',
  encryption: 'AES-256'
});

await banking.goLive();`,
    color: '#a855f7'
  }
]

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

      {/* Project Cards */}
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

      {/* Code Snippets Section */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>case_studies</div></TextReveal>
            <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', lineHeight: 1 }}>How We <span className="text-gradient">Built It</span></h2></TextReveal>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {projectSnippets.map((snippet, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="liquid-glass" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                {/* Title bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', borderBottom: '1px solid var(--glass-border)', background: 'var(--surface)' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ff5f57' }} />
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#febc2e' }} />
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#28c840' }} />
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{snippet.title.toLowerCase().replace(/\s+/g, '-')}.ts</span>
                  <span style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '3px', background: `${snippet.color}15`, color: snippet.color, fontFamily: "var(--font-code)" }}>{snippet.client}</span>
                </div>
                {/* Code content */}
                <div style={{ padding: '16px', fontFamily: "var(--font-code)", fontSize: '12px', lineHeight: '22px', background: 'var(--code-bg)' }}>
                  {snippet.code.split('\n').map((line, j) => (
                    <motion.div key={j} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + j * 0.03, duration: 0.4 }}
                      style={{ display: 'flex' }}>
                      <span style={{ color: 'var(--text-muted)', opacity: 0.3, marginRight: '14px', minWidth: '14px', textAlign: 'right', fontSize: '10px' }}>{j + 1}</span>
                      <span style={{ color: 'var(--code-text)' }}>
                        {line.includes('const') ? <><span style={{ color: 'var(--code-keyword)' }}>const</span> {line.replace('const ', '')}</> :
                         line.includes('await') ? <><span style={{ color: 'var(--code-keyword)' }}>await</span> {line.replace('await ', '')}</> :
                         line.includes('//') ? <span style={{ color: 'var(--code-comment)' }}>{line}</span> :
                         line}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
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

          {/* Process as code */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="liquid-glass" style={{ borderRadius: '10px', overflow: 'hidden', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 14px', borderBottom: '1px solid var(--glass-border)', background: 'var(--surface)' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#28c840' }} />
              <span style={{ marginLeft: '8px', fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>process.ts</span>
            </div>
            <div style={{ padding: '20px', fontFamily: "var(--font-code)", fontSize: '12px', lineHeight: '24px' }}>
              <div><span style={{ color: 'var(--code-comment)' }}>{'// The Technoziant development pipeline'}</span></div>
              <div><span style={{ color: 'var(--code-keyword)' }}>export const</span> <span style={{ color: 'var(--code-property)' }}>process</span> = {'['}</div>
              {[
                { step: 'Discovery', desc: 'Understanding your vision', icon: '🔍' },
                { step: 'Strategy', desc: 'Planning architecture', icon: '📋' },
                { step: 'Design', desc: 'Creating interfaces', icon: '🎨' },
                { step: 'Development', desc: 'Building with code', icon: '⚡' },
                { step: 'Launch', desc: 'Deploying live', icon: '🚀' },
                { step: 'Support', desc: 'Ongoing maintenance', icon: '🛡️' }
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  style={{ paddingLeft: '16px' }}>
                  <span style={{ color: 'var(--code-text)' }}>{'  { '}</span>
                  <span style={{ color: 'var(--code-property)' }}>step</span>: <span style={{ color: 'var(--code-string)' }}>'{item.step}'</span>,
                  <span style={{ color: 'var(--code-property)' }}> desc</span>: <span style={{ color: 'var(--code-string)' }}>'{item.desc}'</span>,
                  <span style={{ color: 'var(--code-property)' }}> icon</span>: <span style={{ color: 'var(--code-string)' }}>'{item.icon}'</span>
                  <span style={{ color: 'var(--code-text)' }}>{' }'}</span>{i < 5 && ','}
                </motion.div>
              ))}
              <div>{']'}</div>
            </div>
          </motion.div>
        </div>
      </section>

      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeProject} />
      <Footer />
    </main>
  )
}
