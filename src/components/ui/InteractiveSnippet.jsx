import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function InteractiveSnippet({ code, title, visual, color = '#22c55e' }) {
  const [showVisual, setShowVisual] = useState(false)

  return (
    <motion.div layout className="liquid-glass" style={{ borderRadius: '10px', overflow: 'hidden', cursor: 'pointer' }}
      onClick={() => setShowVisual(!showVisual)}>
      {/* Title bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', borderBottom: '1px solid var(--glass-border)', background: 'var(--surface)' }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#28c840' }} />
        </div>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{title}</span>
        <span style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '3px', background: `${color}15`, color, fontFamily: "var(--font-code)" }}>
          {showVisual ? 'code' : 'preview'}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {!showVisual ? (
          <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ padding: '16px', fontFamily: "var(--font-code)", fontSize: '12px', lineHeight: '22px', background: 'var(--code-bg)' }}>
            {code.split('\n').map((line, j) => (
              <div key={j} style={{ display: 'flex' }}>
                <span style={{ color: 'var(--text-muted)', opacity: 0.3, marginRight: '14px', minWidth: '14px', textAlign: 'right', fontSize: '10px' }}>{j + 1}</span>
                <span style={{ color: 'var(--code-text)' }}>
                  {line.includes('const') ? <><span style={{ color: 'var(--code-keyword)' }}>const</span> {line.replace('const ', '')}</> :
                   line.includes('await') ? <><span style={{ color: 'var(--code-keyword)' }}>await</span> {line.replace('await ', '')}</> :
                   line.includes('//') ? <span style={{ color: 'var(--code-comment)' }}>{line}</span> :
                   line}
                </span>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div key="visual" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ padding: '20px', minHeight: '120px' }}>
            {visual}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function EcommerceVisual() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {['Product A', 'Product B', 'Product C'].map((p, i) => (
          <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}
            className="liquid-glass" style={{ flex: 1, minWidth: '80px', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>{['👟', '👕', '🎒'][i]}</div>
            <div style={{ fontSize: '10px', fontWeight: '600' }}>{p}</div>
            <div style={{ fontSize: '9px', color: '#22c55e', fontFamily: "var(--font-code)" }}>${(i + 1) * 49}.99</div>
          </motion.div>
        ))}
      </div>
      <div className="liquid-glass" style={{ padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '11px', fontFamily: "var(--font-code)" }}>Cart Total</span>
        <span style={{ fontSize: '14px', fontWeight: '700', color: '#22c55e' }}>$149.97</span>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        {['Stripe', 'Razorpay', 'PayPal'].map((p, i) => (
          <div key={i} className="liquid-glass" style={{ flex: 1, padding: '6px', borderRadius: '6px', textAlign: 'center', fontSize: '9px', fontFamily: "var(--font-code)" }}>{p}</div>
        ))}
      </div>
    </div>
  )
}

export function HealthcareVisual() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div className="liquid-glass" style={{ padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>👨‍⚕️</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '11px', fontWeight: '600' }}>Dr. Sarah Chen</div>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Cardiologist • Available</div>
        </div>
        <div style={{ padding: '4px 8px', borderRadius: '4px', background: 'rgba(34,197,94,0.1)', color: '#22c55e', fontSize: '8px', fontFamily: "var(--font-code)" }}>online</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {[
          { label: 'Patients', val: '10K+', icon: '👥' },
          { label: 'Doctors', val: '500+', icon: '👨‍⚕️' },
          { label: 'Consultations', val: '50K+', icon: '📹' },
          { label: 'Uptime', val: '99.9%', icon: '✅' }
        ].map((s, i) => (
          <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}
            className="liquid-glass" style={{ padding: '10px', borderRadius: '6px', textAlign: 'center' }}>
            <div style={{ fontSize: '14px' }}>{s.icon}</div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#3b82f6' }}>{s.val}</div>
            <div style={{ fontSize: '8px', color: 'var(--text-muted)' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
      <div className="liquid-glass" style={{ padding: '8px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
        <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>HIPAA Compliant • End-to-End Encrypted</span>
      </div>
    </div>
  )
}

export function FintechVisual() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div className="liquid-glass" style={{ padding: '14px', borderRadius: '8px', background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(59,130,246,0.1))' }}>
        <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: "var(--font-code)" }}>Total Balance</div>
        <div style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'var(--font-h)' }}>$1,24,563.89</div>
        <div style={{ fontSize: '10px', color: '#22c55e', fontFamily: "var(--font-code)" }}>+12.5% this month</div>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        {[
          { label: 'Send', icon: '↗️', color: '#3b82f6' },
          { label: 'Receive', icon: '↙️', color: '#22c55e' },
          { label: 'Swap', icon: '↔️', color: '#a855f7' },
          { label: 'Pay', icon: '💳', color: '#f59e0b' }
        ].map((a, i) => (
          <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.08 }}
            style={{ flex: 1, padding: '10px', borderRadius: '8px', textAlign: 'center', background: `${a.color}10`, border: `1px solid ${a.color}20` }}>
            <div style={{ fontSize: '16px', marginBottom: '2px' }}>{a.icon}</div>
            <div style={{ fontSize: '9px', color: a.color, fontWeight: '500' }}>{a.label}</div>
          </motion.div>
        ))}
      </div>
      <div className="liquid-glass" style={{ padding: '8px 12px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>Last: -$2,450 to Acme Corp</span>
        <span style={{ fontSize: '8px', padding: '2px 6px', borderRadius: '3px', background: 'rgba(34,197,94,0.1)', color: '#22c55e', fontFamily: "var(--font-code)" }}>verified</span>
      </div>
    </div>
  )
}
