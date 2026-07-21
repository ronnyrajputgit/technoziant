import { useState, useEffect } from 'react'
import { api } from '../../utils/api'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import MailIcon from '@mui/icons-material/Mail'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'

function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onCancel}>
      <div className="liquid-glass" style={{ width: '100%', maxWidth: '400px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <DeleteIcon sx={{ fontSize: 24, color: '#ef4444' }} />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)', marginBottom: '6px' }}>{title}</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)', marginBottom: '20px', lineHeight: 1.5 }}>{message}</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={onCancel} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: 'var(--font-code)' }}>Cancel</button>
            <button onClick={onConfirm} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'var(--font-code)' }}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FeedbackPage() {
  const [feedback, setFeedback] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [error, setError] = useState('')

  const loadFeedback = () => {
    setLoading(true)
    api.getFeedback().then(setFeedback).catch(e => setError(e.message)).finally(() => setLoading(false))
  }

  useEffect(() => { loadFeedback() }, [])

  const handleApprove = async (item) => {
    try {
      const updated = await api.updateFeedback(item.id, { status: 'approved' })
      setFeedback(feedback.map(f => f.id === item.id ? updated : f))
    } catch (e) { setError(e.message) }
  }

  const handleReject = async (item) => {
    try {
      const updated = await api.updateFeedback(item.id, { status: 'rejected' })
      setFeedback(feedback.map(f => f.id === item.id ? updated : f))
    } catch (e) { setError(e.message) }
  }

  const handleDelete = async () => {
    if (!deleteConfirm) return
    try {
      await api.deleteFeedback(deleteConfirm.id)
      setFeedback(feedback.filter(f => f.id !== deleteConfirm.id))
      setDeleteConfirm(null)
    } catch (e) { setError(e.message) }
  }

  const filtered = filter === 'all' ? feedback : feedback.filter(f => f.status === filter)

  const pending = feedback.filter(f => f.status === 'pending' || !f.status).length
  const approved = feedback.filter(f => f.status === 'approved').length
  const rejected = feedback.filter(f => f.status === 'rejected').length

  return (
    <div>
      <ConfirmDialog open={!!deleteConfirm} title="Delete Feedback?" message="This feedback will be permanently deleted." onConfirm={handleDelete} onCancel={() => setDeleteConfirm(null)} />

      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)' }}>system</div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: '700' }}>Feedback</h1>
      </div>

      {error && (
        <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: '12px', fontFamily: 'var(--font-code)', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{error}</span>
          <button onClick={() => setError('')} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}><CloseIcon sx={{ fontSize: 16 }} /></button>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px', marginBottom: '16px' }}>
        {[
          { label: 'Total', value: feedback.length, color: '#4f8eff', bg: 'rgba(79,142,255,0.1)' },
          { label: 'Pending', value: pending, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
          { label: 'Approved', value: approved, color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
          { label: 'Rejected', value: rejected, color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
        ].map((s, i) => (
          <div key={i} className="liquid-glass" style={{ padding: '14px', borderRadius: '10px' }}>
            <div style={{ fontSize: '22px', fontWeight: '700', color: s.color, fontFamily: 'var(--font-h)' }}>{s.value}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
        {['all', 'pending', 'approved', 'rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '500', cursor: 'pointer', fontFamily: 'var(--font-code)', textTransform: 'capitalize', border: '1px solid var(--glass-border)', background: filter === f ? 'rgba(34,197,94,0.15)' : 'transparent', color: filter === f ? '#22c55e' : 'var(--text-muted)' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Feedback List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Loading...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>No feedback submissions found.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map(item => (
            <div key={item.id} className="liquid-glass" style={{ padding: '16px', borderRadius: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #4f8eff, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: '#fff', flexShrink: 0 }}>
                    {(item.name || item.email || '?')[0].toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>{item.name || 'Anonymous'}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MailIcon sx={{ fontSize: 11 }} /> {item.email || 'No email'}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {item.rating && (
                    <div style={{ display: 'flex', gap: '1px' }}>
                      {[1,2,3,4,5].map(s => s <= item.rating ? <StarIcon key={s} sx={{ fontSize: 14, color: '#f59e0b' }} /> : <StarBorderIcon key={s} sx={{ fontSize: 14, color: 'var(--text-muted)' }} />)}
                    </div>
                  )}
                  <span style={{ fontSize: '9px', padding: '3px 10px', borderRadius: '100px', fontWeight: '600', fontFamily: 'var(--font-code)', background: item.status === 'approved' ? 'rgba(34,197,94,0.9)' : item.status === 'rejected' ? 'rgba(239,68,68,0.9)' : 'rgba(245,158,11,0.9)', color: '#fff' }}>
                    {item.status || 'pending'}
                  </span>
                </div>
              </div>
              {item.feedback && <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '12px', fontFamily: 'var(--font-code)' }}>{item.feedback}</p>}
              <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                {item.status !== 'approved' && (
                  <button onClick={() => handleApprove(item)} style={{ padding: '5px 12px', borderRadius: '6px', border: 'none', fontSize: '11px', fontWeight: '600', color: '#fff', cursor: 'pointer', background: 'linear-gradient(135deg, #22c55e, #16a34a)', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircleIcon sx={{ fontSize: 14 }} /> Approve
                  </button>
                )}
                {item.status !== 'rejected' && (
                  <button onClick={() => handleReject(item)} style={{ padding: '5px 12px', borderRadius: '6px', border: 'none', fontSize: '11px', fontWeight: '600', color: '#fff', cursor: 'pointer', background: 'linear-gradient(135deg, #f59e0b, #d97706)', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CancelIcon sx={{ fontSize: 14 }} /> Reject
                  </button>
                )}
                <button onClick={() => setDeleteConfirm(item)} style={{ padding: '5px 12px', borderRadius: '6px', border: 'none', fontSize: '11px', fontWeight: '600', color: '#fff', cursor: 'pointer', background: 'linear-gradient(135deg, #ef4444, #dc2626)', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <DeleteIcon sx={{ fontSize: 14 }} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
