import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../context/AppContext'

const projectGallery = {
  1: [
    { img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', caption: 'Dashboard Overview' },
    { img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', caption: 'Analytics Charts' },
    { img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80', caption: 'Data Visualization' },
    { img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80', caption: 'Team Collaboration' }
  ],
  2: [
    { img: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&q=80', caption: 'Mobile Interface' },
    { img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80', caption: 'App Screens' },
    { img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80', caption: 'Payment Flow' },
    { img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80', caption: 'User Onboarding' }
  ],
  3: [
    { img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80', caption: 'Social Feed' },
    { img: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80', caption: 'User Profiles' },
    { img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80', caption: 'Community Features' },
    { img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80', caption: 'Content Creation' }
  ],
  4: [
    { img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80', caption: '3D Editor' },
    { img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80', caption: 'Rendering Engine' },
    { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80', caption: 'Collaboration Tools' },
    { img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80', caption: 'Final Output' }
  ],
  5: [
    { img: 'https://images.unsplash.com/photo-1519066629768-8ffcb8f06079?w=800&q=80', caption: 'Map Interface' },
    { img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80', caption: 'Route Planning' },
    { img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80', caption: 'Navigation View' },
    { img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80', caption: 'Offline Mode' }
  ],
  6: [
    { img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80', caption: 'Gaming Hub' },
    { img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80', caption: 'Live Streaming' },
    { img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80', caption: 'Game Library' },
    { img: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80', caption: 'Social Features' }
  ],
  7: [
    { img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80', caption: 'Telemedicine' },
    { img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80', caption: 'Patient Portal' },
    { img: 'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=800&q=80', caption: 'Doctor Dashboard' },
    { img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80', caption: 'Health Records' }
  ],
  8: [
    { img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80', caption: 'Storefront' },
    { img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80', caption: 'Product Pages' },
    { img: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80', caption: 'Checkout Flow' },
    { img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', caption: 'Admin Dashboard' }
  ]
}

const projectDetails = {
  1: { client: 'DataCorp Inc.', duration: '4 months', team: '6 members', result: '3x user engagement' },
  2: { client: 'FinSecure', duration: '6 months', team: '8 members', result: 'High-volume transactions' },
  3: { client: 'Echo Inc.', duration: '5 months', team: '7 members', result: '2M+ active users' },
  4: { client: 'Prism Labs', duration: '8 months', team: '5 members', result: '50K+ creators' },
  5: { client: 'Atlas Co.', duration: '4 months', team: '4 members', result: '4.8★ App Store' },
  6: { client: 'Vortex Games', duration: '6 months', team: '9 members', result: '500K+ gamers' },
  7: { client: 'PulseMed', duration: '7 months', team: '8 members', result: '10K+ doctors' },
  8: { client: 'Bloom Corp', duration: '5 months', team: '7 members', result: 'High GMV growth' }
}

export function ProjectModal({ project, isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { setCursorType } = useApp()
  const images = projectGallery[project?.id] || projectGallery[1]
  const details = projectDetails[project?.id] || projectDetails[1]

  const nextSlide = () => setCurrentSlide(p => (p + 1) % images.length)
  const prevSlide = () => setCurrentSlide(p => (p - 1 + images.length) % images.length)

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          {/* Backdrop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }} />

          {/* Modal - Side by Side */}
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="liquid-glass-strong texture-noise"
            style={{ position: 'relative', width: '100%', maxWidth: '1000px', height: '600px', borderRadius: '24px', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1.2fr 1fr' }}>

            {/* Close button */}
            <button onClick={onClose} onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
              style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 20, width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#fff', cursor: 'pointer' }}>
              ✕
            </button>

            {/* Left - Image Carousel */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.img key={currentSlide} src={images[currentSlide].img} alt={images[currentSlide].caption}
                  initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </AnimatePresence>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 70%, var(--bg) 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: project.color }} />

              {/* Carousel controls */}
              <button onClick={prevSlide} onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                style={{ position: 'absolute', left: '16px', bottom: '60px', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#fff', cursor: 'pointer' }}>
                ←
              </button>
              <button onClick={nextSlide} onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                style={{ position: 'absolute', right: '16px', bottom: '60px', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#fff', cursor: 'pointer' }}>
                →
              </button>

              {/* Caption + Dots */}
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ padding: '6px 12px', borderRadius: '100px', fontSize: '10px', color: '#fff', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
                  {images[currentSlide].caption}
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {images.map((_, i) => (
                    <button key={i} onClick={() => setCurrentSlide(i)}
                      style={{ width: '6px', height: '6px', borderRadius: '50%', border: 'none', cursor: 'pointer',
                        background: i === currentSlide ? project.color : 'rgba(255,255,255,0.3)', transition: 'all 0.3s' }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
              {/* Title + Year */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '700', fontFamily: 'var(--font-h)', letterSpacing: '-0.02em', margin: 0 }}>{project.title}</h2>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{project.year}</span>
              </div>

              {/* Subtitle badge */}
              <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '100px', fontSize: '10px', color: project.color, fontWeight: '600', background: `${project.color}15`, border: `1px solid ${project.color}25`, marginBottom: '16px', width: 'fit-content' }}>
                {project.subtitle}
              </span>

              {/* Description */}
              <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '20px' }}>
                {project.description}
              </p>

              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                {[
                  { icon: '🏢', label: 'Client', value: details.client },
                  { icon: '⏱️', label: 'Duration', value: details.duration },
                  { icon: '👥', label: 'Team', value: details.team },
                  { icon: '📊', label: 'Result', value: details.result }
                ].map((stat, i) => (
                  <div key={i} className="liquid-glass" style={{ padding: '12px', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12px' }}>{stat.icon}</span>
                      <span style={{ fontSize: '8px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{stat.label}</span>
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: '500' }}>{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {project.tags.map(t => (
                  <span key={t} className="liquid-glass" style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '10px', color: project.color, fontWeight: '500' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
