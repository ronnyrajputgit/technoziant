import { useState, useEffect, useMemo } from 'react'
import { api } from '../../utils/api'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

const CMS_TABLES = {
  featured_projects: { label: 'Featured Projects', fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'image_url', label: 'Image URL', type: 'image' },
    { key: 'link', label: 'Link', type: 'text' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
    { key: 'display_order', label: 'Sort Order', type: 'number' },
  ]},
  services: { label: 'Services', fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'slug', label: 'Slug', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'short_desc', label: 'Short Description', type: 'textarea' },
    { key: 'icon', label: 'Icon', type: 'text' },
    { key: 'image_url', label: 'Image URL', type: 'image' },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
    { key: 'display_order', label: 'Sort Order', type: 'number' },
  ]},
  industries: { label: 'Industries', fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'slug', label: 'Slug', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'image_url', label: 'Image URL', type: 'image' },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
    { key: 'display_order', label: 'Sort Order', type: 'number' },
  ]},
  tech_stack: { label: 'Tech Stack', fields: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'icon_url', label: 'Icon URL', type: 'image' },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
    { key: 'display_order', label: 'Sort Order', type: 'number' },
  ]},
  testimonials: { label: 'Testimonials', fields: [
    { key: 'client_name', label: 'Client Name', type: 'text', required: true },
    { key: 'company', label: 'Company', type: 'text' },
    { key: 'content', label: 'Content', type: 'textarea', required: true },
    { key: 'avatar_url', label: 'Avatar URL', type: 'image' },
    { key: 'rating', label: 'Rating', type: 'number' },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
    { key: 'display_order', label: 'Sort Order', type: 'number' },
  ]},
  why_choose_us: { label: 'Why Choose Us', fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'icon', label: 'Icon', type: 'text' },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
    { key: 'display_order', label: 'Sort Order', type: 'number' },
  ]},
  team_members: { label: 'Team Members', fields: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'role', label: 'Role', type: 'text' },
    { key: 'bio', label: 'Bio', type: 'textarea' },
    { key: 'avatar_url', label: 'Avatar URL', type: 'image' },
    { key: 'linkedin', label: 'LinkedIn', type: 'text' },
    { key: 'twitter', label: 'Twitter', type: 'text' },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
    { key: 'display_order', label: 'Sort Order', type: 'number' },
  ]},
  stats: { label: 'Stats', fields: [
    { key: 'label', label: 'Label', type: 'text', required: true },
    { key: 'value', label: 'Value', type: 'text', required: true },
    { key: 'suffix', label: 'Suffix', type: 'text' },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
    { key: 'display_order', label: 'Sort Order', type: 'number' },
  ]},
  awards: { label: 'Awards', fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'organization', label: 'Organization', type: 'text' },
    { key: 'year', label: 'Year', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'image_url', label: 'Image URL', type: 'image' },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
    { key: 'display_order', label: 'Sort Order', type: 'number' },
  ]},
  about_content: { label: 'About Content', fields: [
    { key: 'section', label: 'Section', type: 'text', required: true },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'content', label: 'Content', type: 'textarea' },
    { key: 'image_url', label: 'Image URL', type: 'image' },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
    { key: 'display_order', label: 'Sort Order', type: 'number' },
  ]},
  work_items: { label: 'Work Items', fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'client', label: 'Client', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'image_url', label: 'Image URL', type: 'image' },
    { key: 'link', label: 'Link', type: 'text' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
    { key: 'display_order', label: 'Sort Order', type: 'number' },
  ]},
  footer_content: { label: 'Footer Content', fields: [
    { key: 'section', label: 'Section', type: 'text', required: true },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'content', label: 'Content', type: 'textarea' },
    { key: 'link', label: 'Link', type: 'text' },
    { key: 'visible', label: 'Visible', type: 'checkbox' },
    { key: 'display_order', label: 'Sort Order', type: 'number' },
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
    if (item) {
      const data = {}
      config.fields.forEach(f => { data[f.key] = item[f.key] ?? (f.type === 'checkbox' ? false : f.type === 'number' ? 0 : '') })
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
    api.getContent(table).then(setItems).catch(e => setError(e.message)).finally(() => setLoading(false))
  }

  useEffect(() => { loadItems() }, [table])

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
      if (editingItem) {
        const updated = await api.updateContent(table, editingItem.id, formData)
        setItems(items.map(i => i.id === editingItem.id ? updated : i))
      } else {
        const created = await api.createContent(table, formData)
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

  const moveItem = async (item, direction) => {
    const idx = items.findIndex(i => i.id === item.id)
    if (idx === -1) return
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= items.length) return
    const a = items[idx], b = items[swapIdx]
    const aOrder = a.display_order ?? 0, bOrder = b.display_order ?? 0
    try {
      await api.updateContent(table, a.id, { display_order: bOrder })
      await api.updateContent(table, b.id, { display_order: aOrder })
      loadItems()
    } catch (e) {
      setError(e.message)
    }
  }

  const getPreview = (item) => {
    const field = config.fields.find(f => f.type === 'text' || f.type === 'textarea')
    return field ? String(item[field.key] || '').slice(0, 80) : ''
  }

  const getNameField = (item) => {
    const field = config.fields.find(f => f.key === 'title' || f.key === 'name' || f.key === 'label' || f.key === 'client_name' || f.key === 'section')
    return field ? item[field.key] : `Item #${item.id}`
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

      {/* Items List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Loading...</div>
      ) : filteredItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>
          No items found. {items.length === 0 ? 'Click "Add" to create one.' : 'Try adjusting your search.'}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {filteredItems.map((item, idx) => (
            <div key={item.id} className="liquid-glass" style={{ padding: '12px 16px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <DragIndicatorIcon sx={{ fontSize: 16, color: 'var(--text-muted)', opacity: 0.4, cursor: 'grab' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{getNameField(item)}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{getPreview(item) || 'No description'}</div>
              </div>
              {item.visible === false && <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '100px', background: 'rgba(245,158,11,0.15)', color: '#f59e0b', fontWeight: '600', fontFamily: 'var(--font-code)' }}>Hidden</span>}
              <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                <button onClick={() => moveItem(item, 'up')} disabled={idx === 0} title="Move up" style={{ padding: '4px', borderRadius: '4px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: idx === 0 ? 'default' : 'pointer', opacity: idx === 0 ? 0.3 : 1 }}><ArrowUpwardIcon sx={{ fontSize: 14 }} /></button>
                <button onClick={() => moveItem(item, 'down')} disabled={idx === filteredItems.length - 1} title="Move down" style={{ padding: '4px', borderRadius: '4px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: idx === filteredItems.length - 1 ? 'default' : 'pointer', opacity: idx === filteredItems.length - 1 ? 0.3 : 1 }}><ArrowDownwardIcon sx={{ fontSize: 14 }} /></button>
                <button onClick={() => toggleVisible(item)} title={item.visible === false ? 'Show' : 'Hide'} style={{ padding: '4px 8px', borderRadius: '6px', background: item.visible === false ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)', color: item.visible === false ? '#f59e0b' : '#22c55e', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center' }}>
                  {item.visible === false ? <VisibilityOffIcon sx={{ fontSize: 14 }} /> : <VisibilityIcon sx={{ fontSize: 14 }} />}
                </button>
                <button onClick={() => { setEditingItem(item); setFormOpen(true) }} title="Edit" style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(79,142,255,0.1)', color: '#4f8eff', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center' }}>
                  <EditIcon sx={{ fontSize: 14 }} />
                </button>
                <button onClick={() => setDeleteConfirm(item)} title="Delete" style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center' }}>
                  <DeleteIcon sx={{ fontSize: 14 }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
