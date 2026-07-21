import { useState, useEffect, useMemo } from 'react'
import { api } from '../../utils/api'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import MailIcon from '@mui/icons-material/Mail'
import PhoneIcon from '@mui/icons-material/Phone'
import BusinessIcon from '@mui/icons-material/Business'
import SendIcon from '@mui/icons-material/Send'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'
import ReplyIcon from '@mui/icons-material/Reply'
import ArchiveIcon from '@mui/icons-material/Archive'
import PublicIcon from '@mui/icons-material/Public'
import WifiIcon from '@mui/icons-material/Wifi'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import PlaceIcon from '@mui/icons-material/Place'

const OFFICE_LAT = 24.4764
const OFFICE_LON = 86.6978

function calcDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return Math.round(R * c)
}

const ITEMS_PER_PAGE = 8

function ReplyModal({ open, onClose, inquiry, onSend }) {
  const [reply, setReply] = useState('')
  useEffect(() => {
    if (inquiry) setReply(`Hi ${inquiry.name},\n\nThank you for reaching out to us. We have received your inquiry and will get back to you shortly.\n\nBest regards,\nTechnoziant Team`)
  }, [inquiry])
  if (!open || !inquiry) return null
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div className="liquid-glass" style={{ width: '100%', maxWidth: '520px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.5)', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div><h3 style={{ fontSize: '16px', fontWeight: '700' }}>Reply to {inquiry.name}</h3><div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>{inquiry.email}</div></div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}><CloseIcon sx={{ fontSize: 20 }} /></button>
        </div>
        <div style={{ padding: '16px 20px', flex: 1, overflowY: 'auto' }}>
          <div style={{ padding: '12px', borderRadius: '8px', marginBottom: '14px', borderLeft: '3px solid #4f8eff', background: 'rgba(79,142,255,0.05)' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)', marginBottom: '6px', textTransform: 'uppercase' }}>Original Message</div>
            <div style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{inquiry.message}</div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'var(--font-code)', textTransform: 'uppercase' }}>Your Reply</label>
            <textarea value={reply} onChange={e => setReply(e.target.value)} rows={6} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '13px', outline: 'none', fontFamily: 'var(--font-code)', resize: 'vertical', lineHeight: 1.6, boxSizing: 'border-box' }} />
          </div>
        </div>
        <div style={{ padding: '14px 20px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <a href={`mailto:${inquiry.email}?subject=RE: Your inquiry to Technoziant&body=${encodeURIComponent(reply)}`} onClick={() => onSend(inquiry)} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #4f8eff, #2563eb)', color: '#fff', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}><SendIcon sx={{ fontSize: 14 }} /> Open Email</a>
          <button onClick={onClose} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--font-code)' }}>Close</button>
        </div>
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
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}><DeleteIcon sx={{ fontSize: 24, color: '#ef4444' }} /></div>
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

export function InquiriesPage() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [replyItem, setReplyItem] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [expandedId, setExpandedId] = useState(null)

  const loadData = () => { setLoading(true); api.getContent('contact_inquiries').then(data => setInquiries(Array.isArray(data) ? data : [])).catch(e => setError(e.message)).finally(() => setLoading(false)) }
  useEffect(() => { loadData() }, [])

  const filtered = useMemo(() => {
    let result = inquiries
    if (filter === 'new') result = result.filter(i => i.status === 'new')
    else if (filter === 'replied') result = result.filter(i => i.status === 'replied')
    else if (filter === 'archived') result = result.filter(i => i.status === 'archived')
    if (search.trim()) { const q = search.toLowerCase(); result = result.filter(i => (i.name || '').toLowerCase().includes(q) || (i.email || '').toLowerCase().includes(q) || (i.message || '').toLowerCase().includes(q) || (i.location || '').toLowerCase().includes(q)) }
    return result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  }, [inquiries, filter, search])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
  useEffect(() => { setPage(1) }, [search, filter])

  const counts = { total: inquiries.length, new: inquiries.filter(i => i.status === 'new').length, replied: inquiries.filter(i => i.status === 'replied').length, archived: inquiries.filter(i => i.status === 'archived').length }

  const handleStatus = async (id, status) => { try { await api.updateContent('contact_inquiries', id, { status }); loadData(); setSuccess(`Marked as ${status}`); setTimeout(() => setSuccess(''), 2000) } catch (e) { setError(e.message) } }
  const handleReplySend = async (inquiry) => { try { await api.updateContent('contact_inquiries', inquiry.id, { status: 'replied', replied_at: new Date().toLocaleString() }); loadData(); setReplyItem(null); setSuccess('Reply sent!'); setTimeout(() => setSuccess(''), 2000) } catch (e) { setError(e.message) } }
  const handleDelete = async () => { if (!deleteConfirm) return; try { await api.deleteContent('contact_inquiries', deleteConfirm.id); setDeleteConfirm(null); loadData() } catch (e) { setError(e.message) } }

  const getStatusStyle = (s) => ({ new: { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b', label: 'New' }, replied: { bg: 'rgba(34,197,94,0.12)', color: '#22c55e', label: 'Replied' }, archived: { bg: 'rgba(148,163,184,0.12)', color: '#94a3b8', label: 'Archived' } }[s] || { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b', label: 'New' })

  if (loading) return <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Loading...</div>

  return (
    <div>
      <ReplyModal open={!!replyItem} onClose={() => setReplyItem(null)} inquiry={replyItem} onSend={handleReplySend} />
      <ConfirmDialog open={!!deleteConfirm} title="Delete Inquiry?" message="This inquiry will be permanently deleted." onConfirm={handleDelete} onCancel={() => setDeleteConfirm(null)} />
      <div style={{ marginBottom: '20px' }}><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)' }}>inquiries</div><h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: '700' }}>Contact Inquiries</h1></div>
      {error && <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: '12px', fontFamily: 'var(--font-code)', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span>{error}</span><button onClick={() => setError('')} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}><CloseIcon sx={{ fontSize: 16 }} /></button></div>}
      {success && <div style={{ padding: '8px 14px', borderRadius: '8px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e', fontSize: '12px', fontFamily: 'var(--font-code)', marginBottom: '12px' }}>{success}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '6px', marginBottom: '14px' }}>
        {[{ label: 'Total', value: counts.total, color: '#4f8eff' }, { label: 'New', value: counts.new, color: '#f59e0b' }, { label: 'Replied', value: counts.replied, color: '#22c55e' }, { label: 'Archived', value: counts.archived, color: '#94a3b8' }].map((s, i) => (
          <div key={i} className="liquid-glass" style={{ padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: '700', color: s.color, fontFamily: 'var(--font-h)' }}>{s.value}</div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 200px' }}>
          <SearchIcon sx={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: 'var(--text-muted)' }} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email, message, location..." style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '12px', outline: 'none', fontFamily: 'var(--font-code)', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {['all', 'new', 'replied', 'archived'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '5px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '500', cursor: 'pointer', fontFamily: 'var(--font-code)', textTransform: 'capitalize', border: '1px solid var(--glass-border)', background: filter === f ? 'rgba(34,197,94,0.15)' : 'transparent', color: filter === f ? '#22c55e' : 'var(--text-muted)' }}>{f} {f === 'new' && counts.new > 0 ? `(${counts.new})` : ''}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="liquid-glass" style={{ padding: '32px', borderRadius: '10px', textAlign: 'center' }}><MailIcon sx={{ fontSize: 32, color: 'var(--text-muted)', opacity: 0.3, mb: 1 }} /><div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)', marginBottom: '4px' }}>No inquiries</div><div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>{inquiries.length === 0 ? 'No one has submitted a contact form yet.' : 'Try adjusting your search.'}</div></div>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {paginated.map(inq => {
              const ss = getStatusStyle(inq.status)
              const expanded = expandedId === inq.id
              return (
                <div key={inq.id} className="liquid-glass" style={{ borderRadius: '10px', overflow: 'hidden', borderLeft: `3px solid ${ss.color}`, transition: 'all 0.2s' }}>
                  <div style={{ padding: '12px 14px', cursor: 'pointer' }} onClick={() => setExpandedId(expanded ? null : inq.id)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: `linear-gradient(135deg, ${ss.color}30, ${ss.color}10)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: '700', color: ss.color, flexShrink: 0, border: `1.5px solid ${ss.color}30` }}>
                        {(inq.name || '?')[0].toUpperCase()}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>{inq.name}</span>
                          <span style={{ fontSize: '9px', padding: '1px 7px', borderRadius: '100px', background: ss.bg, color: ss.color, fontWeight: '600', fontFamily: 'var(--font-code)' }}>{ss.label}</span>
                          {inq.service && <span style={{ fontSize: '9px', padding: '1px 6px', borderRadius: '100px', background: 'rgba(79,142,255,0.1)', color: '#4f8eff', fontFamily: 'var(--font-code)' }}>{inq.service}</span>}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MailIcon sx={{ fontSize: 10 }} /> {inq.email}</span>
                          {inq.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><PhoneIcon sx={{ fontSize: 10 }} /> {inq.phone}</span>}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)', marginTop: '2px', opacity: 0.7, flexWrap: 'wrap' }}>
                          {inq.location ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><PublicIcon sx={{ fontSize: 9 }} /> {inq.location}</span>
                          ) : inq.ip_address && inq.ip_address !== '::1' && inq.ip_address !== '127.0.0.1' ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><WifiIcon sx={{ fontSize: 9 }} /> {inq.ip_address}</span>
                          ) : null}
                          {inq.latitude && inq.longitude && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#06d6a0' }}>
                              <PlaceIcon sx={{ fontSize: 9 }} />
                              {(() => { const d = calcDistance(OFFICE_LAT, OFFICE_LON, parseFloat(inq.latitude), parseFloat(inq.longitude)); return d !== null ? `~${d} km away` : '' })()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>{new Date(inq.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</div>
                        <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>{new Date(inq.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
                      </div>
                    </div>
                  </div>

                  {expanded && (
                    <div style={{ padding: '0 14px 12px', borderTop: '1px solid var(--glass-border)' }}>
                      <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', margin: '10px 0', whiteSpace: 'pre-wrap', fontSize: '12px', lineHeight: 1.6, color: 'var(--text-muted)' }}>{inq.message}</div>
                      <div style={{ display: 'flex', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                        {inq.company && <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}><BusinessIcon sx={{ fontSize: 12, color: '#a855f7' }} /> {inq.company}</div>}
                        {inq.location && <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}><PublicIcon sx={{ fontSize: 12, color: '#06d6a0' }} /> {inq.location}</div>}
                        {inq.ip_address && <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}><WifiIcon sx={{ fontSize: 12, color: '#4f8eff' }} /> {inq.ip_address}</div>}
                        {inq.latitude && inq.longitude && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#06d6a0', fontFamily: 'var(--font-code)', fontWeight: '500' }}>
                            <PlaceIcon sx={{ fontSize: 12 }} />
                            ~{calcDistance(OFFICE_LAT, OFFICE_LON, parseFloat(inq.latitude), parseFloat(inq.longitude))} km from office
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                        <button onClick={() => setReplyItem(inq)} style={{ padding: '4px 10px', borderRadius: '6px', border: 'none', background: 'rgba(79,142,255,0.1)', color: '#4f8eff', cursor: 'pointer', fontSize: '10px', fontFamily: 'var(--font-code)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}><ReplyIcon sx={{ fontSize: 12 }} /> Reply</button>
                        {inq.status === 'new' && <button onClick={() => handleStatus(inq.id, 'replied')} style={{ padding: '4px 10px', borderRadius: '6px', border: 'none', background: 'rgba(34,197,94,0.1)', color: '#22c55e', cursor: 'pointer', fontSize: '10px', fontFamily: 'var(--font-code)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}><MarkEmailReadIcon sx={{ fontSize: 12 }} /> Read</button>}
                        {inq.status !== 'archived' && <button onClick={() => handleStatus(inq.id, 'archived')} style={{ padding: '4px 10px', borderRadius: '6px', border: 'none', background: 'rgba(148,163,184,0.1)', color: '#94a3b8', cursor: 'pointer', fontSize: '10px', fontFamily: 'var(--font-code)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}><ArchiveIcon sx={{ fontSize: 12 }} /> Archive</button>}
                        <button onClick={() => setDeleteConfirm(inq)} style={{ padding: '4px 10px', borderRadius: '6px', border: 'none', background: 'rgba(239,68,68,0.1)', color: '#ef4444', cursor: 'pointer', fontSize: '10px', fontFamily: 'var(--font-code)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}><DeleteIcon sx={{ fontSize: 12 }} /></button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginTop: '16px' }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'transparent', color: page === 1 ? 'var(--text-muted)' : 'var(--text)', cursor: page === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', opacity: page === 1 ? 0.4 : 1 }}><ChevronLeftIcon sx={{ fontSize: 14 }} /></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)} style={{ padding: '5px 10px', borderRadius: '6px', border: 'none', fontSize: '11px', fontWeight: '600', fontFamily: 'var(--font-code)', cursor: 'pointer', background: page === p ? 'rgba(34,197,94,0.15)' : 'transparent', color: page === p ? '#22c55e' : 'var(--text-muted)', minWidth: '28px' }}>{p}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'transparent', color: page === totalPages ? 'var(--text-muted)' : 'var(--text)', cursor: page === totalPages ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', opacity: page === totalPages ? 0.4 : 1 }}><ChevronRightIcon sx={{ fontSize: 14 }} /></button>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)', marginLeft: '6px' }}>{filtered.length} inquiries</span>
            </div>
          )}
        </>
      )}
    </div>
  )
}
