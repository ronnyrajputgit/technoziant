import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { api } from '../../utils/api'

const sidebarLinks = [
  { path: '/dashboard', label: 'Overview', icon: '📊' },
  { path: '/dashboard/editor', label: 'New Blog', icon: '✏️' },
  { path: '/blog', label: 'View Blog', icon: '👁', external: true },
  { path: '/', label: 'Home', icon: '🏠', external: true },
]

function Sidebar({ open, onClose }) {
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      {open && <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40, display: 'none' }} className="sidebar-overlay" />}
      <aside style={{ width: open ? '240px' : '0', minWidth: open ? '240px' : '0', background: 'var(--bg-2)', borderRight: '1px solid var(--glass-border)', height: '100vh', position: 'sticky', top: 0, overflow: 'hidden', transition: 'all 0.3s', zIndex: 50, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--glass-border)' }}>
          <div style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'var(--font-h)', marginBottom: '4px' }}>Dashboard</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{user?.name || 'Admin'}</div>
        </div>
        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          {sidebarLinks.map(link => {
            const isActive = !link.external && location.pathname === link.path
            if (link.external) {
              return (
                <a key={link.path} href={link.path} target={link.path === '/' ? '_self' : '_blank'} rel="noopener"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2px', transition: 'all 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <span>{link.icon}</span><span>{link.label}</span>
                </a>
              )
            }
            return (
              <Link key={link.path} to={link.path}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', color: isActive ? '#22c55e' : 'var(--text)', textDecoration: 'none', marginBottom: '2px', background: isActive ? 'rgba(34,197,94,0.08)' : 'transparent', fontWeight: isActive ? '600' : '400', transition: 'all 0.15s' }}
                onMouseEnter={e => !isActive && (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')} onMouseLeave={e => !isActive && (e.currentTarget.style.background = 'transparent')}>
                <span>{link.icon}</span><span>{link.label}</span>
              </Link>
            )
          })}
        </nav>
        <div style={{ padding: '12px 8px', borderTop: '1px solid var(--glass-border)' }}>
          <button onClick={() => { logout(); navigate('/') }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', color: '#ef4444', width: '100%', cursor: 'pointer', border: 'none', background: 'transparent', fontFamily: "var(--font-code)" }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <span>🚪</span><span>Logout</span>
          </button>
        </div>
      </aside>
      <style>{`@media (max-width: 768px) { .sidebar-overlay { display: block !important; } }`}</style>
    </>
  )
}

export function Dashboard() {
  const { user } = useApp()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [filter, setFilter] = useState('all')
  const nav = useNavigate()

  useEffect(() => {
    if (!user) { nav('/login'); return }
    api.getBlogs().then(setBlogs).catch(console.error).finally(() => setLoading(false))
  }, [user, nav])

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog?')) return
    await api.deleteBlog(id)
    setBlogs(blogs.filter(b => b.id !== id))
  }

  const togglePublish = async (blog) => {
    const updated = await api.updateBlog(blog.id, { published: !blog.published })
    setBlogs(blogs.map(b => b.id === blog.id ? { ...b, published: updated.published } : b))
  }

  if (!user) return null

  const published = blogs.filter(b => b.published).length
  const drafts = blogs.filter(b => !b.published).length
  const filteredBlogs = filter === 'all' ? blogs : filter === 'published' ? blogs.filter(b => b.published) : blogs.filter(b => !b.published)

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main style={{ flex: 1, paddingTop: '20px', paddingBottom: '40px', overflow: 'auto' }}>
        <div style={{ padding: '0 clamp(16px, 4vw, 32px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', cursor: 'pointer', fontSize: '14px', transition: 'transform 0.3s', transform: sidebarOpen ? 'rotate(0deg)' : 'rotate(180deg)' }}>◀</button>
              <div>
                <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: "var(--font-code)" }}>overview</div>
                <h1 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: '700' }}>Welcome, {user.name}</h1>
              </div>
            </div>
            <Link to="/dashboard/editor" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', fontSize: '12px', fontWeight: '600', color: '#fff', cursor: 'pointer', background: 'linear-gradient(135deg, #22c55e, #16a34a)', textDecoration: 'none', fontFamily: "var(--font-code)" }}>+ New Blog</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', marginBottom: '28px' }}>
            {[
              { label: 'Total', value: blogs.length, color: '#4f8eff' },
              { label: 'Published', value: published, color: '#22c55e' },
              { label: 'Drafts', value: drafts, color: '#f59e0b' }
            ].map((s, i) => (
              <div key={i} className="liquid-glass" style={{ padding: '18px', borderRadius: '10px' }}>
                <div style={{ fontSize: '26px', fontWeight: '700', color: s.color, fontFamily: 'var(--font-h)' }}>{s.value}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
            {['all', 'published', 'drafts'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '11px', fontWeight: '500', cursor: 'pointer', fontFamily: "var(--font-code)", textTransform: 'capitalize', border: '1px solid var(--glass-border)', background: filter === f ? 'rgba(34,197,94,0.15)' : 'transparent', color: filter === f ? '#22c55e' : 'var(--text-muted)' }}>
                {f}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>Loading...</div>
          ) : filteredBlogs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontFamily: "var(--font-code)" }}>No blogs {filter !== 'all' ? `(${filter})` : ''} yet.</p>
              <Link to="/dashboard/editor" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '600', color: '#fff', cursor: 'pointer', background: 'linear-gradient(135deg, #22c55e, #16a34a)', textDecoration: 'none', fontFamily: "var(--font-code)" }}>+ Create Blog</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {filteredBlogs.map(blog => (
                <div key={blog.id} className="liquid-glass" style={{ padding: '14px 18px', borderRadius: '10px', display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '12px', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '3px' }}>{blog.title}</h3>
                    <div style={{ display: 'flex', gap: '10px', fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>
                      <span>{blog.category || 'Uncategorized'}</span><span>{new Date(blog.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '9px', padding: '3px 10px', borderRadius: '100px', fontWeight: '600', fontFamily: "var(--font-code)", background: blog.published ? 'rgba(34,197,94,0.15)' : 'rgba(245,158,11,0.15)', color: blog.published ? '#22c55e' : '#f59e0b' }}>
                    {blog.published ? 'Live' : 'Draft'}
                  </span>
                  <button onClick={() => togglePublish(blog)} style={{ fontSize: '10px', padding: '5px 12px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', cursor: 'pointer', fontFamily: "var(--font-code)" }}>
                    {blog.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <Link to={`/dashboard/editor/${blog.id}`} style={{ fontSize: '10px', padding: '5px 12px', borderRadius: '6px', background: 'rgba(79,142,255,0.15)', color: '#4f8eff', textDecoration: 'none', fontFamily: "var(--font-code)" }}>Edit</Link>
                    <button onClick={() => handleDelete(blog.id)} style={{ fontSize: '10px', padding: '5px 12px', borderRadius: '6px', background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: 'none', cursor: 'pointer', fontFamily: "var(--font-code)" }}>Del</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
