import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TextReveal } from '../components/ui/TextReveal'
import { GlowCard } from '../components/ui/Cards'
import { faqData } from '../data/projects'
import { useApp } from '../context/AppContext'
import { Footer } from '../components/layout/Footer'

export function FAQ() {
  const { setCursorType } = useApp()
  const [open, setOpen] = useState(null)

  return (
    <main style={{ paddingTop: '110px', minHeight: '100vh' }}>
      <section className="container" style={{ marginBottom: '48px' }}>
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>FAQ</div></TextReveal>
        <TextReveal delay={0.1}><h1 style={{ fontSize: 'clamp(44px, 8vw, 100px)', fontWeight: '700', lineHeight: 0.95, marginBottom: '16px' }}>Frequently Asked <span className="text-gradient">Questions</span></h1></TextReveal>
        <TextReveal delay={0.2}><p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '420px' }}>Everything you need to know about working with us.</p></TextReveal>
      </section>
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          {faqData.map((faq, i) => (
            <GlowCard key={i} glowColor="var(--accent)" style={{ padding: 0, marginBottom: '8px' }}>
              <button onClick={() => setOpen(open === i ? null : i)} onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}
                style={{ width: '100%', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text)', fontSize: '14px', fontWeight: '600', textAlign: 'left', cursor: 'pointer' }}>
                <span>{faq.question}</span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} style={{ fontSize: '18px', color: 'var(--accent)', marginLeft: '14px', flexShrink: 0 }}>+</motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }} style={{ overflow: 'hidden' }}>
                    <p style={{ padding: '0 20px 18px', fontSize: '13px', lineHeight: 1.7, color: 'var(--text-muted)' }}>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlowCard>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
