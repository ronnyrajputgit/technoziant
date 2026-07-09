import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import sumanImg from '../../assets/images/Suman.jpeg'
import sahilImg from '../../assets/images/Shahil.jpeg'

const leaders = [
  { name: 'Suman', role: 'Founder', image: sumanImg, color: '#4f8eff' },
  { name: 'Sahil', role: 'Co-founder & CEO', image: sahilImg, color: '#a855f7' },
  { name: 'Ronny', role: 'CTO', image: 'https://ui-avatars.com/api/?name=Ronny&background=06d6a0&color=fff&size=400&bold=true', color: '#06d6a0' },
  { name: 'Avnish', role: 'CMO', image: 'https://ui-avatars.com/api/?name=Avnish&background=f472b6&color=fff&size=400&bold=true', color: '#f472b6' }
]

export function Preloader() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800)
    const t2 = setTimeout(() => setPhase(2), 2000)
    const t3 = setTimeout(() => setPhase(3), 3500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <motion.div exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      style={{ position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 10000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

      {/* Ambient blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }} transition={{ duration: 4, repeat: Infinity }}
          style={{ position: 'absolute', top: '15%', left: '10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, #4f8eff, transparent 70%)', filter: 'blur(80px)' }} />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.04, 0.08, 0.04] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          style={{ position: 'absolute', bottom: '10%', right: '10%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, #a855f7, transparent 70%)', filter: 'blur(70px)' }} />
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.07, 0.03] }} transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          style={{ position: 'absolute', top: '60%', left: '50%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, #06d6a0, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      {/* Grid texture */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.02,
        backgroundImage: 'linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)',
        backgroundSize: '60px 60px' }} />

      {/* Logo */}
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
        style={{ marginBottom: '48px', zIndex: 2 }}>
        <div style={{ fontSize: '32px', fontWeight: '700', fontFamily: 'var(--font-h)', letterSpacing: '-0.03em' }}>
          <span className="text-gradient">Techno</span><span style={{ opacity: 0.25 }}>/</span><span>ziant</span>
        </div>
      </motion.div>

      {/* Loading bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        style={{ width: '200px', height: '2px', background: 'var(--glass-border)', borderRadius: '1px', marginBottom: '20px', zIndex: 2, overflow: 'hidden' }}>
        <motion.div animate={{ width: phase === 0 ? '30%' : phase === 1 ? '60%' : phase === 2 ? '90%' : '100%' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #4f8eff, #a855f7, #06d6a0)', borderRadius: '1px' }} />
      </motion.div>

      {/* Phase text */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '40px', zIndex: 2 }}>
        {phase === 0 && 'Welcome to Technoziant'}
        {phase === 1 && 'Meet Our Team'}
        {phase === 2 && 'Crafting Experiences'}
        {phase === 3 && 'Almost Ready'}
      </motion.div>

      {/* Leader cards - shown during loading */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '800px', padding: '0 20px', zIndex: 2 }}>
            {leaders.map((leader, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="liquid-glass texture-noise"
                style={{ padding: '14px 18px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '12px', minWidth: '190px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${leader.color}`, flexShrink: 0, boxShadow: `0 0 15px ${leader.color}30` }}>
                  <img src={leader.image} alt={leader.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '1px' }}>{leader.name}</div>
                  <div style={{ fontSize: '9px', color: leader.color, fontWeight: '500', letterSpacing: '0.05em' }}>{leader.role}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom text */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 0.8 }}
        style={{ position: 'absolute', bottom: '20px', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', zIndex: 2 }}>
        © 2024 Technoziant. All rights reserved.
      </motion.div>
    </motion.div>
  )
}
