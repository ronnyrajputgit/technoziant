import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { api } from '../../utils/api'
import { BlogEditor } from '../../components/editor/BlogEditor'

function ErrorDialog({ error, onClose }) {
  if (!error) return null
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div className="liquid-glass" style={{ width: '100%', maxWidth: '420px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>⚠️</div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text)' }}>Save Failed</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginTop: '2px' }}>Something went wrong</div>
          </div>
        </div>
        <div style={{ padding: '16px 24px' }}>
          <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', color: '#ef4444', fontFamily: "var(--font-code)", wordBreak: 'break-word' }}>{error}</div>
          </div>
          <button onClick={onClose} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: "var(--font-code)" }}>Got it</button>
        </div>
      </div>
    </div>
  )
}

function SuccessDialog({ message, onClose }) {
  if (!message) return null
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div className="liquid-glass" style={{ width: '100%', maxWidth: '420px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>✅</div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text)' }}>Success</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginTop: '2px' }}>{message}</div>
          </div>
        </div>
        <div style={{ padding: '16px 24px' }}>
          <button onClick={onClose} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: "var(--font-code)" }}>OK</button>
        </div>
      </div>
    </div>
  )
}

export function EditorPage() {
  const { id } = useParams()
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const [blogData, setBlogData] = useState({})
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(!!id)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (id) {
      api.getBlogs().then(blogs => {
        const blog = blogs.find(b => b.id === parseInt(id))
        if (blog) setBlogData(blog)
        else navigate('/dashboard')
      }).catch(() => navigate('/dashboard')).finally(() => setLoading(false))
    }
  }, [id, user, navigate])

  const handleSave = async (data) => {
    setSaving(true)
    try {
      if (id) await api.updateBlog(id, data)
      else await api.createBlog(data)
      if (data.published) {
        navigate('/dashboard')
      } else {
        setSuccess('Draft saved successfully!')
      }
    } catch (err) {
      const msg = err.message || 'Something went wrong'
      if (msg.includes('Request Entity Too Large') || msg.includes('too large')) {
        setError('Content is too large. Try reducing image sizes or removing some media.')
      } else if (msg.includes('JSON')) {
        setError('Invalid data format. Please try again.')
      } else if (msg.includes('fetch') || msg.includes('network')) {
        setError('Network error. Please check your connection and try again.')
      } else {
        setError(msg)
      }
    }
    finally { setSaving(false) }
  }

  if (!user) return null

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <ErrorDialog error={error} onClose={() => setError(null)} />
      <SuccessDialog message={success} onClose={() => setSuccess(null)} />
      <aside style={{ width: '240px', minWidth: '240px', background: 'var(--bg-2)', borderRight: '1px solid var(--glass-border)', height: '100vh', position: 'sticky', top: 0, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--glass-border)' }}>
          <div style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'var(--font-h)', marginBottom: '4px' }}>Editor</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{id ? 'Edit Mode' : 'New Blog'}</div>
        </div>
        <nav style={{ flex: 1, padding: '12px 8px' }}>
          {[
            { to: '/dashboard', icon: '📊', label: 'Overview' },
            { to: '/dashboard/editor', icon: '✏️', label: 'New Blog' },
          ].map(link => (
            <Link key={link.to} to={link.to}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', color: location.pathname === link.to ? '#22c55e' : 'var(--text)', textDecoration: 'none', marginBottom: '2px', background: location.pathname === link.to ? 'rgba(34,197,94,0.08)' : 'transparent', fontWeight: location.pathname === link.to ? '600' : '400' }}>
              <span>{link.icon}</span><span>{link.label}</span>
            </Link>
          ))}
        </nav>
        <div style={{ padding: '12px 8px', borderTop: '1px solid var(--glass-border)' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2px' }}>
            <span>🏠</span><span>Home</span>
          </Link>
          <button onClick={() => { logout(); navigate('/') }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', color: '#ef4444', width: '100%', cursor: 'pointer', border: 'none', background: 'transparent', fontFamily: "var(--font-code)" }}>
            <span>🚪</span><span>Logout</span>
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, overflow: 'auto' }}>
        {loading ? <p style={{ textAlign: 'center', fontFamily: "var(--font-code)", color: 'var(--text-muted)', paddingTop: '40px' }}>Loading...</p> : (
          <BlogEditor initialContent={blogData} onSave={handleSave} saving={saving} />
        )}
      </main>
    </div>
  )
}
