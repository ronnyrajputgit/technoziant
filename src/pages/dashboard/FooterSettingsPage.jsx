import { useState, useEffect } from 'react'
import { api } from '../../utils/api'
import { CMSSkeleton } from '../../components/ui/Skeleton'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'

const availablePages = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Leaders', href: '/leaders' },
  { label: 'Process', href: '/process' },
]

function MultiSelect({ label, color, options, selected, onToggle }) {
  const [open, setOpen] = useState(false)
  const allSelected = options.length > 0 && options.every(opt => selected.includes(opt.label))

  const toggleAll = () => {
    if (allSelected) {
      onToggle('__clear_all__')
    } else {
      onToggle('__select_all__')
    }
  }

  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontSize: '10px', fontWeight: '600', color, fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
        <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>{selected.length}/{options.length} selected</span>
      </div>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--font-code)', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>{selected.length > 0 ? `${selected.length} items selected` : 'Click to select...'}</span>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
      </button>
      {open && (
        <div style={{ marginTop: '4px', border: '1px solid var(--glass-border)', borderRadius: '8px', background: 'var(--bg-2)', maxHeight: '200px', overflowY: 'auto' }}>
          <button onClick={toggleAll} style={{ width: '100%', padding: '8px 12px', border: 'none', borderBottom: '1px solid var(--glass-border)', background: allSelected ? `${color}10` : 'transparent', color: allSelected ? color : 'var(--text)', fontSize: '11px', fontWeight: '600', cursor: 'pointer', fontFamily: 'var(--font-code)', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.15s' }}
            onMouseEnter={e => { if (!allSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
            onMouseLeave={e => { if (!allSelected) e.currentTarget.style.background = 'transparent' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: `1.5px solid ${allSelected ? color : 'var(--glass-border)'}`, background: allSelected ? color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
              {allSelected && <CheckIcon sx={{ fontSize: 11, color: '#fff' }} />}
            </div>
            {allSelected ? 'Deselect All' : 'Select All'}
          </button>
          {options.map(opt => {
            const isSelected = selected.includes(opt.label)
            return (
              <button key={opt.label} onClick={() => onToggle(opt.label)} style={{ width: '100%', padding: '8px 12px', border: 'none', borderBottom: '1px solid var(--glass-border)', background: isSelected ? `${color}10` : 'transparent', color: isSelected ? color : 'var(--text)', fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--font-code)', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.15s' }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: `1.5px solid ${isSelected ? color : 'var(--glass-border)'}`, background: isSelected ? color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                  {isSelected && <CheckIcon sx={{ fontSize: 11, color: '#fff' }} />}
                </div>
                {opt.label}
                {opt.href && <span style={{ marginLeft: 'auto', fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>{opt.href}</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function FooterSettingsPage() {
  const [settings, setSettings] = useState({})
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [brandName, setBrandName] = useState('')
  const [brandDesc, setBrandDesc] = useState('')
  const [selectedServices, setSelectedServices] = useState([])
  const [selectedCompany, setSelectedCompany] = useState([])

  useEffect(() => {
    Promise.all([
      api.getSettings().catch(() => []),
      api.getContent('services', { visible: 'true' }).catch(() => [])
    ]).then(([settingsData, servicesData]) => {
      const map = {}
      if (Array.isArray(settingsData)) settingsData.forEach(s => { map[s.key] = s.value })
      setSettings(map)
      setBrandName(map.footer_brand_name || 'Technoziant')
      setBrandDesc(map.footer_description || 'We craft digital products. Creative studio blending storytelling, art, and technology.')

      try {
        setSelectedServices(JSON.parse(map.footer_services || '[]'))
      } catch { setSelectedServices([]) }
      try {
        setSelectedCompany(JSON.parse(map.footer_company || '[]'))
      } catch { setSelectedCompany([]) }

      setServices(Array.isArray(servicesData) ? servicesData : [])
    }).catch(e => setError(e.message)).finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      await api.updateSettings({
        footer_brand_name: brandName,
        footer_description: brandDesc,
        footer_services: JSON.stringify(selectedServices),
        footer_company: JSON.stringify(selectedCompany),
      })
      setSuccess('Footer settings saved!')
      setTimeout(() => setSuccess(''), 2000)
    } catch (e) { setError(e.message) }
    finally { setSaving(false) }
  }

  const toggleService = (name) => {
    if (name === '__select_all__') {
      setSelectedServices(serviceOptions.map(s => s.label))
    } else if (name === '__clear_all__') {
      setSelectedServices([])
    } else {
      setSelectedServices(prev => prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name])
    }
  }

  const toggleCompany = (name) => {
    if (name === '__select_all__') {
      setSelectedCompany(companyOptions.map(c => c.label))
    } else if (name === '__clear_all__') {
      setSelectedCompany([])
    } else {
      setSelectedCompany(prev => prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name])
    }
  }

  const serviceOptions = services.map(s => ({ label: s.title, href: `/services/${s.title?.toLowerCase().replace(/\s+/g, '-')}` }))
  const companyOptions = availablePages

  const inputStyle = {
    width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)',
    background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '13px', outline: 'none',
    fontFamily: 'var(--font-code)', boxSizing: 'border-box',
  }

  if (loading) return <CMSSkeleton />

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)' }}>site management</div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: '700' }}>Footer Links</h1>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {/* Left - Brand + Services */}
        <div>
          <div className="liquid-glass" style={{ padding: '16px', borderRadius: '10px', marginBottom: '12px' }}>
            <div style={{ fontSize: '10px', fontWeight: '600', color: '#22c55e', marginBottom: '12px', fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Brand Section</div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)', textTransform: 'uppercase' }}>Brand Name</label>
              <input type="text" value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="Technoziant" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)', textTransform: 'uppercase' }}>Description</label>
              <textarea value={brandDesc} onChange={e => setBrandDesc(e.target.value)} placeholder="We craft digital products..." rows={3} style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }} />
            </div>
          </div>

          <div className="liquid-glass" style={{ padding: '16px', borderRadius: '10px' }}>
            <div style={{ fontSize: '10px', fontWeight: '600', color: '#06d6a0', marginBottom: '12px', fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Services Column</div>
            <MultiSelect label="Select Services" color="#06d6a0" options={serviceOptions} selected={selectedServices} onToggle={toggleService} />
            {selectedServices.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                {selectedServices.map(s => (
                  <span key={s} style={{ fontSize: '9px', padding: '3px 8px', borderRadius: '100px', background: 'rgba(6,214,160,0.12)', color: '#06d6a0', fontFamily: 'var(--font-code)', fontWeight: '600' }}>{s}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right - Company + Preview */}
        <div>
          <div className="liquid-glass" style={{ padding: '16px', borderRadius: '10px', marginBottom: '12px' }}>
            <div style={{ fontSize: '10px', fontWeight: '600', color: '#4f8eff', marginBottom: '12px', fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Company Column</div>
            <MultiSelect label="Select Pages" color="#4f8eff" options={companyOptions} selected={selectedCompany} onToggle={toggleCompany} />
            {selectedCompany.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                {selectedCompany.map(s => (
                  <span key={s} style={{ fontSize: '9px', padding: '3px 8px', borderRadius: '100px', background: 'rgba(79,142,255,0.12)', color: '#4f8eff', fontFamily: 'var(--font-code)', fontWeight: '600' }}>{s}</span>
                ))}
              </div>
            )}
          </div>

          <div className="liquid-glass" style={{ padding: '16px', borderRadius: '10px' }}>
            <div style={{ fontSize: '10px', fontWeight: '600', color: '#94a3b8', marginBottom: '12px', fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Footer Preview</div>
            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text)', marginBottom: '8px' }}>
                <span style={{ color: '#22c55e' }}>{brandName?.slice(0, 6) || 'techno'}</span>
                <span style={{ color: 'var(--text-muted)' }}>{brandName?.slice(6) || 'ziant'}</span>
              </div>
              <p style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '10px' }}>{brandDesc || 'Description...'}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '9px', fontWeight: '600', color: 'var(--text)', marginBottom: '6px', fontFamily: 'var(--font-code)' }}>services</div>
                  {selectedServices.length > 0 ? selectedServices.map(s => (
                    <div key={s} style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>{s}</div>
                  )) : <div style={{ fontSize: '10px', color: 'var(--text-muted)', opacity: 0.5 }}>No services selected</div>}
                </div>
                <div>
                  <div style={{ fontSize: '9px', fontWeight: '600', color: 'var(--text)', marginBottom: '6px', fontFamily: 'var(--font-code)' }}>company</div>
                  {selectedCompany.length > 0 ? selectedCompany.map(c => (
                    <div key={c} style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>{c}</div>
                  )) : <div style={{ fontSize: '10px', color: 'var(--text-muted)', opacity: 0.5 }}>No pages selected</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
        <button onClick={handleSave} disabled={saving} style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '8px', opacity: saving ? 0.7 : 1 }}>
          <SaveIcon sx={{ fontSize: 16 }} /> {saving ? 'Saving...' : 'Save Footer Settings'}
        </button>
      </div>
    </div>
  )
}
