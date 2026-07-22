import { useState, useEffect, useMemo } from 'react'
import { api } from '../../utils/api'
import { CMSSkeleton } from '../../components/ui/Skeleton'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import QrCodeIcon from '@mui/icons-material/QrCode'

function FormModal({ open, onClose, onSave, item, saving }) {
  const [form, setForm] = useState({ client_name: '', company: '', feedback: '', rating: 5, avatar: '', approved: true })

  useEffect(() => {
    if (open) document.activeElement?.blur()
  }, [open])

  useEffect(() => {
    if (item) {
      setForm({
        client_name: item.client_name || '',
        company: item.company || '',
        feedback: item.feedback || '',
        rating: item.rating || 5,
        avatar: item.avatar || '',
        approved: item.approved !== false
      })
    } else {
      setForm({ client_name: '', company: '', feedback: '', rating: 5, avatar: '', approved: true })
    }
  }, [item, open])

  if (!open) return null

  const inputStyle = {
    width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)',
    background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '13px', outline: 'none',
    fontFamily: 'var(--font-code)', boxSizing: 'border-box',
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div className="liquid-glass" style={{ width: '100%', maxWidth: '480px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700' }}>{item ? 'Edit' : 'Add'} Testimonial</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}><CloseIcon sx={{ fontSize: 20 }} /></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave(form) }} style={{ padding: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)', textTransform: 'uppercase' }}>Client Name *</label>
              <input type="text" value={form.client_name} onChange={e => setForm({ ...form, client_name: e.target.value })} required placeholder="John Doe" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)', textTransform: 'uppercase' }}>Company / Role</label>
              <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="CEO, Company Inc" style={inputStyle} />
            </div>
          </div>
          <div style={{ marginTop: '12px' }}>
            <label style={{ display: 'block', fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)', textTransform: 'uppercase' }}>Feedback Quote *</label>
            <textarea value={form.feedback} onChange={e => setForm({ ...form, feedback: e.target.value })} required placeholder="What they said about you..." rows={3} style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }} />
          </div>
          <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)', textTransform: 'uppercase' }}>Rating</label>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1,2,3,4,5].map(s => (
                  <button key={s} type="button" onClick={() => setForm({ ...form, rating: s })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}>
                    {s <= form.rating ? <StarIcon sx={{ fontSize: 20, color: '#fbbf24' }} /> : <StarBorderIcon sx={{ fontSize: 20, color: 'var(--text-muted)' }} />}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)', textTransform: 'uppercase' }}>Photo</label>
              <input type="text" value={form.avatar} onChange={e => setForm({ ...form, avatar: e.target.value })} placeholder="Image URL..." style={inputStyle} />
              {form.avatar && <div style={{ marginTop: '4px', width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--glass-border)' }}><img src={form.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>}
            </div>
          </div>
          <div style={{ marginTop: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.approved} onChange={e => setForm({ ...form, approved: e.target.checked })} style={{ width: '16px', height: '16px', accentColor: '#22c55e' }} />
              <span style={{ fontSize: '12px', color: 'var(--text)' }}>Approved (show on site)</span>
            </label>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '20px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--font-code)' }}>Cancel</button>
            <button type="submit" disabled={saving} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '6px', opacity: saving ? 0.7 : 1 }}>
              <SaveIcon sx={{ fontSize: 14 }} /> {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

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
            <button onClick={onCancel} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font-code)' }}>Cancel</button>
            <button onClick={onConfirm} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'var(--font-code)' }}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([])
  const [feedback, setFeedback] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [formOpen, setFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [error, setError] = useState('')

  const loadData = () => {
    setLoading(true)
    Promise.all([
      api.getContent('testimonials').catch(() => []),
      api.getContent('feedback_submissions').catch(() => [])
    ]).then(([tData, fData]) => {
      setTestimonials(Array.isArray(tData) ? tData : [])
      setFeedback(Array.isArray(fData) ? fData : [])
    }).catch(e => setError(e.message)).finally(() => setLoading(false))
  }

  useEffect(() => { loadData() }, [])

  const allItems = useMemo(() => {
    const items = []

    testimonials.forEach(t => {
      items.push({
        ...t,
        source: 'manual',
        sourceLabel: 'Dashboard',
        isApproved: t.approved === true || t.approved === 'true'
      })
    })

    feedback.forEach(f => {
      items.push({
        id: `fb-${f.id}`,
        client_name: f.name,
        company: f.company || '',
        feedback: f.feedback,
        rating: f.rating || 5,
        avatar: '',
        source: 'qr',
        sourceLabel: 'QR Code',
        isApproved: f.status === 'approved',
        feedbackId: f.id,
        feedbackStatus: f.status
      })
    })

    if (filter === 'approved') return items.filter(i => i.isApproved)
    if (filter === 'pending') return items.filter(i => !i.isApproved)
    if (search.trim()) {
      const q = search.toLowerCase()
      return items.filter(i => (i.client_name || '').toLowerCase().includes(q) || (i.feedback || '').toLowerCase().includes(q))
    }
    return items
  }, [testimonials, feedback, filter, search])

  const approvedCount = allItems.filter(i => i.isApproved).length
  const pendingCount = allItems.filter(i => !i.isApproved).length

  const handleSave = async (formData) => {
    setSaving(true)
    setError('')
    try {
      if (editingItem?.source === 'qr') {
        if (formData.approved) {
          await api.createContent('testimonials', {
            client_name: formData.client_name,
            company: formData.company,
            feedback: formData.feedback,
            rating: formData.rating,
            avatar: formData.avatar,
            approved: true
          })
          await api.deleteFeedback(editingItem.feedbackId)
        } else {
          await api.updateFeedback(editingItem.feedbackId, { status: 'rejected' })
        }
      } else if (editingItem) {
        await api.updateContent('testimonials', editingItem.id, {
          client_name: formData.client_name,
          company: formData.company,
          feedback: formData.feedback,
          rating: formData.rating,
          avatar: formData.avatar,
          approved: formData.approved
        })
      } else {
        await api.createContent('testimonials', {
          client_name: formData.client_name,
          company: formData.company,
          feedback: formData.feedback,
          rating: formData.rating,
          avatar: formData.avatar,
          approved: formData.approved
        })
      }
      setFormOpen(false)
      setEditingItem(null)
      loadData()
    } catch (e) { setError(e.message) }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!deleteConfirm) return
    try {
      if (deleteConfirm.source === 'qr') {
        await api.deleteFeedback(deleteConfirm.feedbackId)
      } else {
        await api.deleteContent('testimonials', deleteConfirm.id)
      }
      setDeleteConfirm(null)
      loadData()
    } catch (e) { setError(e.message) }
  }

  const toggleApproved = async (item) => {
    try {
      if (item.source === 'qr') {
        if (!item.isApproved) {
          await api.createContent('testimonials', {
            client_name: item.client_name,
            company: item.company,
            feedback: item.feedback,
            rating: item.rating,
            avatar: item.avatar,
            approved: true
          })
          await api.deleteFeedback(item.feedbackId)
        } else {
          await api.updateFeedback(item.feedbackId, { status: 'pending' })
        }
      } else {
        await api.updateContent('testimonials', item.id, { approved: !item.isApproved })
      }
      loadData()
    } catch (e) { setError(e.message) }
  }

  return (
    <div>
      <FormModal open={formOpen} onClose={() => { setFormOpen(false); setEditingItem(null) }} onSave={handleSave} item={editingItem} saving={saving} />
      <ConfirmDialog open={!!deleteConfirm} title="Delete Testimonial?" message={`"${deleteConfirm?.client_name}" will be permanently deleted.`} onConfirm={handleDelete} onCancel={() => setDeleteConfirm(null)} />

      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)' }}>services</div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: '700' }}>Testimonials & Feedback</h1>
      </div>

      {error && (
        <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: '12px', fontFamily: 'var(--font-code)', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{error}</span>
          <button onClick={() => setError('')} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}><CloseIcon sx={{ fontSize: 16 }} /></button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px', marginBottom: '16px' }}>
        {[
          { label: 'Total', value: allItems.length, color: '#4f8eff', bg: 'rgba(79,142,255,0.1)' },
          { label: 'Approved', value: approvedCount, color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
          { label: 'Pending', value: pendingCount, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
        ].map((s, i) => (
          <div key={i} className="liquid-glass" style={{ padding: '12px', borderRadius: '10px' }}>
            <div style={{ fontSize: '20px', fontWeight: '700', color: s.color, fontFamily: 'var(--font-h)' }}>{s.value}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 200px' }}>
          <SearchIcon sx={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: 'var(--text-muted)' }} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search testimonials..."
            style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '12px', outline: 'none', fontFamily: 'var(--font-code)', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {['all', 'approved', 'pending'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '500', cursor: 'pointer', fontFamily: 'var(--font-code)', textTransform: 'capitalize', border: '1px solid var(--glass-border)', background: filter === f ? 'rgba(34,197,94,0.15)' : 'transparent', color: filter === f ? '#22c55e' : 'var(--text-muted)' }}>
              {f}
            </button>
          ))}
        </div>
        <button onClick={() => { setEditingItem(null); setFormOpen(true) }} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', fontSize: '12px', fontWeight: '600', color: '#fff', cursor: 'pointer', background: 'linear-gradient(135deg, #22c55e, #16a34a)', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
          <AddIcon sx={{ fontSize: 16 }} /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}><CMSSkeleton /></div>
      ) : allItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>No testimonials found.</div>
      ) : (
        <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '10px' }}>
          {allItems.map(item => (
            <div key={item.id} className="liquid-glass" style={{ padding: '14px', borderRadius: '10px', transition: 'all 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', background: item.avatar ? 'transparent' : 'linear-gradient(135deg, #4f8eff, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: '#fff', flexShrink: 0 }}>
                    {item.avatar ? <img src={item.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (item.client_name || '?')[0].toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>{item.client_name}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>{item.company}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '8px', padding: '2px 6px', borderRadius: '100px', background: item.source === 'qr' ? 'rgba(168,85,247,0.12)' : 'rgba(79,142,255,0.12)', color: item.source === 'qr' ? '#a855f7' : '#4f8eff', fontWeight: '600', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    {item.source === 'qr' ? <QrCodeIcon sx={{ fontSize: 8 }} /> : <CheckCircleIcon sx={{ fontSize: 8 }} />} {item.sourceLabel}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '12px', lineHeight: 1.5, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '8px' }}>"{item.feedback}"</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1px' }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= (item.rating || 5) ? '#fbbf24' : 'var(--glass-border)', fontSize: '10px' }}>★</span>)}
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button onClick={() => toggleApproved(item)} title={item.isApproved ? 'Unapprove' : 'Approve'} style={{ padding: '4px 8px', borderRadius: '6px', background: item.isApproved ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)', color: item.isApproved ? '#22c55e' : '#f59e0b', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center' }}>
                    <CheckCircleIcon sx={{ fontSize: 14 }} />
                  </button>
                  <button onClick={() => { setEditingItem(item); setFormOpen(true) }} title="Edit" style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(79,142,255,0.1)', color: '#4f8eff', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center' }}>
                    <EditIcon sx={{ fontSize: 14 }} />
                  </button>
                  <button onClick={() => setDeleteConfirm(item)} title="Delete" style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center' }}>
                    <DeleteIcon sx={{ fontSize: 14 }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
