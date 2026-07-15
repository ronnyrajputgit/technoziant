import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Preloader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + 2
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      style={{ position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 10000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Skeleton Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: 'min(85vw, 300px)', marginBottom: '24px' }}>
        {[1, 2, 3].map(i => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="liquid-glass" style={{ padding: '14px', borderRadius: '8px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '6px', background: 'var(--surface-2)', animation: 'pulse 1.5s infinite' }} />
            <div style={{ flex: 1 }}>
              <div style={{ height: '10px', width: '60%', background: 'var(--surface-2)', borderRadius: '4px', marginBottom: '6px', animation: 'pulse 1.5s infinite' }} />
              <div style={{ height: '8px', width: '40%', background: 'var(--surface-2)', borderRadius: '4px', animation: 'pulse 1.5s infinite 0.2s' }} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Logo */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '18px', fontWeight: '700', fontFamily: "var(--font-code)", letterSpacing: '-0.02em' }}>
          <span style={{ color: '#22c55e' }}>techno</span><span style={{ color: 'var(--text-muted)' }}>ziant</span>
        </div>
      </motion.div>

      {/* Progress bar */}
      <div style={{ width: '160px', height: '2px', background: 'var(--glass-border)', borderRadius: '1px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${progress}%` }} style={{ height: '100%', background: 'linear-gradient(90deg, #22c55e, #16a34a)', borderRadius: '1px' }} />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </motion.div>
  )
}
