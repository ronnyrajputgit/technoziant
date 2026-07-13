import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Preloader() {
  const [phase, setPhase] = useState(0)
  const [typedText, setTypedText] = useState('')

  const lines = [
    'import { Technoziant } from "@technoziant/core"',
    'const app = new Technoziant({ mode: "production" })',
    'await app.initialize()',
    'console.log("🚀 Ready to launch")'
  ]

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600)
    const t2 = setTimeout(() => setPhase(2), 1800)
    const t3 = setTimeout(() => setPhase(3), 3000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  useEffect(() => {
    if (phase === 0) return
    const currentLine = lines[Math.min(phase - 1, lines.length - 1)]
    let i = 0
    const interval = setInterval(() => {
      if (i <= currentLine.length) {
        setTypedText(currentLine.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 20)
    return () => clearInterval(interval)
  }, [phase])

  return (
    <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      style={{ position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 10000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

      {/* Terminal window */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
        style={{
          width: 'min(90vw, 500px)',
          background: 'var(--code-bg)',
          border: '1px solid var(--code-border)',
          borderRadius: '12px',
          overflow: 'hidden',
          zIndex: 2
        }}>
        {/* Title bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 16px', borderBottom: '1px solid var(--code-border)', background: 'var(--surface)' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
          <span style={{ marginLeft: '8px', fontSize: '11px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>terminal</span>
        </div>

        {/* Terminal content */}
        <div style={{ padding: '20px', fontFamily: "var(--font-code)", fontSize: '12px', lineHeight: '24px', minHeight: '180px' }}>
          {lines.slice(0, phase).map((line, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#22c55e', marginRight: '8px' }}>$</span>
              <span style={{ color: 'var(--code-text)' }}>
                {i === phase - 1 ? typedText : line}
              </span>
              {i === phase - 1 && typedText.length < lines[Math.min(phase - 1, lines.length - 1)].length && (
                <span style={{ display: 'inline-block', width: '7px', height: '14px', background: '#22c55e', marginLeft: '2px', animation: 'blink 1s step-end infinite' }} />
              )}
              {i < phase - 1 && <span style={{ color: '#22c55e', marginLeft: '8px' }}>✓</span>}
            </div>
          ))}
          {phase >= lines.length && (
            <div style={{ marginTop: '12px', color: '#22c55e', fontSize: '11px' }}>
              {'>'} Application ready
            </div>
          )}
        </div>
      </motion.div>

      {/* Loading bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        style={{ width: '200px', height: '2px', background: 'var(--glass-border)', borderRadius: '1px', marginTop: '24px', zIndex: 2, overflow: 'hidden' }}>
        <motion.div animate={{ width: phase === 0 ? '25%' : phase === 1 ? '50%' : phase === 2 ? '75%' : '100%' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #22c55e, #16a34a)', borderRadius: '1px' }} />
      </motion.div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </motion.div>
  )
}
