import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../context/AppContext'

export function ProjectModal({ project, isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { setCursorType } = useApp()

  const images = (project?.images && project.images.length > 0)
    ? [{ img: project.image, caption: project.title }, ...project.images.map((img, i) => ({ img, caption: `Gallery ${i + 1}` }))]
    : project?.image ? [{ img: project.image, caption: project.title }] : []

  useEffect(() => { setCurrentSlide(0) }, [project?.id])

  const nextSlide = () => setCurrentSlide(p => (p + 1) % images.length)
  const prevSlide = () => setCurrentSlide(p => (p - 1 + images.length) % images.length)

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }} />

          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="liquid-glass-strong texture-noise"
            style={{ position: 'relative', width: '100%', maxWidth: '1000px', height: '600px', borderRadius: '24px', overflow: 'hidden', display: 'grid', gridTemplateColumns: images.length > 1 ? '1.2fr 1fr' : '1fr 1fr' }}>

            <button onClick={onClose} onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
              style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 20, width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#fff', cursor: 'pointer' }}>
              ✕
            </button>

            {/* Left - Image Carousel */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              {images.length > 0 ? (
                <>
                  <AnimatePresence mode="wait">
                    <motion.img key={currentSlide} src={images[currentSlide]?.img} alt={images[currentSlide]?.caption}
                      initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </AnimatePresence>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 70%, var(--bg) 100%)' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: project.color || '#4f8eff' }} />
                  {images.length > 1 && (
                    <>
                      <button onClick={prevSlide} onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                        style={{ position: 'absolute', left: '16px', bottom: '60px', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#fff', cursor: 'pointer' }}>
                        ←
                      </button>
                      <button onClick={nextSlide} onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                        style={{ position: 'absolute', right: '16px', bottom: '60px', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#fff', cursor: 'pointer' }}>
                        →
                      </button>
                    </>
                  )}
                  <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ padding: '6px 12px', borderRadius: '100px', fontSize: '10px', color: '#fff', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
                      {images[currentSlide]?.caption}
                    </span>
                    {images.length > 1 && (
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {images.map((_, i) => (
                          <button key={i} onClick={() => setCurrentSlide(i)}
                            style={{ width: '6px', height: '6px', borderRadius: '50%', border: 'none', cursor: 'pointer',
                              background: i === currentSlide ? (project.color || '#4f8eff') : 'rgba(255,255,255,0.3)', transition: 'all 0.3s' }} />
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                  No image available
                </div>
              )}
            </div>

            {/* Right - Content */}
            <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {project.logo && (
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--glass-border)', flexShrink: 0 }}>
                      <img src={project.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                  )}
                  <h2 style={{ fontSize: '28px', fontWeight: '700', fontFamily: 'var(--font-h)', letterSpacing: '-0.02em', margin: 0 }}>{project.title}</h2>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{project.year}</span>
              </div>

              {project.subtitle && (
                <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '100px', fontSize: '10px', color: project.color || '#4f8eff', fontWeight: '600', background: `${project.color || '#4f8eff'}15`, border: `1px solid ${project.color || '#4f8eff'}25`, marginBottom: '16px', width: 'fit-content' }}>
                  {project.subtitle}
                </span>
              )}

              <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '20px' }}>
                {project.description}
              </p>

              {(project.client || project.duration || project.team || project.result) && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                  {project.client && (
                    <div className="liquid-glass" style={{ padding: '12px', borderRadius: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px' }}>🏢</span>
                        <span style={{ fontSize: '8px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Client</span>
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: '500' }}>{project.client}</div>
                    </div>
                  )}
                  {project.duration && (
                    <div className="liquid-glass" style={{ padding: '12px', borderRadius: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px' }}>⏱️</span>
                        <span style={{ fontSize: '8px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Duration</span>
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: '500' }}>{project.duration}</div>
                    </div>
                  )}
                  {project.team && (
                    <div className="liquid-glass" style={{ padding: '12px', borderRadius: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px' }}>👥</span>
                        <span style={{ fontSize: '8px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Team</span>
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: '500' }}>{project.team}</div>
                    </div>
                  )}
                  {project.result && (
                    <div className="liquid-glass" style={{ padding: '12px', borderRadius: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px' }}>📊</span>
                        <span style={{ fontSize: '8px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Result</span>
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: '500' }}>{project.result}</div>
                    </div>
                  )}
                </div>
              )}

              {project.tags && project.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {project.tags.map(t => (
                    <span key={t} className="liquid-glass" style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '10px', color: project.color || '#4f8eff', fontWeight: '500' }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
