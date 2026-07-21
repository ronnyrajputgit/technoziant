import { useState, useEffect, useMemo } from 'react'
import { api } from '../../utils/api'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import SaveIcon from '@mui/icons-material/Save'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ImageIcon from '@mui/icons-material/Image'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import RemoveIcon from '@mui/icons-material/Remove'

const ITEMS_PER_PAGE = 8
const projectColors = ['#4f8eff', '#a855f7', '#06d6a0', '#f472b6', '#fbbf24', '#ef4444', '#22d3ee', '#10b981']

function FormModal({ open, onClose, onSave, item, saving }) {
  const [form, setForm] = useState({
    title: '', subtitle: '', description: '', image: '', link: '', tech: '',
    category: 'web', client: '', year: '', duration: '', team: '', result: '',
    logo: '', images: [], visible: true, display_order: 0
  })
  const [newImage, setNewImage] = useState('')

  useEffect(() => {
    if (open) document.activeElement?.blur()
  }, [open])

  useEffect(() => {
    if (item) {
      setForm({
        title: item.title || '',
        subtitle: item.subtitle || '',
        description: item.description || '',
        image: item.image || '',
        link: item.link || '',
        tech: Array.isArray(item.tech) ? item.tech.join(', ') : (item.tech || ''),
        category: item.category || 'web',
        client: item.client || '',
        year: item.year || '',
        duration: item.duration || '',
        team: item.team || '',
        result: item.result || '',
        logo: item.logo || '',
        images: Array.isArray(item.images) ? item.images : [],
        visible: item.visible !== false,
        display_order: item.display_order || 0
      })
    } else {
      setForm({
        title: '', subtitle: '', description: '', image: '', link: '', tech: '',
        category: 'web', client: '', year: '', duration: '', team: '', result: '',
        logo: '', images: [], visible: true, display_order: 0
      })
    }
    setNewImage('')
  }, [item, open])

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      ...form,
      tech: form.tech.split(',').map(t => t.trim()).filter(Boolean),
    }
    onSave(data)
  }

  const addImage = () => {
    if (newImage.trim()) {
      setForm({ ...form, images: [...form.images, newImage.trim()] })
      setNewImage('')
    }
  }

  const removeImage = (idx) => {
    setForm({ ...form, images: form.images.filter((_, i) => i !== idx) })
  }

  const inputStyle = {
    width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)',
    background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '13px', outline: 'none',
    fontFamily: 'var(--font-code)', boxSizing: 'border-box',
  }

  const labelStyle = {
    display: 'block', fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)',
    marginBottom: '4px', fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.05em'
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div className="liquid-glass" style={{ width: '100%', maxWidth: '640px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.5)', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700' }}>{item ? 'Edit' : 'Add'} Project</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}><CloseIcon sx={{ fontSize: 20 }} /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          {/* Basic Info */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: '600', color: '#22c55e', marginBottom: '10px', fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Basic Info</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Title *</label>
                <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required placeholder="e.g. Echo Social" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Subtitle</label>
                <input type="text" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} placeholder="e.g. Community Platform" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="web">Web</option>
                  <option value="mobile">Mobile</option>
                  <option value="design">Design</option>
                  <option value="ai">AI/ML</option>
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Brief description of the project..." rows={3} style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }} />
              </div>
            </div>
          </div>

          {/* Images */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: '600', color: '#4f8eff', marginBottom: '10px', fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Images</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Cover Image *</label>
                <input type="text" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." required style={inputStyle} />
                {form.image && (
                  <div style={{ marginTop: '6px', width: '100%', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                    <img src={form.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
                  </div>
                )}
              </div>
              <div>
                <label style={labelStyle}>Logo</label>
                <input type="text" value={form.logo} onChange={e => setForm({ ...form, logo: e.target.value })} placeholder="Logo URL..." style={inputStyle} />
                {form.logo && (
                  <div style={{ marginTop: '6px', width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={form.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={e => e.target.style.display = 'none'} />
                  </div>
                )}
              </div>
            </div>
            <div style={{ marginTop: '10px' }}>
              <label style={labelStyle}>Gallery Images</label>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                <input type="text" value={newImage} onChange={e => setNewImage(e.target.value)} placeholder="Add image URL..." style={{ ...inputStyle, flex: 1 }} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addImage() } }} />
                <button type="button" onClick={addImage} style={{ padding: '8px 12px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #4f8eff, #2563eb)', color: '#fff', fontSize: '11px', fontWeight: '600', cursor: 'pointer', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                  <AddPhotoAlternateIcon sx={{ fontSize: 14 }} /> Add
                </button>
              </div>
              {form.images.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {form.images.map((img, idx) => (
                    <div key={idx} style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
                      <button type="button" onClick={() => removeImage(idx)} style={{ position: 'absolute', top: '2px', right: '2px', width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(239,68,68,0.9)', border: 'none', color: '#fff', fontSize: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <RemoveIcon sx={{ fontSize: 10 }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {form.images.length === 0 && (
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)', opacity: 0.6 }}>No gallery images added yet</div>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: '600', color: '#a855f7', marginBottom: '10px', fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Project Details</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Client</label>
                <input type="text" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} placeholder="e.g. Echo Inc." style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Year</label>
                <input type="text" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} placeholder="2024" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Duration</label>
                <input type="text" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="5 months" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Team</label>
                <input type="text" value={form.team} onChange={e => setForm({ ...form, team: e.target.value })} placeholder="7 members" style={inputStyle} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Result</label>
                <input type="text" value={form.result} onChange={e => setForm({ ...form, result: e.target.value })} placeholder="e.g. 2M+ active users" style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Tech & Settings */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: '600', color: '#fbbf24', marginBottom: '10px', fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Tech & Settings</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Technologies (comma separated)</label>
                <input type="text" value={form.tech} onChange={e => setForm({ ...form, tech: e.target.value })} placeholder="React, Node.js, PostgreSQL" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Link</label>
                <input type="text" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="https://..." style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Sort Order</label>
                <input type="number" value={form.display_order} onChange={e => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Visible</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '8px 0' }}>
                  <input type="checkbox" checked={form.visible} onChange={e => setForm({ ...form, visible: e.target.checked })} style={{ width: '16px', height: '16px', accentColor: '#22c55e' }} />
                  <span style={{ fontSize: '12px', color: 'var(--text)' }}>{form.visible ? 'Published' : 'Hidden'}</span>
                </label>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '20px', justifyContent: 'flex-end', borderTop: '1px solid var(--glass-border)', paddingTop: '16px' }}>
            <button type="button" onClick={onClose} style={{ padding: '9px 18px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '12px', fontWeight: '500', cursor: 'pointer', fontFamily: 'var(--font-code)' }}>Cancel</button>
            <button type="submit" disabled={saving} style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '6px', opacity: saving ? 0.7 : 1 }}>
              <SaveIcon sx={{ fontSize: 14 }} /> {saving ? 'Saving...' : 'Save Project'}
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
            <button onClick={onCancel} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: 'var(--font-code)' }}>Cancel</button>
            <button onClick={onConfirm} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'var(--font-code)' }}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FeaturedProjectsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterVisible, setFilterVisible] = useState('all')
  const [formOpen, setFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    api.getContent('featured_projects').then(data => setItems(Array.isArray(data) ? data : [])).catch(e => setError(e.message)).finally(() => setLoading(false))
  }, [])

  const filteredItems = useMemo(() => {
    let result = items
    if (filterVisible === 'visible') result = result.filter(i => i.visible !== false)
    else if (filterVisible === 'hidden') result = result.filter(i => i.visible === false)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(i => (i.title || '').toLowerCase().includes(q) || (i.description || '').toLowerCase().includes(q) || (i.client || '').toLowerCase().includes(q))
    }
    const seen = new Set()
    return [...result].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)).filter(item => {
      const key = item.title?.toLowerCase().trim()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }, [items, filterVisible, search])

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  const paginatedItems = filteredItems.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  useEffect(() => { setPage(1) }, [search, filterVisible])

  const handleSave = async (formData) => {
    setSaving(true)
    setError('')
    try {
      if (editingItem) {
        const updated = await api.updateContent('featured_projects', editingItem.id, formData)
        setItems(items.map(i => i.id === editingItem.id ? updated : i))
      } else {
        const created = await api.createContent('featured_projects', formData)
        setItems([...items, created])
      }
      setFormOpen(false)
      setEditingItem(null)
    } catch (e) { setError(e.message) }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!deleteConfirm) return
    try {
      await api.deleteContent('featured_projects', deleteConfirm.id)
      setItems(items.filter(i => i.id !== deleteConfirm.id))
      setDeleteConfirm(null)
    } catch (e) { setError(e.message) }
  }

  const toggleVisible = async (item) => {
    try {
      const updated = await api.updateContent('featured_projects', item.id, { visible: !item.visible })
      setItems(items.map(i => i.id === item.id ? updated : i))
    } catch (e) { setError(e.message) }
  }

  return (
    <div>
      <FormModal open={formOpen} onClose={() => { setFormOpen(false); setEditingItem(null) }} onSave={handleSave} item={editingItem} saving={saving} />
      <ConfirmDialog open={!!deleteConfirm} title="Delete Project?" message={`"${deleteConfirm?.title}" will be permanently deleted.`} onConfirm={handleDelete} onCancel={() => setDeleteConfirm(null)} />

      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)' }}>content management</div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: '700' }}>Featured Projects</h1>
      </div>

      {error && (
        <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: '12px', fontFamily: 'var(--font-code)', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{error}</span>
          <button onClick={() => setError('')} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}><CloseIcon sx={{ fontSize: 16 }} /></button>
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 200px' }}>
          <SearchIcon sx={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: 'var(--text-muted)' }} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..."
            style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '12px', outline: 'none', fontFamily: 'var(--font-code)', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {['all', 'visible', 'hidden'].map(f => (
            <button key={f} onClick={() => setFilterVisible(f)} style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '500', cursor: 'pointer', fontFamily: 'var(--font-code)', textTransform: 'capitalize', border: '1px solid var(--glass-border)', background: filterVisible === f ? 'rgba(34,197,94,0.15)' : 'transparent', color: filterVisible === f ? '#22c55e' : 'var(--text-muted)' }}>
              {f}
            </button>
          ))}
        </div>
        <button onClick={() => { setEditingItem(null); setFormOpen(true) }} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', fontSize: '12px', fontWeight: '600', color: '#fff', cursor: 'pointer', background: 'linear-gradient(135deg, #22c55e, #16a34a)', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
          <AddIcon sx={{ fontSize: 16 }} /> Add Project
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Loading...</div>
      ) : paginatedItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>
          No projects found. {items.length === 0 ? 'Click "Add Project" to create one.' : 'Try adjusting your search.'}
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
            {paginatedItems.map((item, idx) => {
              const color = projectColors[(item.id || idx) % projectColors.length]
              return (
                <div key={item.id} className="liquid-glass" style={{ borderRadius: '10px', overflow: 'hidden', transition: 'all 0.2s', position: 'relative' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                  {item.image ? (
                    <div style={{ height: '100px', overflow: 'hidden', position: 'relative' }}>
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${color}30, transparent)` }} />
                      {item.logo && (
                        <div style={{ position: 'absolute', top: '6px', left: '6px', width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                          <img src={item.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                      )}
                      <div style={{ position: 'absolute', top: '6px', right: '6px', display: 'flex', gap: '3px' }}>
                        {item.visible === false && <span style={{ fontSize: '8px', padding: '1px 6px', borderRadius: '100px', background: 'rgba(245,158,11,0.9)', color: '#fff', fontWeight: '600', fontFamily: 'var(--font-code)' }}>Hidden</span>}
                        {item.images && item.images.length > 0 && (
                          <span style={{ fontSize: '8px', padding: '1px 6px', borderRadius: '100px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', color: '#fff', fontWeight: '600', fontFamily: 'var(--font-code)' }}>
                            +{item.images.length}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div style={{ height: '70px', background: `linear-gradient(135deg, ${color}15, ${color}05)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      <ImageIcon sx={{ fontSize: 28, color, opacity: 0.3 }} />
                      {item.visible === false && (
                        <div style={{ position: 'absolute', top: '6px', right: '6px' }}>
                          <span style={{ fontSize: '8px', padding: '1px 6px', borderRadius: '100px', background: 'rgba(245,158,11,0.9)', color: '#fff', fontWeight: '600', fontFamily: 'var(--font-code)' }}>Hidden</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div style={{ padding: '8px 10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px' }}>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <h3 style={{ fontSize: '12px', fontWeight: '600', lineHeight: 1.2, marginBottom: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h3>
                        {item.subtitle && <p style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.subtitle}</p>}
                      </div>
                      {item.year && <span style={{ fontSize: '8px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)', flexShrink: 0 }}>{item.year}</span>}
                    </div>
                    {item.client && <div style={{ fontSize: '9px', color, fontFamily: 'var(--font-code)', marginBottom: '4px' }}>{item.client}</div>}
                    <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap', marginBottom: '6px' }}>
                      {(Array.isArray(item.tech) ? item.tech : []).slice(0, 2).map((t, i) => (
                        <span key={i} className="liquid-glass" style={{ padding: '1px 5px', fontSize: '7px', fontWeight: '500', borderRadius: '3px', color, fontFamily: 'var(--font-code)' }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '3px', justifyContent: 'flex-end' }}>
                      <button onClick={() => toggleVisible(item)} title={item.visible === false ? 'Show' : 'Hide'} style={{ padding: '3px 5px', borderRadius: '4px', background: item.visible === false ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)', color: item.visible === false ? '#f59e0b' : '#22c55e', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center' }}>
                        {item.visible === false ? <VisibilityOffIcon sx={{ fontSize: 12 }} /> : <VisibilityIcon sx={{ fontSize: 12 }} />}
                      </button>
                      <button onClick={() => { setEditingItem(item); setFormOpen(true) }} title="Edit" style={{ padding: '3px 5px', borderRadius: '4px', background: 'rgba(79,142,255,0.1)', color: '#4f8eff', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center' }}>
                        <EditIcon sx={{ fontSize: 12 }} />
                      </button>
                      <button onClick={() => setDeleteConfirm(item)} title="Delete" style={{ padding: '3px 5px', borderRadius: '4px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center' }}>
                        <DeleteIcon sx={{ fontSize: 12 }} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '20px' }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'transparent', color: page === 1 ? 'var(--text-muted)' : 'var(--text)', cursor: page === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', opacity: page === 1 ? 0.4 : 1 }}>
                <ChevronLeftIcon sx={{ fontSize: 16 }} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)} style={{ padding: '6px 10px', borderRadius: '6px', border: 'none', fontSize: '11px', fontWeight: '600', fontFamily: 'var(--font-code)', cursor: 'pointer', background: page === p ? 'rgba(34,197,94,0.15)' : 'transparent', color: page === p ? '#22c55e' : 'var(--text-muted)' }}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'transparent', color: page === totalPages ? 'var(--text-muted)' : 'var(--text)', cursor: page === totalPages ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', opacity: page === totalPages ? 0.4 : 1 }}>
                <ChevronRightIcon sx={{ fontSize: 16 }} />
              </button>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)', marginLeft: '8px' }}>{filteredItems.length} project{filteredItems.length !== 1 ? 's' : ''}</span>
            </div>
          )}
        </>
      )}
    </div>
  )
}
