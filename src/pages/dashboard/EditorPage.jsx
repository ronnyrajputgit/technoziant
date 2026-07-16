import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { api } from '../../utils/api'
import { BlogEditor } from '../../components/editor/BlogEditor'

export function EditorPage() {
  const { id } = useParams()
  const { user } = useApp()
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
      if (id) {
        await api.updateBlog(id, data)
      } else {
        await api.createBlog(data)
      }
      navigate('/dashboard')
    } catch (err) {
      alert('Error saving: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <main style={{ paddingTop: '100px', textAlign: 'center' }}><p style={{ fontFamily: "var(--font-code)" }}>Loading editor...</p></main>
  if (!user) return null

  return (
    <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: "var(--font-code)" }}>{id ? 'edit_blog' : 'new_blog'}</div>
            <h1 style={{ fontSize: '24px', fontWeight: '700' }}>{id ? 'Edit Blog' : 'Create New Blog'}</h1>
          </div>
          <button onClick={() => navigate('/dashboard')} className="liquid-glass" style={{ padding: '8px 16px', borderRadius: '6px', fontSize: '11px', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: "var(--font-code)" }}>← Back</button>
        </div>
        <BlogEditor initialContent={blogData} onSave={handleSave} saving={saving} />
      </div>
    </main>
  )
}
