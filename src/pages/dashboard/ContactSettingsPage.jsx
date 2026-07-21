import { useState, useEffect } from 'react'
import { api } from '../../utils/api'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import MailIcon from '@mui/icons-material/Mail'
import PhoneIcon from '@mui/icons-material/Phone'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'

const contactFields = [
  { key: 'contact_email', label: 'Email', icon: <MailIcon sx={{ fontSize: 14 }} />, placeholder: 'business@technoziant.com', color: '#4f8eff' },
  { key: 'contact_phone', label: 'Phone', icon: <PhoneIcon sx={{ fontSize: 14 }} />, placeholder: '+91 8882716189', color: '#06d6a0' },
  { key: 'contact_whatsapp', label: 'WhatsApp', icon: <WhatsAppIcon sx={{ fontSize: 14 }} />, placeholder: '+91 9771291336', color: '#25D366' },
]

const officeFields = [
  { key: 'contact_address', label: 'Address', icon: <LocationOnIcon sx={{ fontSize: 14 }} />, placeholder: 'Deoghar, Jharkhand', color: '#fbbf24' },
  { key: 'contact_hours', label: 'Hours', icon: <AccessTimeIcon sx={{ fontSize: 14 }} />, placeholder: 'Mon - Fri: 10:00 AM - 6:00 PM', color: '#a855f7' },
]

const socialFields = [
  { key: 'social_linkedin', label: 'LinkedIn', icon: <LinkedInIcon sx={{ fontSize: 14 }} />, placeholder: 'https://linkedin.com/...', color: '#0A66C2' },
  { key: 'social_twitter', label: 'Twitter', icon: <TwitterIcon sx={{ fontSize: 14 }} />, placeholder: 'https://x.com/...', color: '#1DA1F2' },
  { key: 'social_instagram', label: 'Instagram', icon: <InstagramIcon sx={{ fontSize: 14 }} />, placeholder: 'https://instagram.com/...', color: '#E4405F' },
  { key: 'social_youtube', label: 'YouTube', icon: <YouTubeIcon sx={{ fontSize: 14 }} />, placeholder: 'https://youtube.com/...', color: '#FF0000' },
]

function InlineEditRow({ field, value, onSave }) {
  const [editVal, setEditVal] = useState(value || '')
  const [editing, setEditing] = useState(false)

  useEffect(() => { setEditVal(value || '') }, [value])

  const handleSave = () => {
    onSave(field.key, editVal)
    setEditing(false)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', borderBottom: '1px solid var(--glass-border)' }}>
      <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: `${field.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: field.color, flexShrink: 0 }}>
        {field.icon}
      </div>
      <div style={{ fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', fontFamily: 'var(--font-code)', width: '70px', flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{field.label}</div>
      {editing ? (
        <input type="text" value={editVal} onChange={e => setEditVal(e.target.value)} placeholder={field.placeholder}
          onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') { setEditVal(value || ''); setEditing(false) } }}
          autoFocus style={{ flex: 1, padding: '5px 8px', borderRadius: '6px', border: '1px solid var(--accent)', background: 'rgba(255,255,255,0.05)', color: 'var(--text)', fontSize: '12px', outline: 'none', fontFamily: 'var(--font-code)' }} />
      ) : (
        <div onClick={() => setEditing(true)} style={{ flex: 1, fontSize: '12px', color: value ? 'var(--text)' : 'var(--text-muted)', cursor: 'pointer', padding: '5px 8px', borderRadius: '6px', background: 'transparent', fontFamily: 'var(--font-code)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: 'background 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          {value || field.placeholder}
        </div>
      )}
      {editing && (
        <button onClick={handleSave} style={{ padding: '4px 10px', borderRadius: '6px', border: 'none', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', fontSize: '10px', fontWeight: '600', cursor: 'pointer', fontFamily: 'var(--font-code)', flexShrink: 0 }}>
          <SaveIcon sx={{ fontSize: 12 }} />
        </button>
      )}
    </div>
  )
}

export function ContactSettingsPage() {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    api.getSettings().then(data => {
      const map = {}
      if (Array.isArray(data)) data.forEach(s => { map[s.key] = s.value })
      setSettings(map)
    }).catch(e => setError(e.message)).finally(() => setLoading(false))
  }, [])

  const handleSave = async (key, value) => {
    setSaving(true)
    setError('')
    try {
      await api.updateSettings({ [key]: value })
      setSettings({ ...settings, [key]: value })
      setSuccess('Saved!')
      setTimeout(() => setSuccess(''), 1500)
    } catch (e) { setError(e.message) }
    finally { setSaving(false) }
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Loading...</div>

  const Section = ({ title, color, fields }) => (
    <div className="liquid-glass" style={{ padding: '14px 16px', borderRadius: '10px', marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color }} />
        <span style={{ fontSize: '10px', fontWeight: '600', color, fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{title}</span>
        {saving && <span style={{ fontSize: '9px', color: '#22c55e', fontFamily: 'var(--font-code)', marginLeft: 'auto' }}>saving...</span>}
      </div>
      {fields.map(f => (
        <InlineEditRow key={f.key} field={f} value={settings[f.key] || ''} onSave={handleSave} />
      ))}
    </div>
  )

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)' }}>services</div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: '700' }}>Contact Page</h1>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px' }}>
        <div>
          <Section title="Contact Info" color="#22c55e" fields={contactFields} />
          <Section title="Office Address & Hours" color="#fbbf24" fields={officeFields} />
        </div>
        <div>
          <Section title="Social Media Links" color="#4f8eff" fields={socialFields} />
          <div className="liquid-glass" style={{ padding: '14px 16px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#94a3b8' }} />
              <span style={{ fontSize: '10px', fontWeight: '600', color: '#94a3b8', fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Preview — Footer Contact</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '8px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)' }}>
              {settings.contact_email && <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>📧 {settings.contact_email}</div>}
              {settings.contact_phone && <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>📱 {settings.contact_phone}</div>}
              {settings.contact_whatsapp && <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>💬 WhatsApp: {settings.contact_whatsapp}</div>}
              {settings.contact_address && <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>📍 {settings.contact_address}</div>}
              {settings.contact_hours && <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>🕐 {settings.contact_hours}</div>}
              {!settings.contact_email && !settings.contact_phone && <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)', opacity: 0.5 }}>Click any field above to edit</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
