import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { api } from '../../utils/api'

export function Dashboard() {
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    api.getBlogs().then(setBlogs).catch(console.error).finally(() => setLoading(false))
  }, [user, navigate])

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

  return (
    <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>dashboard</div>
            <h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: '700' }}>Welcome, {user.name}</h1>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link to="/dashboard/editor" className="liquid-glass-strong" style={{ padding: '10px 20px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: 'var(--text)', textDecoration: 'none', fontFamily: "var(--font-code)" }}>+ New Blog</Link>
            <button onClick={() => { logout(); navigate('/') }} className="liquid-glass" style={{ padding: '10px 20px', borderRadius: '8px', fontSize: '12px', fontWeight: '500', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: "var(--font-code)" }}>Logout</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', marginBottom: '32px' }}>
          {[
            { label: 'Total Blogs', value: blogs.length, color: '#4f8eff' },
            { label: 'Published', value: published, color: '#22c55e' },
            { label: 'Drafts', value: drafts, color: '#f59e0b' }
          ].map((s, i) => (
            <div key={i} className="liquid-glass" style={{ padding: '20px', borderRadius: '10px' }}>
              <div style={{ fontSize: '28px', fontWeight: '700', color: s.color, fontFamily: 'var(--font-h)' }}>{s.value}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>Loading...</div>
        ) : blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontFamily: "var(--font-code)" }}>No blogs yet. Create your first one!</p>
            <Link to="/dashboard/editor" className="liquid-glass-strong" style={{ padding: '12px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: 'var(--text)', textDecoration: 'none', fontFamily: "var(--font-code)" }}>+ Create Blog</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {blogs.map(blog => (
              <div key={blog.id} className="liquid-glass" style={{ padding: '16px 20px', borderRadius: '10px', display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '12px', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>{blog.title}</h3>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>
                    <span>{blog.category || 'Uncategorized'}</span>
                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <span style={{ fontSize: '10px', padding: '4px 10px', borderRadius: '100px', fontWeight: '600', fontFamily: "var(--font-code)", background: blog.published ? 'rgba(34,197,94,0.15)' : 'rgba(245,158,11,0.15)', color: blog.published ? '#22c55e' : '#f59e0b' }}>
                  {blog.published ? 'Published' : 'Draft'}
                </span>
                <button onClick={() => togglePublish(blog)} style={{ fontSize: '10px', padding: '6px 14px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', cursor: 'pointer', fontFamily: "var(--font-code)" }}>
                  {blog.published ? 'Unpublish' : 'Publish'}
                </button>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <Link to={`/dashboard/editor/${blog.id}`} style={{ fontSize: '10px', padding: '6px 14px', borderRadius: '6px', background: 'rgba(79,142,255,0.15)', color: '#4f8eff', textDecoration: 'none', fontFamily: "var(--font-code)" }}>Edit</Link>
                  <button onClick={() => handleDelete(blog.id)} style={{ fontSize: '10px', padding: '6px 14px', borderRadius: '6px', background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: 'none', cursor: 'pointer', fontFamily: "var(--font-code)" }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
