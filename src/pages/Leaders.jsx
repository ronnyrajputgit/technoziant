import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { TextReveal } from '../components/ui/TextReveal'
import { useApp } from '../context/AppContext'
import { LeaderModal } from '../components/ui/LeaderModal'
import { Footer } from '../components/layout/Footer'
import sumanImg from '../assets/images/Suman.jpeg'
import sahilImg from '../assets/images/Shahil.jpeg'

// Random border radius generator - professional values
const generateRandomRadius = () => {
  const patterns = [
    () => `${rand(16,28)}px ${rand(4,10)}px ${rand(16,28)}px ${rand(4,10)}px`,
    () => `${rand(20,32)}px ${rand(20,32)}px ${rand(4,8)}px ${rand(4,8)}px`,
    () => `${rand(4,8)}px ${rand(16,28)}px ${rand(4,8)}px ${rand(16,28)}px`,
    () => `${rand(12,24)}px ${rand(20,36)}px ${rand(12,24)}px ${rand(20,36)}px`,
    () => `${rand(18,30)}px ${rand(6,14)}px ${rand(18,30)}px ${rand(6,14)}px`,
    () => `${rand(24,36)}px ${rand(12,20)}px ${rand(24,36)}px ${rand(12,20)}px`,
    () => `${rand(8,16)}px ${rand(24,36)}px ${rand(8,16)}px ${rand(24,36)}px`,
    () => `${rand(14,26)}px ${rand(14,26)}px ${rand(8,16)}px ${rand(8,16)}px`
  ]
  return patterns[Math.floor(Math.random() * patterns.length)]()
}

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const leadership = [
  {
    name: 'Suman',
    role: 'Founder',
    image: sumanImg,
    color: '#4f8eff',
    gradient: 'linear-gradient(135deg, #4f8eff, #06d6a0)',
    bio: 'Visionary founder leading Technoziant with a mission to deliver world-class technology solutions.',
    achievements: ['Visionary Leader', 'Strategic Thinker', 'Innovation Driver']
  },
  {
    name: 'Sahil',
    role: 'Co-founder & CEO',
    image: sahilImg,
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, #a855f7, #f472b6)',
    bio: 'Chief Executive Officer driving the company\'s vision and growth strategy. Expert in business development and scaling digital enterprises.',
    achievements: ['Business Strategist', 'Growth Expert', 'Team Builder']
  },
  {
    name: 'Ronny',
    role: 'CTO',
    image: 'https://ui-avatars.com/api/?name=Ronny&background=06d6a0&color=fff&size=400&bold=true',
    color: '#06d6a0',
    gradient: 'linear-gradient(135deg, #06d6a0, #22d3ee)',
    bio: 'Chief Technology Officer overseeing all technical operations. Expert in system architecture, scalable infrastructure, and cutting-edge technology implementations.',
    achievements: ['Tech Architect', 'System Design', 'Innovation Lead']
  },
  {
    name: 'Avnish',
    role: 'CMO',
    image: 'https://ui-avatars.com/api/?name=Avnish&background=f472b6&color=fff&size=400&bold=true',
    color: '#f472b6',
    gradient: 'linear-gradient(135deg, #f472b6, #a855f7)',
    bio: 'Chief Marketing Officer driving brand strategy and digital marketing initiatives. Expert in growth marketing, brand building, and community development.',
    achievements: ['Brand Builder', 'Growth Hacker', 'Digital Strategist']
  }
]

const brokenGlassStyles = {
  angular: { clipPath: null },
  'rounded-heavy': { clipPath: null },
  'diamond-cut': { clipPath: null },
  pebble: { clipPath: null },
  'sharp-edges': { clipPath: null },
  blob: { clipPath: null },
  wave: { clipPath: null },
  hexagon: { clipPath: null }
}

const styles = ['angular', 'rounded-heavy', 'diamond-cut', 'pebble', 'sharp-edges', 'blob', 'wave', 'hexagon']

const stats = [
  { value: '4', label: 'Leaders', icon: '👥' },
  { value: '20+', label: 'Years Combined', icon: '📅' },
  { value: '100+', label: 'Projects Led', icon: '🚀' },
  { value: '10+', label: 'Awards Won', icon: '🏆' }
]

function LeaderCard({ leader, index, onClick }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })
  const cardStyle = styles[index % styles.length]
  const clipPath = brokenGlassStyles[cardStyle].clipPath
  const randomRadius = useRef(generateRandomRadius()).current

  const zigOffset = index % 2 === 0 ? 0 : 30
  const rotateOffset = index % 2 === 0 ? -1 : 1

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 60 + zigOffset, rotate: rotateOffset * 3, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: zigOffset, rotate: rotateOffset * 0.5, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ marginTop: index % 2 === 1 ? '40px' : '0' }}>
      <div className="liquid-glass texture-noise" onClick={() => onClick(leader)}
        style={{
          borderRadius: randomRadius,
          overflow: 'hidden',
          height: '100%',
          position: 'relative',
          cursor: 'pointer',
          transition: 'transform 0.3s, box-shadow 0.3s'
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; e.currentTarget.style.boxShadow = `0 20px 60px ${leader.color}20` }}
        onMouseLeave={e => { e.currentTarget.style.transform = `translateY(${zigOffset}px) rotate(${rotateOffset * 0.5}deg)`; e.currentTarget.style.boxShadow = 'none' }}>

        {/* Glass effects - subtle */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
          {/* Top shine */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)'
          }} />
          {/* Corner accent */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${leader.color}08, transparent 70%)`
          }} />
        </div>

        {/* Image */}
        <div style={{ position: 'relative', height: '200px', overflow: 'hidden', background: 'rgba(255,255,255,0.03)' }}>
          <img src={leader.image} alt={leader.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top'
            }}
            onError={e => { e.target.style.display = 'none' }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--bg) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)'
          }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: leader.gradient }} />
          {/* Index number */}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            opacity: 0.2,
            fontSize: '36px',
            fontWeight: '900',
            fontFamily: 'var(--font-h)',
            lineHeight: 1,
            color: 'var(--text)'
          }}>
            {String(index + 1).padStart(2, '0')}
          </div>
          {/* View badge */}
          <div className="view-indicator" style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            opacity: 0,
            transition: 'opacity 0.3s'
          }}>
            <span className="liquid-glass-strong" style={{
              padding: '5px 12px',
              borderRadius: '100px',
              fontSize: '9px',
              fontWeight: '600',
              color: 'var(--text)'
            }}>
              View ↗
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '16px', position: 'relative', zIndex: 4 }}>
          {/* Name with role inline */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '8px'
          }}>
            <h3 style={{
              fontSize: '15px',
              fontWeight: '700',
              fontFamily: 'var(--font-h)',
              margin: 0
            }}>
              <span style={{
                background: leader.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {leader.name}
              </span>
            </h3>
            <span style={{
              fontSize: '9px',
              padding: '2px 8px',
              borderRadius: '100px',
              background: `${leader.color}15`,
              color: leader.color,
              fontWeight: '600',
              letterSpacing: '0.02em',
              border: `1px solid ${leader.color}25`,
              whiteSpace: 'nowrap'
            }}>
              {leader.role}
            </span>
          </div>

          {/* Bio */}
          <p style={{
            fontSize: '11px',
            lineHeight: 1.6,
            color: 'var(--text-muted)',
            marginBottom: '10px'
          }}>
            {leader.bio}
          </p>

          {/* Achievements */}
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {leader.achievements.map(a => (
              <span key={a} className="liquid-glass" style={{
                padding: '3px 8px',
                borderRadius: '100px',
                fontSize: '8px',
                color: leader.color,
                fontWeight: '500'
              }}>
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`.view-indicator { opacity: 0 !important; } div:hover > .view-indicator { opacity: 1 !important; }`}</style>
    </motion.div>
  )
}

export function Leaders() {
  const { setCursorType } = useApp()
  const [selectedLeader, setSelectedLeader] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openLeader = (leader) => {
    setSelectedLeader(leader)
    setIsModalOpen(true)
  }

  const closeLeader = () => {
    setIsModalOpen(false)
    setSelectedLeader(null)
  }

  return (
    <main style={{ paddingTop: '110px', minHeight: '100vh' }}>
      <section className="container" style={{ marginBottom: '40px', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, #4f8eff, transparent 70%)', opacity: 0.05, filter: 'blur(80px)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>Leadership</div></TextReveal>
          <TextReveal delay={0.1}>
            <h1 style={{ fontSize: 'clamp(40px, 7vw, 90px)', fontWeight: '700', lineHeight: 0.95, marginBottom: '16px' }}>
              Meet Our <span className="text-gradient">Leaders</span>
            </h1>
          </TextReveal>
          <TextReveal delay={0.2}>
            <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '500px', marginBottom: '32px' }}>
              The visionary minds behind Technoziant. Click any card to learn more.
            </p>
          </TextReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', maxWidth: '450px' }}>
            {stats.map((stat, i) => (
              <TextReveal key={i} delay={0.3 + i * 0.1}>
                <div className="liquid-glass" style={{ padding: '14px', borderRadius: '12px', textAlign: 'center' }}>
                  <span style={{ fontSize: '16px', marginBottom: '4px', display: 'block' }}>{stat.icon}</span>
                  <div style={{ fontSize: '18px', fontWeight: '700', fontFamily: 'var(--font-h)' }}><span className="text-gradient">{stat.value}</span></div>
                  <div style={{ fontSize: '8px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{stat.label}</div>
                </div>
              </TextReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', alignItems: 'start' }}>
            {leadership.map((leader, i) => <LeaderCard key={i} leader={leader} index={i} onClick={openLeader} />)}
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: '700', marginBottom: '12px' }}>
            Want to Join Our <span className="text-gradient">Team</span>?
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '360px', margin: '0 auto 24px' }}>
            We're always looking for talented individuals to join our leadership team.
          </p>
          <Link to="/careers" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
            <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 40px var(--accent)' }} whileTap={{ scale: 0.95 }}
              className="liquid-glass-strong" style={{ padding: '14px 36px', borderRadius: '100px', fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>
              View Open Positions →
            </motion.button>
          </Link>
        </div>
      </section>

      <LeaderModal leader={selectedLeader} isOpen={isModalOpen} onClose={closeLeader} />
      <Footer />
    </main>
  )
}
