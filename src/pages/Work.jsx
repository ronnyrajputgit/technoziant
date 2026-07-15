import { useState } from 'react'
import { motion } from 'framer-motion'
import { TextReveal } from '../components/ui/TextReveal'
import { WaterDropCard } from '../components/ui/Cards'
import { projects } from '../data/projects'
import { useApp } from '../context/AppContext'
import { Footer } from '../components/layout/Footer'

const projectSnippets = [
  {
    title: 'Bloom E-Commerce',
    client: 'Bloom Corp',
    color: '#22c55e',
    stats: [
      { label: 'Vendors', value: '500+', icon: '🏪' },
      { label: 'Products', value: '100K+', icon: '📦' },
      { label: 'Payments', value: 'Stripe, Razorpay', icon: '💳' },
      { label: 'AI', value: 'Recommendations', icon: '🤖' }
    ],
    result: '3x user engagement',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80'
  },
  {
    title: 'Pulse Healthcare',
    client: 'PulseMed',
    color: '#3b82f6',
    stats: [
      { label: 'Doctors', value: '10K+', icon: '👨‍⚕️' },
      { label: 'Patients', value: 'Unlimited', icon: '👥' },
      { label: 'Video', value: 'WebRTC', icon: '📹' },
      { label: 'Compliance', value: 'HIPAA, GDPR', icon: '🔒' }
    ],
    result: '50K+ consultations',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
  },
  {
    title: 'FinSecure Banking',
    client: 'FinSecure',
    color: '#a855f7',
    stats: [
      { label: 'Auth', value: 'Biometric', icon: '🔐' },
      { label: 'Countries', value: '180+', icon: '🌍' },
      { label: 'Security', value: 'Bank-grade', icon: '🛡️' },
      { label: 'Encryption', value: 'AES-256', icon: '🔑' }
    ],
    result: 'Instant transfers',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&q=80'
  }
]

export function Work() {
  const { setCursorType } = useApp()
  const [h, setH] = useState(null)
  const [f, setF] = useState('all')
  const filtered = f === 'all' ? projects : projects.filter(p => p.category === f)

  const openProject = (_project) => {
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

      {/* Case Studies - Card Stats View */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>case_studies</div></TextReveal>
            <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', lineHeight: 1 }}>How We <span className="text-gradient">Built It</span></h2></TextReveal>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {projectSnippets.map((project, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}>
                <div className="liquid-glass" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                  {/* Image */}
                  <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)' }} />
                    <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                      <span style={{ fontSize: '9px', padding: '3px 8px', borderRadius: '4px', background: `${project.color}20`, color: project.color, fontFamily: "var(--font-code)", fontWeight: '600' }}>{project.client}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>{project.title}</h3>
                    
                    {/* Stats Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                      {project.stats.map((stat, j) => (
                        <motion.div key={j} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + j * 0.05, duration: 0.4 }}
                          className="liquid-glass" style={{ padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                          <div style={{ fontSize: '16px', marginBottom: '4px' }}>{stat.icon}</div>
                          <div style={{ fontSize: '12px', fontWeight: '700', color: project.color, fontFamily: "var(--font-code)" }}>{stat.value}</div>
                          <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Result */}
                    <div className="liquid-glass" style={{ padding: '8px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>Result:</span>
                      <span style={{ fontSize: '11px', fontWeight: '600', color: project.color }}>{project.result}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>how_we_work</div></TextReveal>
            <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', lineHeight: 1 }}>Our <span className="text-gradient">Process</span></h2></TextReveal>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
            {[
              { step: '01', title: 'Discovery', icon: '🔍' },
              { step: '02', title: 'Strategy', icon: '📋' },
              { step: '03', title: 'Design', icon: '🎨' },
              { step: '04', title: 'Develop', icon: '⚡' },
              { step: '05', title: 'Launch', icon: '🚀' },
              { step: '06', title: 'Support', icon: '🛡️' }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="liquid-glass" style={{ padding: '18px', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{item.icon}</div>
                <div style={{ fontSize: '9px', color: '#22c55e', fontFamily: "var(--font-code)", marginBottom: '4px' }}>{item.step}</div>
                <div style={{ fontSize: '13px', fontWeight: '600' }}>{item.title}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
