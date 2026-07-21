import { useState, useEffect } from 'react'
import { TextReveal } from '../ui/TextReveal'
import { api } from '../../utils/api'

const defaultEmojis = ['⚛️', '▲', '💚', '📘', '🟢', '🐍', '🐘', '🍃', '◆', '🔴', '☁️', '🐳', '⚙️', '🧠', '🎮', '💙', '🍎', '🟣', '🔵', '🦀']

const scrollStyle = `
  @keyframes scrollLeft {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes scrollRight {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  .scroll-track-left {
    display: flex;
    gap: 10px;
    animation: scrollLeft 25s linear infinite;
    width: max-content;
  }
  .scroll-track-left:hover { animation-play-state: paused; }
  .scroll-track-right {
    display: flex;
    gap: 10px;
    animation: scrollRight 25s linear infinite;
    width: max-content;
  }
  .scroll-track-right:hover { animation-play-state: paused; }
`

export function TechStack() {
  const [items, setItems] = useState([])

  useEffect(() => {
    api.getContent('tech_stack', { visible: 'true' }).then(setItems).catch(() => {})
  }, [])

  if (!items.length) return null

  const half = Math.ceil(items.length / 2)
  const row1 = items.slice(0, half)
  const row2 = items.slice(half)

  return (
    <section className="section" style={{ borderTop: '1px solid var(--glass-border)', overflow: 'hidden' }}>
      <style>{scrollStyle}</style>
      <div className="container" style={{ textAlign: 'center', marginBottom: '24px' }}>
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>tech stack</div></TextReveal>
        <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', lineHeight: 1 }}>Our <span className="text-gradient">Tech Stack</span></h2></TextReveal>
      </div>

      {/* Row 1 - scrolls left */}
      <div style={{ overflow: 'hidden', marginBottom: '8px' }}>
        <div className="scroll-track-left">
          {[...row1, ...row1].map((t, i) => (
            <div key={`r1-${i}`} className="liquid-glass texture-noise" style={{ minWidth: '110px', padding: '10px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <span style={{ fontSize: '14px' }}>{t.icon || defaultEmojis[i % defaultEmojis.length]}</span>
              <span style={{ fontSize: '11px', fontWeight: '500', whiteSpace: 'nowrap' }}>{t.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - scrolls right */}
      <div style={{ overflow: 'hidden' }}>
        <div className="scroll-track-right">
          {[...row2, ...row2].map((t, i) => (
            <div key={`r2-${i}`} className="liquid-glass texture-noise" style={{ minWidth: '110px', padding: '10px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <span style={{ fontSize: '14px' }}>{t.icon || defaultEmojis[(i + 10) % defaultEmojis.length]}</span>
              <span style={{ fontSize: '11px', fontWeight: '500', whiteSpace: 'nowrap' }}>{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
