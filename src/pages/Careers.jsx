import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TextReveal } from '../components/ui/TextReveal'
import { WaterDropCard } from '../components/ui/Cards'
import { useApp } from '../context/AppContext'
import { Footer } from '../components/layout/Footer'

const jobs = [
  { id: 1, title: 'Senior React Developer', type: 'Full-time', location: 'Remote / SF', team: 'Engineering', color: '#4f8eff' },
  { id: 2, title: 'UI/UX Designer', type: 'Full-time', location: 'SF / NYC', team: 'Design', color: '#a855f7' },
  { id: 3, title: 'Mobile Developer (Flutter)', type: 'Full-time', location: 'Remote', team: 'Engineering', color: '#06d6a0' },
  { id: 4, title: 'DevOps Engineer', type: 'Full-time', location: 'Remote', team: 'Infrastructure', color: '#22d3ee' },
  { id: 5, title: 'Project Manager', type: 'Full-time', location: 'SF', team: 'Operations', color: '#fbbf24' },
  { id: 6, title: 'Content Strategist', type: 'Contract', location: 'Remote', team: 'Marketing', color: '#f472b6' },
]

export function Careers() {
  const { setCursorType } = useApp()
  return (
    <main style={{ paddingTop: '110px', minHeight: '100vh' }}>
      <section className="container" style={{ marginBottom: '48px' }}>
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>Careers</div></TextReveal>
        <TextReveal delay={0.1}><h1 style={{ fontSize: 'clamp(44px, 8vw, 100px)', fontWeight: '700', lineHeight: 0.95, marginBottom: '16px' }}>Join our <span className="text-gradient">team</span></h1></TextReveal>
        <TextReveal delay={0.2}><p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '460px', marginBottom: '32px' }}>We're always looking for talented individuals who are passionate about creating exceptional digital experiences.</p></TextReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
          {[{ l: 'Remote First', v: 'Work from anywhere' }, { l: 'Flexible Hours', v: 'Work-life balance' }, { l: 'Health Benefits', v: 'Full coverage' }, { l: 'Learning Budget', v: 'Annual allowance' }, { l: 'Equity Options', v: 'For all employees' }].map((b, i) => (
            <WaterDropCard key={i} color="var(--accent)" style={{ padding: '18px' }}>
              <div style={{ fontSize: '9px', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px', fontWeight: '600' }}>{b.l}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{b.v}</div>
            </WaterDropCard>
          ))}
        </div>
      </section>
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {jobs.map(job => (
              <WaterDropCard key={job.id} color={job.color} style={{ padding: 0 }}>
                <div onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                  style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '20px', padding: '18px 22px', alignItems: 'center' }}>
                  <div><h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '1px' }}>{job.title}</h3><p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{job.team}</p></div>
                  <span className="liquid-glass" style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '10px', color: 'var(--text-muted)' }}>{job.type}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{job.location}</span>
                  <Link to="/contact"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="liquid-glass" style={{ padding: '7px 18px', borderRadius: '100px', fontSize: '11px', color: job.color, fontWeight: '500' }}>Apply →</motion.button></Link>
                </div>
              </WaterDropCard>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
