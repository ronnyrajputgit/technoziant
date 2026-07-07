import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../context/AppContext'

export function LeaderModal({ leader, isOpen, onClose }) {
  const { setCursorType } = useApp()

  if (!leader) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }} />

          {/* Modal - Side by Side Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass-strong texture-noise"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1000px',
              height: '600px',
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr'
            }}>

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
              onClick={onClose}
              onMouseEnter={() => setCursorType('hover')}
              onMouseLeave={() => setCursorType('default')}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 20,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                color: '#fff',
                cursor: 'pointer'
              }}>
              ✕
            </motion.button>

            {/* Left - Image */}
            <div style={{
              position: 'relative',
              overflow: 'hidden',
              background: 'var(--surface)'
            }}>
              <img
                src={leader.image}
                alt={leader.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 15%'
                }}
                onError={e => { e.target.style.display = 'none' }}
              />
              {/* Gradient overlay right edge */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '30%',
                background: 'linear-gradient(to right, transparent, var(--bg))',
                pointerEvents: 'none'
              }} />
              {/* Index number */}
              <div style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                fontSize: '80px',
                fontWeight: '900',
                fontFamily: 'var(--font-h)',
                lineHeight: 1,
                color: 'rgba(255,255,255,0.1)',
                letterSpacing: '-0.05em'
              }}>
                {String(1).padStart(2, '0')}
              </div>
              {/* Gradient accent line */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: leader.gradient
              }} />
            </div>

            {/* Right - Content */}
            <div style={{
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>

              {/* Name + Role */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ marginBottom: '8px' }}>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  fontFamily: 'var(--font-h)',
                  letterSpacing: '-0.03em',
                  margin: '0 0 8px 0',
                  background: leader.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {leader.name}
                </h2>
                <span style={{
                  display: 'inline-block',
                  padding: '5px 14px',
                  borderRadius: '100px',
                  background: `${leader.color}15`,
                  color: leader.color,
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.05em',
                  border: `1px solid ${leader.color}30`
                }}>
                  {leader.role}
                </span>
              </motion.div>

              {/* Bio */}
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{
                  fontSize: '13px',
                  lineHeight: 1.7,
                  color: 'var(--text-muted)',
                  marginBottom: '20px'
                }}>
                {leader.bio}
              </motion.p>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                style={{ marginBottom: '20px' }}>
                <div style={{
                  fontSize: '9px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '10px',
                  fontWeight: '600'
                }}>
                  Achievements
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {leader.achievements.map((achievement, i) => (
                    <span key={i} className="liquid-glass" style={{
                      padding: '5px 12px',
                      borderRadius: '100px',
                      fontSize: '11px',
                      color: leader.color,
                      fontWeight: '500'
                    }}>
                      ✦ {achievement}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '10px',
                  marginBottom: '20px'
                }}>
                {[
                  { icon: '📊', label: 'Projects', value: '50+' },
                  { icon: '🏆', label: 'Awards', value: '12+' },
                  { icon: '👥', label: 'Team', value: '30+' }
                ].map((stat, i) => (
                  <div key={i} className="liquid-glass" style={{
                    padding: '12px',
                    borderRadius: '10px',
                    textAlign: 'center'
                  }}>
                    <span style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>{stat.icon}</span>
                    <div style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'var(--font-h)' }}>
                      <span className="text-gradient">{stat.value}</span>
                    </div>
                    <div style={{ fontSize: '8px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '2px' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                style={{ display: 'flex', gap: '8px' }}>
                {['LinkedIn', 'Twitter', 'Email'].map((social, i) => (
                  <a key={i} href="#" className="liquid-glass" style={{
                    padding: '8px 16px',
                    borderRadius: '100px',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'all 0.3s'
                  }}>
                    {social}
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
