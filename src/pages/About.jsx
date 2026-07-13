import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { TextReveal } from '../components/ui/TextReveal'
import { GlowCard } from '../components/ui/Cards'
import { awards } from '../data/projects'
import { useApp } from '../context/AppContext'
import { Footer } from '../components/layout/Footer'
import { LeaderModal } from '../components/ui/LeaderModal'
import sumanImg from '../assets/images/Suman.jpeg'
import sahilImg from '../assets/images/Shahil.jpeg'

const team = [
  {
    name: 'Suman Kumar Sah',
    role: 'Founder',
    image: sumanImg,
    color: '#4f8eff',
    gradient: 'linear-gradient(135deg, #4f8eff, #06d6a0)',
    bio: 'Visionary founder leading Technoziant with a mission to deliver world-class technology solutions.',
    achievements: ['Visionary Leader', 'Strategic Thinker', 'Innovation Driver']
  },
  {
    name: 'Shahil Kumar Sharma',
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

const stats = [
  { value: '4', label: 'Team Members', icon: '👥' },
  { value: '20+', label: 'Years Combined', icon: '📅' },
  { value: '100+', label: 'Projects Led', icon: '🚀' },
  { value: '10+', label: 'Awards Won', icon: '🏆' }
]

function TeamCard({ member, index, onClick }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })
  const { setCursorType } = useApp()

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}>
      <GlowCard glowColor={member.color} style={{ padding: 0, overflow: 'hidden', height: '100%', cursor: 'pointer' }}
        onClick={() => onClick(member)}
        onMouseEnter={() => setCursorType('hover')}
        onMouseLeave={() => setCursorType('default')}>

        {/* Image */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: 'rgba(255,255,255,0.03)' }}>
          <img src={member.image} alt={member.name}
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center top'
            }}
            onError={e => { e.target.style.display = 'none' }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, var(--bg) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)'
          }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: member.gradient }} />
          <div style={{
            position: 'absolute', top: '12px', left: '12px', opacity: 0.2,
            fontSize: '36px', fontWeight: '900', fontFamily: 'var(--font-h)',
            lineHeight: 1, color: 'var(--text)'
          }}>
            {String(index + 1).padStart(2, '0')}
          </div>
          {/* View badge */}
          <div className="view-indicator" style={{
            position: 'absolute', bottom: '10px', right: '10px', opacity: 0, transition: 'opacity 0.3s'
          }}>
            <span className="liquid-glass-strong" style={{
              padding: '5px 12px', borderRadius: '100px',
              fontSize: '9px', fontWeight: '600', color: 'var(--text)'
            }}>
              View ↗
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'var(--font-h)', margin: 0 }}>
              <span style={{
                background: member.gradient,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {member.name}
              </span>
            </h3>
            <span style={{
              fontSize: '10px', padding: '3px 10px', borderRadius: '100px',
              background: `${member.color}15`, color: member.color,
              fontWeight: '600', letterSpacing: '0.02em',
              border: `1px solid ${member.color}25`
            }}>
              {member.role}
            </span>
          </div>

          <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '12px' }}>
            {member.bio}
          </p>

          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {member.achievements.map(a => (
              <span key={a} className="liquid-glass" style={{
                padding: '3px 8px', borderRadius: '100px',
                fontSize: '9px', color: member.color, fontWeight: '500'
              }}>
                {a}
              </span>
            ))}
          </div>
        </div>
      </GlowCard>
    </motion.div>
  )
}

export function About() {
  const { setCursorType } = useApp()
  const [selectedMember, setSelectedMember] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openMember = (member) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const closeMember = () => {
    setIsModalOpen(false)
    setSelectedMember(null)
  }

  return (
    <main style={{ paddingTop: '110px', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="container">
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>About Us</div></TextReveal>
        <TextReveal delay={0.1}><h1 style={{ fontSize: 'clamp(44px, 8vw, 100px)', fontWeight: '700', lineHeight: 0.95, marginBottom: '16px' }}>We are a team<br />of <span className="text-gradient">passionate</span><br />makers</h1></TextReveal>
        <TextReveal delay={0.2}><p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '520px', marginBottom: '50px' }}>Founded with a vision to deliver world-class technology solutions, Technoziant blends innovation, art & technology as an in-house team of passionate makers. Our industry-leading approach consistently delivers award-winning work through quality & performance.</p></TextReveal>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '80px' }}>
          {stats.map((s, i) => (
            <TextReveal key={i} delay={0.3 + i * 0.1}>
              <div className="liquid-glass" style={{ padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
                <span style={{ fontSize: '20px', marginBottom: '6px', display: 'block' }}>{s.icon}</span>
                <div style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'var(--font-h)' }}><span className="text-gradient">{s.value}</span></div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            </TextReveal>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
            <div>
              <TextReveal><h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '700', marginBottom: '16px' }}>Our <span className="text-gradient">Mission</span></h2></TextReveal>
              <TextReveal delay={0.1}><p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--text-muted)' }}>
                To empower businesses with cutting-edge technology solutions that drive growth, efficiency, and innovation. We believe in creating digital experiences that make a real impact.
              </p></TextReveal>
            </div>
            <div>
              <TextReveal><h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '700', marginBottom: '16px' }}>Our <span className="text-gradient">Vision</span></h2></TextReveal>
              <TextReveal delay={0.1}><p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--text-muted)' }}>
                To be the leading technology partner for businesses worldwide, known for our innovation, quality, and commitment to excellence. We envision a future where technology transforms every aspect of business.
              </p></TextReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>Our Team</div></TextReveal>
            <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(34px, 5vw, 64px)', fontWeight: '700', lineHeight: 1 }}>Meet the <span className="text-gradient">Leaders</span></h2></TextReveal>
            <TextReveal delay={0.2}><p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '500px', margin: '12px auto 0', lineHeight: 1.7 }}>
              The visionary minds behind Technoziant who drive our innovation and success.
            </p></TextReveal>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {team.map((member, i) => <TeamCard key={i} member={member} index={i} onClick={openMember} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link to="/leaders" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
              style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: '500' }}>
              Meet Our Full Leadership Team →
            </Link>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>achievements</div></TextReveal>
            <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(34px, 5vw, 64px)', fontWeight: '700', lineHeight: 1 }}>Our <span className="text-gradient">Awards</span></h2></TextReveal>
            <TextReveal delay={0.2}><p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '500px', margin: '12px auto 0', lineHeight: 1.6 }}>
              Recognized by industry leaders for our commitment to design excellence and innovation.
            </p></TextReveal>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
            {awards.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(79,142,255,0.1)' }}
                className="liquid-glass" style={{ padding: '20px', borderRadius: '12px', cursor: 'default', transition: 'all 0.3s' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ fontSize: '28px', flexShrink: 0 }}>{a.icon}</div>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: '700', fontFamily: 'var(--font-h)', marginBottom: '2px' }}>
                      <span className="text-gradient">{a.count}x</span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)', marginBottom: '4px' }}>{a.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '6px' }}>{a.description}</div>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)", opacity: 0.6 }}>{a.year}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: '700', marginBottom: '12px' }}>
            Want to Join Our <span className="text-gradient">Team</span>?
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '360px', margin: '0 auto 24px' }}>
            We're always looking for talented individuals to join our mission.
          </p>
          <a href="/careers" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
            className="liquid-glass-strong" style={{
              display: 'inline-block', padding: '14px 36px', borderRadius: '100px',
              fontSize: '13px', fontWeight: '600', color: 'var(--text)', textDecoration: 'none'
            }}>
            View Open Positions →
          </a>
        </div>
      </section>

      <LeaderModal leader={selectedMember} isOpen={isModalOpen} onClose={closeMember} />

      <Footer />

      <style>{`.view-indicator { opacity: 0 !important; } div:hover > .view-indicator { opacity: 1 !important; }`}</style>
    </main>
  )
}
