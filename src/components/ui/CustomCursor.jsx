import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'

export function CustomCursor() {
  const { cursorType, cursorText } = useApp()
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const rafRef = useRef(null)
  const targetRef = useRef({ x: -100, y: -100 })
  const currentRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const lerp = (start, end, factor) => start + (end - start) * factor

    const animate = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.35)
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.35)

      setPos({ x: currentRef.current.x, y: currentRef.current.y })
      rafRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    rafRef.current = requestAnimationFrame(animate)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isVisible])

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  if (isMobile) return null

  const getColor = () => {
    switch (cursorType) {
      case 'hover': return '#4f8eff'
      case 'text': return '#fff'
      case 'project': return '#a855f7'
      default: return '#fff'
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99999 }}>
      {/* Main arrow cursor */}
      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          transform: `translate(-2px, -2px) rotate(${isClicking ? 45 : 0}deg) scale(${isClicking ? 0.8 : 1})`,
          transition: 'transform 0.1s ease-out',
          opacity: isVisible ? 1 : 0,
          willChange: 'transform'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 3L19 12L12 13.5L9 20L5 3Z"
            fill={getColor()}
            stroke={getColor()}
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Glow aura */}
      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          width: '100px',
          height: '100px',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${getColor()}25, transparent 70%)`,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s, background 0.3s',
          willChange: 'transform'
        }}
      />

      {/* Diamond ring on hover */}
      {cursorType === 'hover' && (
        <div
          style={{
            position: 'fixed',
            left: pos.x,
            top: pos.y,
            width: '40px',
            height: '40px',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            border: '1px solid rgba(79, 142, 255, 0.4)',
            borderRadius: '8px',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.2s'
          }}
        />
      )}

      {/* Text label */}
      {cursorType === 'text' && cursorText && (
        <div
          style={{
            position: 'fixed',
            left: pos.x + 16,
            top: pos.y + 16,
            fontSize: '10px',
            fontWeight: '600',
            color: '#fff',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            opacity: isVisible ? 1 : 0,
            textShadow: '0 0 10px rgba(255,255,255,0.5)',
            whiteSpace: 'nowrap'
          }}
        >
          {cursorText}
        </div>
      )}

      {/* Project badge */}
      {cursorType === 'project' && (
        <div
          style={{
            position: 'fixed',
            left: pos.x,
            top: pos.y,
            transform: 'translate(-50%, -50%)',
            padding: '6px 14px',
            background: 'rgba(168, 85, 247, 0.15)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '100px',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.2s'
          }}
        >
          <span style={{
            fontSize: '9px',
            fontWeight: '600',
            color: '#fff',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}>
            View
          </span>
        </div>
      )}

      {/* Click ripple */}
      {isClicking && (
        <motion.div
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed',
            left: pos.x,
            top: pos.y,
            width: '30px',
            height: '30px',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: `1px solid ${getColor()}`,
            pointerEvents: 'none'
          }}
        />
      )}
    </div>
  )
}
