import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { TextReveal } from '../components/ui/TextReveal'
import { useApp } from '../context/AppContext'
import { LeaderModal } from '../components/ui/LeaderModal'
import { Footer } from '../components/layout/Footer'

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
    name: 'Rahul Sharma',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    color: '#4f8eff',
    gradient: 'linear-gradient(135deg, #4f8eff, #06d6a0)',
    bio: 'Visionary leader with 15+ years building digital products. Previously led engineering at top tech companies. Passionate about blending technology with human experience.',
    achievements: ['Built 200+ products', 'Forbes 30 Under 30', '10+ Patents']
  },
  {
    name: 'Priya Patel',
    role: 'Co-Founder & CTO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, #a855f7, #f472b6)',
    bio: 'Former Google engineer turned entrepreneur. Architected systems serving billions. Expert in scalable infrastructure and AI/ML implementations.',
    achievements: ['Ex-Google Staff Engineer', '100+ OSS Projects', 'AI Pioneer']
  },
  {
    name: 'Arjun Mehta',
    role: 'Chief Product Officer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    color: '#06d6a0',
    gradient: 'linear-gradient(135deg, #06d6a0, #22d3ee)',
    bio: 'Product visionary who has launched 50+ successful products. Deep expertise in user research, product strategy, and growth hacking.',
    achievements: ['50+ Product Launches', 'Y Combinator Mentor', 'Product Hunt #1']
  },
  {
    name: 'Sneha Reddy',
    role: 'Chief Design Officer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80',
    color: '#f472b6',
    gradient: 'linear-gradient(135deg, #f472b6, #a855f7)',
    bio: 'Award-winning designer previously at Apple and Airbnb. Creates beautiful functional experiences that delight users worldwide.',
    achievements: ['Red Dot Design Winner', 'D&AD Pencil', 'Ex-Apple Design']
  },
  {
    name: 'Vikram Singh',
    role: 'VP of Engineering',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
    color: '#fbbf24',
    gradient: 'linear-gradient(135deg, #fbbf24, #f472b6)',
    bio: 'Engineering leader who built teams of 100+ developers. Expert in agile methodologies, system architecture, and developer experience.',
    achievements: ['Led 100+ Engineers', 'Ex-Microsoft', 'Agile Certified']
  },
  {
    name: 'Ananya Krishnan',
    role: 'Head of AI/ML',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80',
    color: '#22d3ee',
    gradient: 'linear-gradient(135deg, #22d3ee, #4f8eff)',
    bio: 'PhD Stanford in Computer Science. Leading AI research and implementation. Published 20+ papers in top conferences.',
    achievements: ['PhD Stanford', '20+ Publications', 'AI Research Lead']
  },
  {
    name: 'Rohan Gupta',
    role: 'Chief Marketing Officer',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444, #fbbf24)',
    bio: 'Marketing strategist who scaled brands from zero to millions. Expert in growth marketing, brand building, and community development.',
    achievements: ['Scaled 10+ Brands', 'Ex-HubSpot', 'Growth Expert']
  },
  {
    name: 'Kavya Nair',
    role: 'Chief Operations Officer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #06d6a0)',
    bio: 'Operations expert ensuring seamless delivery across all projects. Built efficient processes that reduced delivery time by 40%.',
    achievements: ['40% Faster Delivery', 'Ex-Amazon', 'Six Sigma Black Belt']
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
  { value: '8', label: 'Leaders', icon: '👥' },
  { value: '80+', label: 'Years Combined', icon: '📅' },
  { value: '500+', label: 'Projects Led', icon: '🚀' },
  { value: '50+', label: 'Awards Won', icon: '🏆' }
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
              The visionary minds behind MIMO/STUDIO. Click any card to learn more.
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', alignItems: 'start' }}>
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
