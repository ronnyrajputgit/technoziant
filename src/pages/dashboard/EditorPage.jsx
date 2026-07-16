import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { api } from '../../utils/api'
import { BlogEditor } from '../../components/editor/BlogEditor'

export function EditorPage() {
  const { id } = useParams()
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const [blogData, setBlogData] = useState({})
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(!!id)

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
      navigate('/dashboard')
    } catch (err) { alert('Error: ' + err.message) }
    finally { setSaving(false) }
  }

  if (!user) return null

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
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
