import { useState, useEffect, useRef } from 'react'
import { api } from '../../utils/api'
import { CMSSkeleton } from '../../components/ui/Skeleton'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import CropFreeIcon from '@mui/icons-material/CropFree'
import CropSquareIcon from '@mui/icons-material/CropSquare'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'

const shapeOptions = [
  { id: 'rectangle', label: 'Rectangle', icon: <CropSquareIcon sx={{ fontSize: 18 }} />, desc: 'Standard rectangular logo' },
  { id: 'circle', label: 'Circle', icon: <RadioButtonCheckedIcon sx={{ fontSize: 18 }} />, desc: 'Circular logo style' },
  { id: 'free', label: 'Free Resize', icon: <CropFreeIcon sx={{ fontSize: 18 }} />, desc: 'Custom width & height' },
]

export function HeaderSettingsPage() {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [previewShape, setPreviewShape] = useState('rectangle')
  const fileInputRef = useRef(null)

  useEffect(() => {
    api.getSettings().then(data => {
      const map = {}
      if (Array.isArray(data)) {
        data.forEach(s => { map[s.key] = s.value })
      }
      setSettings(map)
      setPreviewShape(map.logo_shape || 'rectangle')
    }).catch(e => setError(e.message)).finally(() => setLoading(false))
  }, [])

  const handleUpdate = (key, value) => {
    setSettings({ ...settings, [key]: value })
  }

  const handleShapeChange = (shape) => {
    setPreviewShape(shape)
    handleUpdate('logo_shape', shape)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be under 2MB')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      handleUpdate('logo_image', ev.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const settingsToSave = {}
      const logoKeys = ['logo_image', 'logo_shape', 'logo_width', 'logo_height', 'logo_name']
      logoKeys.forEach(key => {
        if (settings[key] !== undefined) settingsToSave[key] = settings[key]
      })
      await api.updateSettings(settingsToSave)
      setSuccess('Header settings saved!')
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

  const getLogoPreviewStyle = () => {
    const base = {
      maxWidth: '100%', objectFit: 'contain', display: 'block',
    }
    switch (previewShape) {
      case 'circle':
        return { ...base, borderRadius: '50%', width: '80px', height: '80px', objectFit: 'cover' }
      case 'rectangle':
        return { ...base, borderRadius: '8px', height: '50px' }
      case 'free':
        return {
          ...base,
          width: settings.logo_width ? `${settings.logo_width}px` : '120px',
          height: settings.logo_height ? `${settings.logo_height}px` : '60px',
          borderRadius: '4px',
        }
      default:
        return base
    }
  }

  if (loading) {
    return <CMSSkeleton />
  }

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)' }}>system</div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: '700' }}>Header & Logo</h1>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {/* Logo Image */}
        <div className="liquid-glass" style={{ padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '14px', fontFamily: 'var(--font-code)' }}>Logo Image</h3>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Logo Name (text fallback)</label>
            <input type="text" value={settings.logo_name || ''} onChange={e => handleUpdate('logo_name', e.target.value)} placeholder="technoziant" style={inputStyle} />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Logo Image URL</label>
            <input type="text" value={settings.logo_image || ''} onChange={e => handleUpdate('logo_image', e.target.value)} placeholder="https://... or upload below" style={inputStyle} />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Upload Image</label>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            <button onClick={() => fileInputRef.current?.click()} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px dashed var(--glass-border)', background: 'transparent', color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'var(--font-code)', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#22c55e'; e.currentTarget.style.color = '#22c55e' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = 'var(--text-muted)' }}>
              Click to upload (max 2MB)
            </button>
          </div>

          {/* Preview */}
          {settings.logo_image && (
            <div style={{ marginTop: '14px', padding: '16px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: 'var(--font-code)' }}>Preview</div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                <img src={settings.logo_image} alt="Logo preview" style={getLogoPreviewStyle()} onError={e => { e.target.style.display = 'none' }} />
              </div>
            </div>
          )}
        </div>

        {/* Logo Shape & Size */}
        <div className="liquid-glass" style={{ padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '14px', fontFamily: 'var(--font-code)' }}>Logo Shape & Size</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {shapeOptions.map(opt => (
              <button key={opt.id} onClick={() => handleShapeChange(opt.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px',
                  borderRadius: '10px', border: `1px solid ${previewShape === opt.id ? 'rgba(34,197,94,0.4)' : 'var(--glass-border)'}`,
                  background: previewShape === opt.id ? 'rgba(34,197,94,0.08)' : 'transparent',
                  cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', width: '100%'
                }}>
                <div style={{ color: previewShape === opt.id ? '#22c55e' : 'var(--text-muted)', display: 'flex' }}>
                  {opt.icon}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: previewShape === opt.id ? '#22c55e' : 'var(--text)' }}>{opt.label}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>{opt.desc}</div>
                </div>
                {previewShape === opt.id && (
                  <div style={{ marginLeft: 'auto', width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                )}
              </button>
            ))}
          </div>

          {previewShape === 'free' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Width (px)</label>
                <input type="number" value={settings.logo_width || ''} onChange={e => handleUpdate('logo_width', e.target.value)} placeholder="120" min="20" max="400" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Height (px)</label>
                <input type="number" value={settings.logo_height || ''} onChange={e => handleUpdate('logo_height', e.target.value)} placeholder="60" min="20" max="200" style={inputStyle} />
              </div>
            </div>
          )}

          {/* Shape Preview */}
          <div style={{ marginTop: '16px', padding: '16px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: 'var(--font-code)', textAlign: 'center' }}>Shape Preview</div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', gap: '16px' }}>
              {shapeOptions.map(opt => (
                <div key={opt.id} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: opt.id === 'free' ? (settings.logo_width || 60) / 2 : opt.id === 'circle' ? 40 : 50,
                    height: opt.id === 'free' ? (settings.logo_height || 30) / 2 : opt.id === 'circle' ? 40 : 24,
                    borderRadius: opt.id === 'circle' ? '50%' : opt.id === 'rectangle' ? '4px' : '2px',
                    border: `2px solid ${previewShape === opt.id ? '#22c55e' : 'var(--glass-border)'}`,
                    background: previewShape === opt.id ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 4px', transition: 'all 0.3s'
                  }}>
                    {settings.logo_image ? (
                      <img src={settings.logo_image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                    ) : (
                      <span style={{ fontSize: '8px', fontWeight: '700', color: previewShape === opt.id ? '#22c55e' : 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>T</span>
                    )}
                  </div>
                  <div style={{ fontSize: '9px', color: previewShape === opt.id ? '#22c55e' : 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>{opt.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <button onClick={handleSave} disabled={saving} style={{
          padding: '10px 24px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '600',
          color: '#fff', cursor: 'pointer', background: 'linear-gradient(135deg, #22c55e, #16a34a)',
          fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '8px', opacity: saving ? 0.7 : 1
        }}>
          <SaveIcon sx={{ fontSize: 16 }} /> {saving ? 'Saving...' : 'Save Header Settings'}
        </button>
      </div>
    </div>
  )
}
