import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../utils/api'
import { Footer } from '../components/layout/Footer'

const starLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']

function StarRating({ rating, setRating }) {
  const [hover, setHover] = useState(0)
  return (
    <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '16px' }}>
      {[1, 2, 3, 4, 5].map(star => (
        <button key={star} onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}
          style={{ fontSize: '28px', background: 'none', border: 'none', cursor: 'pointer', color: star <= (hover || rating) ? '#f59e0b' : 'var(--glass-border)', transition: 'color 0.15s', padding: '2px' }}>
          ★
        </button>
      ))}
    </div>
  )
}

export function FeedbackForm() {
  const [searchParams] = useSearchParams()
  const project = searchParams.get('project') || ''
  const [form, setForm] = useState({ name: '', email: '', company: '', rating: 0, feedback: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.feedback.trim()) {
      setError('Name and feedback are required')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      await api.submitFeedback({ ...form, project })
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Failed to submit feedback')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <main style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="liquid-glass" style={{ padding: '40px', borderRadius: '16px', textAlign: 'center', maxWidth: '400px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: 'var(--text)' }}>Thank You!</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>Your feedback has been submitted successfully.</p>
          <a href="/" style={{ padding: '10px 24px', borderRadius: '8px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', fontSize: '14px', fontWeight: '600', textDecoration: 'none', fontFamily: 'var(--font-code)' }}>Back to Home</a>
        </div>
      </main>
    )
  }

  return (
    <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>feedback</div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: '700', marginBottom: '8px' }}>Share Your <span className="text-gradient">Experience</span></h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>We value your feedback. It helps us improve our services.</p>
        </div>

        <form onSubmit={handleSubmit} className="liquid-glass" style={{ padding: '24px', borderRadius: '16px' }}>
          {error && (
            <div style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: '12px', fontFamily: 'var(--font-code)', marginBottom: '16px' }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name *</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" required
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '14px', outline: 'none', fontFamily: "var(--font-code)", boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '14px', outline: 'none', fontFamily: "var(--font-code)", boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</label>
              <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company name"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '14px', outline: 'none', fontFamily: "var(--font-code)", boxSizing: 'border-box' }} />
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rating *</label>
            <StarRating rating={form.rating} setRating={(r) => setForm({ ...form, rating: r })} />
            {form.rating > 0 && <span style={{ fontSize: '12px', color: '#f59e0b', fontFamily: "var(--font-code)" }}>{starLabels[form.rating - 1]}</span>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Feedback *</label>
            <textarea value={form.feedback} onChange={e => setForm({ ...form, feedback: e.target.value })} placeholder="Tell us about your experience..." rows={4} required
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '14px', outline: 'none', fontFamily: "var(--font-code)", resize: 'vertical', boxSizing: 'border-box' }} />
          </div>

          {project && (
            <div style={{ marginBottom: '16px', padding: '8px 12px', borderRadius: '8px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
              <span style={{ fontSize: '11px', color: '#3b82f6', fontFamily: "var(--font-code)" }}>Project: {project}</span>
            </div>
          )}

          <button type="submit" disabled={submitting} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-code)', opacity: submitting ? 0.7 : 1 }}>
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
      <Footer />
    </main>
  )
}
