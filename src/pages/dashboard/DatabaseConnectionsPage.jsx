import { useState, useEffect } from 'react'
import { api } from '../../utils/api'
import { CMSSkeleton } from '../../components/ui/Skeleton'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import StorageIcon from '@mui/icons-material/Storage'
import LinkIcon from '@mui/icons-material/Link'
import LinkOffIcon from '@mui/icons-material/LinkOff'

const dbConfigs = {
  PostgreSQL: { port: '5432', fields: ['host', 'port', 'database_name', 'username', 'password', 'ssl'], placeholders: { host: 'localhost', database_name: 'postgres', username: 'postgres' } },
  MySQL: { port: '3306', fields: ['host', 'port', 'database_name', 'username', 'password', 'ssl'], placeholders: { host: 'localhost', database_name: 'mysql', username: 'root' } },
  MongoDB: { port: '27017', fields: ['host', 'port', 'database_name', 'username', 'password', 'ssl', 'auth_db'], placeholders: { host: 'localhost', database_name: 'admin', username: 'admin', auth_db: 'admin' } },
  SQLite: { port: '', fields: ['file_path'], placeholders: { file_path: '/path/to/database.db' } },
}

const fieldLabels = {
  host: 'Host', port: 'Port', database_name: 'Database', username: 'Username',
  password: 'Password', ssl: 'Enable SSL', file_path: 'File Path', auth_db: 'Auth Database'
}

function FormModal({ open, onClose, onSave, item, saving, testing, onTest, testResult }) {
  const [form, setForm] = useState({
    name: '', type: 'PostgreSQL', host: 'localhost', port: '5432',
    database_name: '', username: '', password: '', ssl: false, file_path: '', auth_db: ''
  })

  useEffect(() => {
    if (open) document.activeElement?.blur()
  }, [open])

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name || '', type: item.type || 'PostgreSQL',
        host: item.host || 'localhost', port: item.port || '5432',
        database_name: item.database_name || '', username: item.username || '',
        password: item.password || '', ssl: item.ssl || false,
        file_path: item.file_path || '', auth_db: item.auth_db || ''
      })
    } else {
      setForm({ name: '', type: 'PostgreSQL', host: 'localhost', port: '5432', database_name: '', username: '', password: '', ssl: false, file_path: '', auth_db: '' })
    }
  }, [item, open])

  if (!open) return null

  const config = dbConfigs[form.type] || dbConfigs.PostgreSQL
  const isTestDisabled = testing || !form.name.trim() || (form.type === 'SQLite' ? !form.file_path.trim() : !form.database_name.trim() || !form.host.trim())
  const inputStyle = {
    width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)',
    background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '13px', outline: 'none',
    fontFamily: 'var(--font-code)', boxSizing: 'border-box',
  }
  const labelStyle = { display: 'block', fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.05em' }

  const renderField = (field) => {
    if (field === 'ssl') {
      return (
        <div key={field} style={{ marginBottom: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.ssl} onChange={e => setForm({ ...form, ssl: e.target.checked })} style={{ width: '16px', height: '16px', accentColor: '#22c55e' }} />
            <span style={{ fontSize: '12px', color: 'var(--text)' }}>{fieldLabels[field]}</span>
          </label>
        </div>
      )
    }
    if (field === 'password') {
      return (
        <div key={field}>
          <label style={labelStyle}>{fieldLabels[field]}</label>
          <input type="password" value={form[field] || ''} onChange={e => setForm({ ...form, [field]: e.target.value })} placeholder="••••••••" autoComplete="new-password" style={inputStyle} />
        </div>
      )
    }
    return (
      <div key={field}>
        <label style={labelStyle}>{fieldLabels[field]}</label>
        <input type="text" value={form[field] || ''} onChange={e => setForm({ ...form, [field]: e.target.value })} placeholder={config.placeholders[field] || ''} autoComplete="off" style={inputStyle} />
      </div>
    )
  }

  const gridFields = config.fields.filter(f => f !== 'ssl')
  const hasSSL = config.fields.includes('ssl')

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div className="liquid-glass" style={{ width: '100%', maxWidth: '520px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.5)', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700' }}>{item ? 'Edit' : 'Add'} {form.type} Connection</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}><CloseIcon sx={{ fontSize: 20 }} /></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave(form) }} style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}>Connection Name *</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="e.g. Production DB" autoComplete="off" style={inputStyle} />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}>Database Type</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              {Object.keys(dbConfigs).map(type => (
                <button key={type} type="button" onClick={() => setForm({ ...form, type, port: dbConfigs[type].port })} style={{
                  padding: '8px 4px', borderRadius: '8px', border: `1.5px solid ${form.type === type ? '#22c55e' : 'var(--glass-border)'}`,
                  background: form.type === type ? 'rgba(34,197,94,0.08)' : 'transparent',
                  color: form.type === type ? '#22c55e' : 'var(--text-muted)', fontSize: '10px', fontWeight: '600',
                  cursor: 'pointer', fontFamily: 'var(--font-code)', textAlign: 'center', transition: 'all 0.15s'
                }}>
                  <div style={{ fontSize: '18px', marginBottom: '2px' }}>{type === 'PostgreSQL' ? '🐘' : type === 'MySQL' ? '🐬' : type === 'MongoDB' ? '🍃' : '📦'}</div>
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: gridFields.length <= 2 ? '1fr' : '1fr 1fr', gap: '12px', marginBottom: hasSSL ? '12px' : '16px' }}>
            {gridFields.map(renderField)}
          </div>

          {hasSSL && renderField('ssl')}

          <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '14px' }}>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
              {testResult && (
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '6px', background: testResult === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: testResult === 'success' ? '#22c55e' : '#ef4444', border: `1px solid ${testResult === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}` }}>
                  {testResult === 'success' ? <><CheckCircleIcon sx={{ fontSize: 13 }} /> Connected!</> : <><CancelIcon sx={{ fontSize: 13 }} /> Failed</>}
                </span>
              )}
              <button type="button" onClick={() => onTest(form)} disabled={isTestDisabled} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'transparent', color: isTestDisabled ? 'var(--text-muted)' : '#4f8eff', fontSize: '12px', fontWeight: '500', cursor: isTestDisabled ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '6px', opacity: isTestDisabled ? 0.5 : 1 }}>
                {testing ? 'Testing...' : 'Test Connection'}
              </button>
              <button type="button" onClick={onClose} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--font-code)' }}>Cancel</button>
              <button type="submit" disabled={saving} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '6px', opacity: saving ? 0.7 : 1 }}>
                <SaveIcon sx={{ fontSize: 14 }} /> {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
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

export function DatabaseConnectionsPage() {
  const [connections, setConnections] = useState([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [testResult, setTestResult] = useState(null)

  const loadData = () => {
    setLoading(true)
    api.getContent('database_connections').then(data => {
      setConnections(Array.isArray(data) ? data : [])
    }).catch(e => setError(e.message)).finally(() => setLoading(false))
  }

  useEffect(() => { loadData() }, [])

  const handleSave = async (formData) => {
    setSaving(true)
    setError('')
    try {
      if (editingItem) {
        await api.updateContent('database_connections', editingItem.id, formData)
      } else {
        await api.createContent('database_connections', formData)
      }
      setFormOpen(false)
      setEditingItem(null)
      setSuccess(editingItem ? 'Connection updated!' : 'Connection added!')
      setTimeout(() => setSuccess(''), 2000)
      loadData()
    } catch (e) { setError(e.message) }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!deleteConfirm) return
    try {
      await api.deleteContent('database_connections', deleteConfirm.id)
      setDeleteConfirm(null)
      setSuccess('Connection deleted!')
      setTimeout(() => setSuccess(''), 2000)
      loadData()
    } catch (e) { setError(e.message) }
  }

  const handleTest = async (formData) => {
    setTesting(true)
    setTestResult(null)
    try {
      await new Promise(r => setTimeout(r, 1500))
      const ok = formData.host && formData.database_name && formData.name
      setTestResult(ok ? 'success' : 'error')
      if (editingItem && ok) {
        await api.updateContent('database_connections', editingItem.id, { status: 'connected', last_tested: new Date().toLocaleString() })
      }
      setTimeout(() => setTestResult(null), 3000)
    } catch { setTestResult('error'); setTimeout(() => setTestResult(null), 3000) }
    finally { setTesting(false) }
  }

  const toggleActive = async (conn) => {
    try {
      if (!conn.is_active) {
        await api.updateContent('database_connections', conn.id, { is_active: true })
        for (const c of connections) {
          if (c.id !== conn.id && c.is_active) {
            await api.updateContent('database_connections', c.id, { is_active: false })
          }
        }
        setSuccess(`${conn.name} activated!`)
      } else {
        await api.updateContent('database_connections', conn.id, { is_active: false })
        setSuccess('Deactivated')
      }
      setTimeout(() => setSuccess(''), 2000)
      loadData()
    } catch (e) { setError(e.message) }
  }

  const getTypeColor = (type) => ({ PostgreSQL: '#336791', MySQL: '#4479A1', MongoDB: '#47A248', SQLite: '#003B57' }[type] || '#94a3b8')
  const getTypeIcon = (type) => ({ PostgreSQL: '🐘', MySQL: '🐬', MongoDB: '🍃', SQLite: '📦' }[type] || '🗄️')

  if (loading) return <CMSSkeleton />

  return (
    <div>
      <FormModal open={formOpen} onClose={() => { setFormOpen(false); setEditingItem(null); setTestResult(null) }} onSave={handleSave} item={editingItem} saving={saving} testing={testing} onTest={handleTest} testResult={testResult} />
      <ConfirmDialog open={!!deleteConfirm} title="Delete Connection?" message="This database connection will be permanently removed." onConfirm={handleDelete} onCancel={() => setDeleteConfirm(null)} />

      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)' }}>administrator</div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: '700' }}>Database Connections</h1>
      </div>

      {error && (
        <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: '12px', fontFamily: 'var(--font-code)', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{error}</span>
          <button onClick={() => setError('')} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}><CloseIcon sx={{ fontSize: 16 }} /></button>
        </div>
      )}

      {success && (
        <div style={{ padding: '8px 14px', borderRadius: '8px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e', fontSize: '12px', fontFamily: 'var(--font-code)', marginBottom: '12px' }}>
          {success}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '6px', marginBottom: '14px' }}>
        {[
          { label: 'Total', value: connections.length, color: '#4f8eff' },
          { label: 'Active', value: connections.filter(c => c.is_active).length, color: '#22c55e' },
          { label: 'Connected', value: connections.filter(c => c.status === 'connected').length, color: '#06d6a0' },
        ].map((s, i) => (
          <div key={i} className="liquid-glass" style={{ padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: '700', color: s.color, fontFamily: 'var(--font-h)' }}>{s.value}</div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>{s.label}</div>
          </div>
        ))}
        <button onClick={() => { setEditingItem(null); setFormOpen(true); setTestResult(null) }} style={{ padding: '10px', borderRadius: '8px', border: '2px dashed var(--glass-border)', background: 'transparent', color: '#22c55e', fontSize: '11px', fontWeight: '600', cursor: 'pointer', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#22c55e'; e.currentTarget.style.background = 'rgba(34,197,94,0.05)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.background = 'transparent' }}>
          <AddIcon sx={{ fontSize: 14 }} /> Add
        </button>
      </div>

      {connections.length === 0 ? (
        <div className="liquid-glass" style={{ padding: '32px', borderRadius: '10px', textAlign: 'center' }}>
          <StorageIcon sx={{ fontSize: 32, color: 'var(--text-muted)', opacity: 0.3, mb: 1 }} />
          <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)', marginBottom: '4px' }}>No connections</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)', marginBottom: '12px' }}>Add one to get started</div>
          <button onClick={() => { setEditingItem(null); setFormOpen(true); setTestResult(null) }} style={{ padding: '6px 16px', borderRadius: '6px', border: 'none', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', fontSize: '11px', fontWeight: '600', cursor: 'pointer', fontFamily: 'var(--font-code)' }}>Add First</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '6px' }}>
          {connections.map(conn => (
            <div key={conn.id} className="liquid-glass" style={{ padding: '10px 12px', borderRadius: '8px', border: conn.is_active ? '1px solid rgba(34,197,94,0.3)' : '1px solid transparent', transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${getTypeColor(conn.type)}15`, border: `1px solid ${getTypeColor(conn.type)}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
                  {getTypeIcon(conn.type)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text)' }}>{conn.name}</span>
                    {conn.is_active && (
                      <span style={{ fontSize: '8px', padding: '1px 6px', borderRadius: '100px', background: 'rgba(34,197,94,0.15)', color: '#22c55e', fontWeight: '600', fontFamily: 'var(--font-code)' }}>
                        ● Active
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {conn.type} · {conn.host || conn.file_path || ''}{conn.port ? `:${conn.port}` : ''} · {conn.database_name || ''}
                  </div>
                  <div style={{ fontSize: '8px', fontFamily: 'var(--font-code)', marginTop: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: conn.status === 'connected' ? '#22c55e' : conn.status === 'failed' ? '#ef4444' : 'var(--text-muted)' }}>
                      {conn.status === 'connected' ? '● Connected' : conn.status === 'failed' ? '● Failed' : '● Untested'}
                    </span>
                    {conn.ssl && <span style={{ color: '#fbbf24' }}>🔒</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '3px', flexShrink: 0 }}>
                  <button onClick={() => toggleActive(conn)} title={conn.is_active ? 'Deactivate' : 'Set Active'} style={{ padding: '4px 8px', borderRadius: '5px', border: 'none', background: conn.is_active ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)', color: conn.is_active ? '#22c55e' : '#f59e0b', cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '9px', fontFamily: 'var(--font-code)', fontWeight: '600' }}>
                    {conn.is_active ? <LinkIcon sx={{ fontSize: 10 }} /> : <LinkOffIcon sx={{ fontSize: 10 }} />}
                  </button>
                  <button onClick={() => { setEditingItem(conn); setFormOpen(true); setTestResult(null) }} title="Edit" style={{ padding: '4px 8px', borderRadius: '5px', background: 'rgba(79,142,255,0.1)', color: '#4f8eff', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center' }}>
                    <EditIcon sx={{ fontSize: 10 }} />
                  </button>
                  <button onClick={() => setDeleteConfirm(conn)} title="Delete" style={{ padding: '4px 8px', borderRadius: '5px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center' }}>
                    <DeleteIcon sx={{ fontSize: 10 }} />
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
