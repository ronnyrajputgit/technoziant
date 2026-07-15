import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const codeLines = [
  { type: 'comment', text: '// Technoziant - Digital Excellence Engine' },
  { type: 'blank', text: '' },
  { type: 'keyword', text: 'import', rest: ' { creativity, technology } from ', string: "'@technoziant/core'" },
  { type: 'keyword', text: 'import', rest: ' { vision } from ', string: "'@technoziant/founders'" },
  { type: 'blank', text: '' },
  { type: 'keyword', text: 'const', rest: ' team = ', fn: 'new', className: 'Leadership', args: '()' },
  { type: 'blank', text: '' },
  { type: 'keyword', text: 'async function', rest: ' ', fn: 'craftDigitalProduct', args: '(idea) {', indent: 0 },
  { type: 'code', text: '  const discovery = ', fn: 'await', rest: ' team.', method: 'analyze', args: '(idea)', indent: 1 },
  { type: 'code', text: '  const strategy = ', fn: 'await', rest: ' team.', method: 'strategize', args: '(discovery)', indent: 1 },
  { type: 'code', text: '  const design = ', fn: 'await', rest: ' team.', method: 'designUI', args: '(strategy)', indent: 1 },
  { type: 'code', text: '  const product = ', fn: 'await', rest: ' team.', method: 'build', args: '(design)', indent: 1 },
  { type: 'blank', text: '' },
  { type: 'keyword', text: '  return', rest: ' product.', method: 'launch', args: '({ quality: \'exceptional\' })', indent: 1 },
  { type: 'bracket', text: '}', indent: 0 },
  { type: 'blank', text: '' },
  { type: 'keyword', text: 'const', rest: ' result = ', fn: 'await', rest2: ' ', fn2: 'craftDigitalProduct', args2: '(yourIdea)', indent: 0 },
  { type: 'code', text: 'console.', method: 'log', args: '(result.success)', indent: 0 },
  { type: 'comment', text: '// Output: 🚀 Product launched successfully' }
]

function TypingLine({ line, delay, isVisible }) {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(false)

  useEffect(() => {
    if (!isVisible) return
    const timer = setTimeout(() => {
      setShowCursor(true)
      let i = 0
      const fullText = buildLineText(line)
      const interval = setInterval(() => {
        if (i <= fullText.length) {
          setDisplayText(fullText.slice(0, i))
          i++
        } else {
          setShowCursor(false)
          clearInterval(interval)
        }
      }, 15)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [isVisible, delay, line])

  if (line.type === 'blank') return <div style={{ height: '16px' }} />

  return (
    <div style={{
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      fontSize: '12px',
      lineHeight: '22px',
      whiteSpace: 'pre',
      display: 'flex',
      alignItems: 'center'
    }}>
      <span style={{ color: 'rgba(255,255,255,0.15)', marginRight: '16px', userSelect: 'none', fontSize: '11px' }}>
        {String(codeLines.indexOf(line) + 1).padStart(2, '0')}
      </span>
      <span>
        {renderColoredText(displayText, line)}
        {showCursor && (
          <span style={{
            display: 'inline-block',
            width: '7px',
            height: '14px',
            background: '#22c55e',
            marginLeft: '1px',
            animation: 'blink 1s step-end infinite',
            verticalAlign: 'middle'
          }} />
        )}
      </span>
    </div>
  )
}

function buildLineText(line) {
  if (line.type === 'comment') return line.text
  if (line.type === 'keyword') return line.text + (line.rest || '') + (line.string || '') + (line.fn ? line.fn : '') + (line.className ? line.className : '') + (line.args || '') + (line.rest2 || '') + (line.fn2 || '') + (line.args2 || '')
  if (line.type === 'code') return (line.text || '') + (line.fn ? line.fn + ' ' : '') + (line.rest || '') + (line.method ? line.method : '') + (line.args || '')
  if (line.type === 'bracket') return line.text
  return line.text || ''
}

function renderColoredText(text, line) {
  if (!text) return null
  if (line.type === 'comment') return <span style={{ color: '#6a737d' }}>{text}</span>
  if (line.type === 'bracket') return <span style={{ color: '#e4eaf5' }}>{text}</span>

  const parts = []
  let remaining = text

  const keywords = ['import', 'const', 'async', 'function', 'return', 'await']
  const colors = { keyword: '#c678dd', string: '#98c379', fn: '#61afef', method: '#e5c07b', rest: '#e4eaf5', args: '#e4eaf5' }

  for (const kw of keywords) {
    if (remaining.startsWith(kw)) {
      parts.push(<span key={kw} style={{ color: colors.keyword }}>{kw}</span>)
      remaining = remaining.slice(kw.length)
      break
    }
  }

  if (remaining.includes("'")) {
    const strMatch = remaining.match(/('[^']*')/)
    if (strMatch) {
      const before = remaining.slice(0, strMatch.index)
      const str = strMatch[1]
      const after = remaining.slice(strMatch.index + str.length)
      parts.push(<span key="before" style={{ color: '#e4eaf5' }}>{before}</span>)
      parts.push(<span key="str" style={{ color: colors.string }}>{str}</span>)
      parts.push(<span key="after" style={{ color: '#e4eaf5' }}>{after}</span>)
      return <>{parts}</>
    }
  }

  parts.push(<span key="rest" style={{ color: '#e4eaf5' }}>{remaining}</span>)
  return <>{parts}</>
}

export function TechieSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section" style={{ borderTop: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,142,255,0.06), transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>
              How We Build
            </div>
            <h2 style={{ fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: '700', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '20px' }}>
              Code meets <span className="text-gradient">craft</span>
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '420px', marginBottom: '28px' }}>
              Every project follows our battle-tested pipeline — from discovery to deployment. We write clean, scalable code that powers exceptional digital products.
            </p>
          </div>

          <div className="liquid-glass" style={{
            padding: '24px',
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden',
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginLeft: '10px', fontFamily: 'monospace' }}>workflow.js</span>
            </div>
            <div style={{ minHeight: '320px' }}>
              {codeLines.map((line, i) => (
                <TypingLine key={i} line={line} delay={i * 120} isVisible={isInView} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
