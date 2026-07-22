import { useState, useEffect } from 'react'
import { api } from '../../utils/api'
import { CMSSkeleton } from '../../components/ui/Skeleton'
import SaveIcon from '@mui/icons-material/Save'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'

export function SettingsPage() {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [newKey, setNewKey] = useState('')
  const [newValue, setNewValue] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  useEffect(() => {
    api.getSettings().then(data => {
      const map = {}
      if (Array.isArray(data)) {
        data.forEach(s => { map[s.key] = s.value })
      } else if (data && typeof data === 'object') {
        Object.assign(map, data)
      }
      setSettings(map)
    }).catch(e => setError(e.message)).finally(() => setLoading(false))
  }, [])

  const handleUpdate = (key, value) => {
    setSettings({ ...settings, [key]: value })
  }

  const handleDelete = (key) => {
    const next = { ...settings }
    delete next[key]
    setSettings(next)
  }

  const handleAdd = () => {
    if (!newKey.trim()) return
    setSettings({ ...settings, [newKey.trim()]: newValue })
    setNewKey('')
    setNewValue('')
    setShowAdd(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      await api.updateSettings(settings)
      setSuccess('Settings saved!')
      setTimeout(() => setSuccess(''), 2000)
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)',
    background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '13px', outline: 'none',
    fontFamily: 'var(--font-code)', boxSizing: 'border-box',
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)' }}>system</div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: '700' }}>Site Settings</h1>
      </div>

      {error && (
        <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: '12px', fontFamily: 'var(--font-code)', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{error}</span>
          <button onClick={() => setError('')} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}><CloseIcon sx={{ fontSize: 16 }} /></button>
        </div>
      )}

      {success && (
        <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e', fontSize: '12px', fontFamily: 'var(--font-code)', marginBottom: '12px' }}>
          {success}
        </div>
      )}

      {/* Action bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', justifyContent: 'flex-end' }}>
        <button onClick={() => setShowAdd(true)} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', fontSize: '12px', fontWeight: '600', color: '#fff', cursor: 'pointer', background: 'linear-gradient(135deg, #4f8eff, #2563eb)', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AddIcon sx={{ fontSize: 16 }} /> Add Setting
        </button>
        <button onClick={handleSave} disabled={saving} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', fontSize: '12px', fontWeight: '600', color: '#fff', cursor: 'pointer', background: 'linear-gradient(135deg, #22c55e, #16a34a)', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '6px', opacity: saving ? 0.7 : 1 }}>
          <SaveIcon sx={{ fontSize: 16 }} /> {saving ? 'Saving...' : 'Save All'}
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="liquid-glass" style={{ padding: '16px', borderRadius: '10px', marginBottom: '12px', display: 'flex', gap: '8px', alignItems: 'end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key</label>
            <input type="text" value={newKey} onChange={e => setNewKey(e.target.value)} placeholder="setting_key" style={inputStyle} />
          </div>
          <div style={{ flex: 2 }}>
            <label style={{ display: 'block', fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Value</label>
            <input type="text" value={newValue} onChange={e => setNewValue(e.target.value)} placeholder="Setting value" style={inputStyle} />
          </div>
          <button onClick={handleAdd} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', fontSize: '12px', fontWeight: '600', color: '#fff', cursor: 'pointer', background: 'linear-gradient(135deg, #22c55e, #16a34a)', fontFamily: 'var(--font-code)', whiteSpace: 'nowrap' }}>Add</button>
          <button onClick={() => setShowAdd(false)} style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}><CloseIcon sx={{ fontSize: 16 }} /></button>
        </div>
      )}

      {/* Settings list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}><CMSSkeleton /></div>
      ) : Object.keys(settings).length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>No settings found. Click "Add Setting" to create one.</div>
      ) : (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {Object.entries(settings).map(([key, value]) => (
            <div key={key} className="liquid-glass" style={{ padding: '12px 16px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '200px', flexShrink: 0 }}>
                <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text)', fontFamily: 'var(--font-code)' }}>{key}</div>
              </div>
              <div style={{ flex: 1 }}>
                <input type="text" value={value || ''} onChange={e => handleUpdate(key, e.target.value)} style={inputStyle} />
              </div>
              <button onClick={() => handleDelete(key)} title="Remove" style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <DeleteIcon sx={{ fontSize: 14 }} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
