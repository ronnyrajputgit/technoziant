import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TextReveal } from '../components/ui/TextReveal'
import { GlowCard } from '../components/ui/Cards'
import { useApp } from '../context/AppContext'
import { Footer } from '../components/layout/Footer'
import { LeaderModal } from '../components/ui/LeaderModal'
import { api } from '../utils/api'

const teamGradients = [
  'linear-gradient(135deg, #4f8eff, #06d6a0)',
  'linear-gradient(135deg, #a855f7, #f472b6)',
  'linear-gradient(135deg, #06d6a0, #22d3ee)',
  'linear-gradient(135deg, #f472b6, #a855f7)',
]

const teamColors = ['#4f8eff', '#a855f7', '#06d6a0', '#f472b6']

export function About() {
  const { setCursorType } = useApp()
  const [selectedLeader, setSelectedLeader] = useState(null)
  const [team, setTeam] = useState([])
  const [stats, setStats] = useState([])
  const [awards, setAwards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.getContent('team_members', { visible: 'true' }).catch(() => []),
      api.getContent('stats', { visible: 'true' }).catch(() => []),
      api.getContent('awards', { visible: 'true' }).catch(() => [])
    ]).then(([teamData, statsData, awardsData]) => {
      setTeam((teamData || []).map((m, i) => ({
        ...m,
        color: teamColors[i % teamColors.length],
        gradient: teamGradients[i % teamGradients.length],
        achievements: Array.isArray(m.achievements) ? m.achievements : [],
        stats: Array.isArray(m.stats) ? m.stats : [],
        social_links: m.social_links || {}
      })))
      setStats(statsData || [])
      setAwards(awardsData || [])
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return <main style={{ paddingTop: '110px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ fontFamily: "var(--font-code)", color: 'var(--text-muted)' }}>Loading...</p></main>

  return (
    <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="section">
        <div className="container">
          <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>about us</div></TextReveal>
          <TextReveal delay={0.1}><h1 style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: '700', lineHeight: 1.1, marginBottom: '16px' }}>We craft <span className="text-gradient">digital experiences</span></h1></TextReveal>
          <TextReveal delay={0.2}><p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '600px' }}>Founded with a vision to deliver world-class technology solutions, Technoziant blends innovation, art & technology as an in-house team of passionate makers.</p></TextReveal>
        </div>
      </section>

      {/* Stats */}
      {stats.length > 0 && (
        <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
              {stats.map((s, i) => (
                <div key={s.id || i} className="liquid-glass" style={{ padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: teamColors[i % teamColors.length], fontFamily: 'var(--font-h)' }}>{s.value}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginTop: '4px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {team.length > 0 && (
        <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
          <div className="container">
            <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>our team</div></TextReveal>
            <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', lineHeight: 1, marginBottom: '32px' }}>Meet the <span className="text-gradient">leaders</span></h2></TextReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
              {team.map((member, i) => (
                <GlowCard key={member.id || i} color={member.color}>
                  <div onClick={() => { setSelectedLeader(member); setCursorType('pointer') }} style={{ cursor: 'pointer', padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${member.color}`, flexShrink: 0 }}>
                        <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '2px' }}>{member.name}</h3>
                        <p style={{ fontSize: '11px', color: member.color, fontFamily: "var(--font-code)" }}>{member.role}</p>
                      </div>
                    </div>
                    <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '12px' }}>{member.bio}</p>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {member.achievements.map((a, j) => (
                        <span key={j} className="liquid-glass" style={{ padding: '3px 8px', borderRadius: '4px', fontSize: '9px', color: member.color, fontFamily: "var(--font-code)" }}>{a}</span>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Awards Section */}
      {awards.length > 0 && (
        <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
          <div className="container">
            <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>awards</div></TextReveal>
            <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', lineHeight: 1, marginBottom: '32px' }}>Our <span className="text-gradient">achievements</span></h2></TextReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
              {awards.map((award, i) => (
                <div key={award.id || i} className="liquid-glass" style={{ padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>{award.icon || '🏆'}</div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{award.title}</h3>
                  {award.year && <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{award.year}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {selectedLeader && <LeaderModal leader={selectedLeader} isOpen={!!selectedLeader} onClose={() => setSelectedLeader(null)} />}
      <Footer />
    </main>
  )
}
