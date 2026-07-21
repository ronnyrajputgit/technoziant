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

const CMS_TABLES = {
  featured_projects: { label: 'Featured Projects', fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'subtitle', label: 'Subtitle', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'image', label: 'Image URL', type: 'image' },
    { key: 'link', label: 'Link', type: 'text' },
    { key: 'tech', label: 'Technologies (comma separated)', type: 'text' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'client', label: 'Client', type: 'text' },
    { key: 'year', label: 'Year', type: 'text' },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
  ]},
  services: { label: 'Services', fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'icon', label: 'Icon', type: 'text' },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
  ]},
  industries: { label: 'Industries', fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'icon', label: 'Icon', type: 'text' },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
  ]},
  tech_stack: { label: 'Tech Stack', fields: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'icon', label: 'Icon', type: 'text' },
    { key: 'level', label: 'Level', type: 'select', options: ['beginner', 'intermediate', 'advanced'] },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
  ]},
  testimonials: { label: 'Testimonials', fields: [
    { key: 'client_name', label: 'Client Name', type: 'text', required: true },
    { key: 'company', label: 'Company / Designation', type: 'text' },
    { key: 'feedback', label: 'Feedback Quote', type: 'textarea' },
    { key: 'rating', label: 'Rating (1-5)', type: 'number' },
    { key: 'avatar', label: 'Photo', type: 'image_upload' },
    { key: 'approved', label: 'Approved', type: 'checkbox' },
  ]},
  why_choose_us: { label: 'Why Choose Us', fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'icon', label: 'Icon', type: 'text' },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
  ]},
  team_members: { label: 'Team Members', fields: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'role', label: 'Role', type: 'text' },
    { key: 'image', label: 'Image', type: 'image_upload' },
    { key: 'bio', label: 'Bio', type: 'textarea' },
    { key: 'achievements', label: 'Achievements (comma separated)', type: 'text' },
    { key: 'stats', label: 'Stats', type: 'stats_list' },
    { key: 'linkedin', label: 'LinkedIn URL', type: 'text' },
    { key: 'twitter', label: 'Twitter URL', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
  ]},
  stats: { label: 'Stats', fields: [
    { key: 'label', label: 'Label', type: 'text', required: true },
    { key: 'value', label: 'Value', type: 'text', required: true },
    { key: 'icon', label: 'Icon', type: 'text' },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
  ]},
  awards: { label: 'Achievements', fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'year', label: 'Year', type: 'text' },
    { key: 'icon', label: 'Icon', type: 'text' },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
  ]},
  about_content: { label: 'About Content', fields: [
    { key: 'section', label: 'Section', type: 'text', required: true },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'image', label: 'Image URL', type: 'image' },
  ]},
  work_items: { label: 'Work Items', fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'client', label: 'Client', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'image_url', label: 'Image URL', type: 'image' },
    { key: 'link', label: 'Link', type: 'text' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
  ]},
  footer_content: { label: 'Footer Content', fields: [
    { key: 'section', label: 'Section', type: 'text', required: true },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'url', label: 'URL', type: 'text' },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
  ]},
}

const inputStyle = {
  width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)',
  background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '13px', outline: 'none',
  fontFamily: 'var(--font-code)', boxSizing: 'border-box',
}

function FormModal({ open, onClose, onSave, table, config, item, saving }) {
  const [form, setForm] = useState({})

  useEffect(() => {
    if (open) document.activeElement?.blur()
  }, [open])

  useEffect(() => {
    if (item) {
      const data = {}
      config.fields.forEach(f => { data[f.key] = item[f.key] ?? (f.type === 'checkbox' ? false : f.type === 'number' ? 0 : f.type === 'stats_list' ? [] : '') })
      if (table === 'team_members') {
        data.achievements = Array.isArray(item.achievements) ? item.achievements.join(', ') : (item.achievements || '')
        data.stats = Array.isArray(item.stats) ? item.stats : []
        const sl = item.social_links || {}
        data.linkedin = sl.linkedin || ''
        data.twitter = sl.twitter || ''
        data.email = sl.email || ''
      }
      setForm(data)
    } else {
      const data = {}
      config.fields.forEach(f => { data[f.key] = f.type === 'checkbox' ? false : f.type === 'number' ? 0 : '' })
      setForm(data)
    }
  }, [item, config, open])

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div className="liquid-glass" style={{ width: '100%', maxWidth: '560px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.5)', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700' }}>{item ? 'Edit' : 'Add'} {config.label.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}><CloseIcon sx={{ fontSize: 20 }} /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
            {config.fields.map(f => (
              <div key={f.key} style={{ gridColumn: f.type === 'textarea' ? '1 / -1' : undefined }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {f.label} {f.required && <span style={{ color: '#ef4444' }}>*</span>}
                </label>
                {f.type === 'textarea' ? (
                  <textarea value={form[f.key] ?? ''} onChange={e => setForm({ ...form, [f.key]: e.target.value })} required={f.required}
                    style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
                ) : f.type === 'checkbox' ? (
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '8px 0' }}>
                    <input type="checkbox" checked={!!form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.checked })}
                      style={{ width: '16px', height: '16px', accentColor: '#22c55e' }} />
                    <span style={{ fontSize: '13px', color: 'var(--text)' }}>{form[f.key] ? 'Yes' : 'No'}</span>
                  </label>
                ) : f.type === 'image' ? (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
                    <input type="text" value={form[f.key] ?? ''} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder="https://..." style={inputStyle} />
                    {form[f.key] && (
                      <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--glass-border)' }}>
                        <img src={form[f.key]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
                      </div>
                    )}
                  </div>
                ) : f.type === 'image_upload' ? (
                  <div>
                    <input type="text" value={form[f.key] ?? ''} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder="https://... or upload below" style={inputStyle} />
                    {form[f.key] && (
                      <div style={{ marginTop: '6px', width: '64px', height: '64px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                        <img src={form[f.key]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
                      </div>
                    )}
                    <div style={{ marginTop: '6px' }}>
                      <label style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '6px', border: '1px dashed var(--glass-border)', background: 'transparent', color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'var(--font-code)', cursor: 'pointer', transition: 'all 0.2s' }}>
                        📁 Upload from device
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
                          const file = e.target.files[0]
                          if (!file) return
                          if (file.size > 2 * 1024 * 1024) { alert('Max 2MB'); return }
                          const reader = new FileReader()
                          reader.onload = ev => setForm({ ...form, [f.key]: ev.target.result })
                          reader.readAsDataURL(file)
                        }} />
                      </label>
                    </div>
                  </div>
                ) : f.type === 'stats_list' ? (
                  <div>
                    {(form[f.key] || []).map((stat, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '6px' }}>
                        <input type="text" value={stat.icon || ''} onChange={e => {
                          const updated = [...(form[f.key] || [])]; updated[idx] = { ...updated[idx], icon: e.target.value }; setForm({ ...form, [f.key]: updated })
                        }} placeholder="icon" style={{ ...inputStyle, width: '48px', textAlign: 'center', flexShrink: 0 }} />
                        <input type="text" value={stat.label || ''} onChange={e => {
                          const updated = [...(form[f.key] || [])]; updated[idx] = { ...updated[idx], label: e.target.value }; setForm({ ...form, [f.key]: updated })
                        }} placeholder="label" style={{ ...inputStyle, flex: 1 }} />
                        <input type="text" value={stat.value || ''} onChange={e => {
                          const updated = [...(form[f.key] || [])]; updated[idx] = { ...updated[idx], value: e.target.value }; setForm({ ...form, [f.key]: updated })
                        }} placeholder="value" style={{ ...inputStyle, width: '80px', flexShrink: 0 }} />
                        <button type="button" onClick={() => {
                          const updated = (form[f.key] || []).filter((_, i) => i !== idx); setForm({ ...form, [f.key]: updated })
                        }} style={{ padding: '6px', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0, fontSize: '12px' }}>✕</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => {
                      const updated = [...(form[f.key] || []), { icon: '', label: '', value: '' }]; setForm({ ...form, [f.key]: updated })
                    }} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px dashed var(--glass-border)', background: 'transparent', color: 'var(--text-muted)', fontSize: '11px', cursor: 'pointer', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      + Add Stat
                    </button>
                  </div>
                ) : f.type === 'number' ? (
                  <input type="number" value={form[f.key] ?? 0} onChange={e => setForm({ ...form, [f.key]: parseInt(e.target.value) || 0 })} required={f.required} style={inputStyle} />
                ) : (
                  <input type="text" value={form[f.key] ?? ''} onChange={e => setForm({ ...form, [f.key]: e.target.value })} required={f.required} style={inputStyle} />
                )}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '20px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '12px', fontWeight: '500', cursor: 'pointer', fontFamily: 'var(--font-code)' }}>Cancel</button>
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
            <button onClick={onCancel} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: 'var(--font-code)' }}>Cancel</button>
            <button onClick={onConfirm} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'var(--font-code)' }}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CMSPage({ table }) {
  const config = CMS_TABLES[table] || { label: table, fields: [] }
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterVisible, setFilterVisible] = useState('all')
  const [formOpen, setFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [error, setError] = useState('')

  const loadItems = () => {
    setLoading(true)
    api.getContent(table).then(data => setItems(Array.isArray(data) ? data : [])).catch(e => setError(e.message)).finally(() => setLoading(false))
  }

  useEffect(() => {
    let cancelled = false
    const fetch = async () => {
      setLoading(true)
      try {
        const data = await api.getContent(table)
        if (!cancelled) setItems(Array.isArray(data) ? data : [])
      } catch (e) { if (!cancelled) setError(e.message) }
      finally { if (!cancelled) setLoading(false) }
    }
    fetch()
    return () => { cancelled = true }
  }, [table])

  const filteredItems = useMemo(() => {
    let result = items
    if (filterVisible === 'visible') result = result.filter(i => i.visible !== false)
    else if (filterVisible === 'hidden') result = result.filter(i => i.visible === false)
    if (search.trim()) {
      const q = search.toLowerCase()
      const searchFields = config.fields.filter(f => f.type === 'text' || f.type === 'textarea').map(f => f.key)
      result = result.filter(i => searchFields.some(k => String(i[k] || '').toLowerCase().includes(q)))
    }
    return [...result].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
  }, [items, filterVisible, search, config])

  const handleSave = async (formData) => {
    setSaving(true)
    setError('')
    try {
      let dataToSend = { ...formData }
      if (table === 'team_members') {
        if (typeof dataToSend.achievements === 'string') {
          dataToSend.achievements = dataToSend.achievements.split(',').map(s => s.trim()).filter(Boolean)
        }
        dataToSend.stats = (dataToSend.stats || []).filter(s => s.label || s.value)
        dataToSend.social_links = {
          linkedin: dataToSend.linkedin || '',
          twitter: dataToSend.twitter || '',
          email: dataToSend.email || ''
        }
        delete dataToSend.linkedin
        delete dataToSend.twitter
        delete dataToSend.email
      }
      if (editingItem) {
        const updated = await api.updateContent(table, editingItem.id, dataToSend)
        setItems(items.map(i => i.id === editingItem.id ? updated : i))
      } else {
        const created = await api.createContent(table, dataToSend)
        setItems([...items, created])
      }
      setFormOpen(false)
      setEditingItem(null)
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteConfirm) return
    try {
      await api.deleteContent(table, deleteConfirm.id)
      setItems(items.filter(i => i.id !== deleteConfirm.id))
      setDeleteConfirm(null)
    } catch (e) {
      setError(e.message)
    }
  }

  const toggleVisible = async (item) => {
    try {
      const updated = await api.updateContent(table, item.id, { visible: !item.visible })
      setItems(items.map(i => i.id === item.id ? updated : i))
    } catch (e) {
      setError(e.message)
    }
  }

  const getPreview = (item) => {
    const field = config.fields.find(f => f.type === 'textarea')
    if (field && item[field.key]) return String(item[field.key]).slice(0, 80)
    const descField = config.fields.find(f => f.key === 'description' || f.key === 'bio' || f.key === 'feedback')
    if (descField && item[descField.key]) return String(item[descField.key]).slice(0, 80)
    return ''
  }

  const getNameField = (item) => {
    const field = config.fields.find(f => f.key === 'title' || f.key === 'name' || f.key === 'label' || f.key === 'client_name' || f.key === 'section' || f.key === 'key')
    if (field && item[field.key]) return item[field.key]
    if (item.title) return item.title
    if (item.name) return item.name
    return `Item #${item.id}`
  }

  return (
    <div>
      <FormModal open={formOpen} onClose={() => { setFormOpen(false); setEditingItem(null) }} onSave={handleSave} table={table} config={config} item={editingItem} saving={saving} />
      <ConfirmDialog open={!!deleteConfirm} title="Delete Item?" message={`"${getNameField(deleteConfirm || {})}" will be permanently deleted.`} onConfirm={handleDelete} onCancel={() => setDeleteConfirm(null)} />

      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)' }}>content management</div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: '700' }}>{config.label.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h1>
      </div>

      {error && (
        <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: '12px', fontFamily: 'var(--font-code)', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{error}</span>
          <button onClick={() => setError('')} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}><CloseIcon sx={{ fontSize: 16 }} /></button>
        </div>
      )}

      {/* Search + Filter Bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 200px' }}>
          <SearchIcon sx={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: 'var(--text-muted)' }} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${config.label.toLowerCase()}...`}
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
          <AddIcon sx={{ fontSize: 16 }} /> Add {config.label.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).split(' ').pop()}
        </button>
      </div>

      {/* Items Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Loading...</div>
      ) : filteredItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>
          No items found. {items.length === 0 ? 'Click "Add" to create one.' : 'Try adjusting your search.'}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '8px' }}>
          {filteredItems.map((item, idx) => (
            <div key={item.id} className="liquid-glass" style={{ padding: '10px 12px', borderRadius: '8px', transition: 'all 0.15s', position: 'relative' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              {item.visible === false && (
                <div style={{ position: 'absolute', top: '6px', right: '6px' }}>
                  <span style={{ fontSize: '8px', padding: '1px 6px', borderRadius: '100px', background: 'rgba(245,158,11,0.15)', color: '#f59e0b', fontWeight: '600', fontFamily: 'var(--font-code)' }}>Hidden</span>
                </div>
              )}
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text)', marginBottom: '2px', paddingRight: item.visible === false ? '50px' : 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{getNameField(item)}</div>
              {getPreview(item) && <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{getPreview(item)}</div>}
              <div style={{ display: 'flex', gap: '3px', justifyContent: 'flex-end' }}>
                <button onClick={() => toggleVisible(item)} title={item.visible === false ? 'Show' : 'Hide'} style={{ padding: '3px 6px', borderRadius: '4px', background: item.visible === false ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)', color: item.visible === false ? '#f59e0b' : '#22c55e', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center' }}>
                  {item.visible === false ? <VisibilityOffIcon sx={{ fontSize: 12 }} /> : <VisibilityIcon sx={{ fontSize: 12 }} />}
                </button>
                <button onClick={() => { setEditingItem(item); setFormOpen(true) }} title="Edit" style={{ padding: '3px 6px', borderRadius: '4px', background: 'rgba(79,142,255,0.1)', color: '#4f8eff', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center' }}>
                  <EditIcon sx={{ fontSize: 12 }} />
                </button>
                <button onClick={() => setDeleteConfirm(item)} title="Delete" style={{ padding: '3px 6px', borderRadius: '4px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center' }}>
                  <DeleteIcon sx={{ fontSize: 12 }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
