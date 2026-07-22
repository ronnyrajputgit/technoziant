import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../utils/api'
import { CMSSkeleton } from '../../components/ui/Skeleton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import SortIcon from '@mui/icons-material/Sort'
import ArticleIcon from '@mui/icons-material/Article'
import PublishIcon from '@mui/icons-material/Publish'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import CloseIcon from '@mui/icons-material/Close'

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

export function BlogListPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const nav = useNavigate()

  useEffect(() => {
    api.getBlogs().then(setBlogs).catch(console.error).finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    await api.deleteBlog(id)
    setBlogs(blogs.filter(b => b.id !== id))
    setDeleteConfirm(null)
  }

  const togglePublish = async (blog) => {
    const updated = await api.updateBlog(blog.id, { published: !blog.published })
    setBlogs(blogs.map(b => b.id === blog.id ? { ...b, published: updated.published } : b))
  }

  const filteredBlogs = useMemo(() => {
    let result = blogs
    if (filter === 'published') result = result.filter(b => b.published)
    else if (filter === 'drafts') result = result.filter(b => !b.published)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(b => b.title?.toLowerCase().includes(q) || b.category?.toLowerCase().includes(q) || b.tags?.some(t => t.toLowerCase().includes(q)))
    }
    if (sortBy === 'newest') result = [...result].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    else if (sortBy === 'oldest') result = [...result].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    else if (sortBy === 'title') result = [...result].sort((a, b) => a.title.localeCompare(b.title))
    return result
  }, [blogs, filter, search, sortBy])

  const published = blogs.filter(b => b.published).length
  const drafts = blogs.filter(b => !b.published).length

  return (
    <>
      <ConfirmDialog open={!!deleteConfirm} title="Delete Blog?" message={`"${deleteConfirm?.title}" will be permanently deleted.`} onConfirm={() => handleDelete(deleteConfirm.id)} onCancel={() => setDeleteConfirm(null)} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)' }}>blog management</div>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: '700' }}>All Blogs</h1>
        </div>
        <Link to="/dashboard/editor" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', fontSize: '12px', fontWeight: '600', color: '#fff', cursor: 'pointer', background: 'linear-gradient(135deg, #22c55e, #16a34a)', textDecoration: 'none', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '6px' }}><AddIcon sx={{ fontSize: 16 }} /> New Blog</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px', marginBottom: '16px' }}>
        {[
          { label: 'Total', value: blogs.length, color: '#4f8eff' },
          { label: 'Published', value: published, color: '#22c55e' },
          { label: 'Drafts', value: drafts, color: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} className="liquid-glass" style={{ padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: '700', color: s.color, fontFamily: 'var(--font-h)' }}>{s.value}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 200px' }}>
          <SearchIcon sx={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: 'var(--text-muted)' }} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search blogs..."
            style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '12px', outline: 'none', fontFamily: 'var(--font-code)', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {['all', 'published', 'drafts'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '500', cursor: 'pointer', fontFamily: 'var(--font-code)', textTransform: 'capitalize', border: '1px solid var(--glass-border)', background: filter === f ? 'rgba(34,197,94,0.15)' : 'transparent', color: filter === f ? '#22c55e' : 'var(--text-muted)' }}>
              {f}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <SortIcon sx={{ fontSize: 14, color: 'var(--text-muted)' }} />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '11px', fontFamily: 'var(--font-code)', cursor: 'pointer', outline: 'none' }}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}><CMSSkeleton /></div>
      ) : filteredBlogs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontFamily: 'var(--font-code)' }}>No blogs {filter !== 'all' ? `(${filter})` : ''} {search ? `matching "${search}"` : ''} found.</p>
          <Link to="/dashboard/editor" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '600', color: '#fff', cursor: 'pointer', background: 'linear-gradient(135deg, #22c55e, #16a34a)', textDecoration: 'none', fontFamily: 'var(--font-code)' }}>+ Create Blog</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px' }}>
          {filteredBlogs.map(blog => (
            <div key={blog.id} className="liquid-glass" style={{ borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
              {blog.cover_image ? (
                <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                  <img src={blog.cover_image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
                    <span style={{ fontSize: '9px', padding: '3px 10px', borderRadius: '100px', fontWeight: '600', fontFamily: 'var(--font-code)', background: blog.published ? 'rgba(34,197,94,0.9)' : 'rgba(245,158,11,0.9)', color: '#fff', backdropFilter: 'blur(4px)' }}>
                      {blog.published ? 'Live' : 'Draft'}
                    </span>
                  </div>
                </div>
              ) : (
                <div style={{ height: '100px', background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(59,130,246,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <ArticleIcon sx={{ fontSize: 40, color: 'var(--text-muted)', opacity: 0.3 }} />
                  <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
                    <span style={{ fontSize: '9px', padding: '3px 10px', borderRadius: '100px', fontWeight: '600', fontFamily: 'var(--font-code)', background: blog.published ? 'rgba(34,197,94,0.9)' : 'rgba(245,158,11,0.9)', color: '#fff' }}>
                      {blog.published ? 'Live' : 'Draft'}
                    </span>
                  </div>
                </div>
              )}
              <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {blog.category && <span style={{ fontSize: '9px', fontWeight: '600', color: '#22c55e', fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{blog.category}</span>}
                <h3 style={{ fontSize: '14px', fontWeight: '600', lineHeight: 1.3, marginBottom: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{blog.title}</h3>
                {blog.excerpt && <p style={{ fontSize: '11px', lineHeight: 1.5, color: 'var(--text-muted)', marginBottom: '10px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{blog.excerpt}</p>}
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>
                  <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <a href={`/blog/${blog.slug}`} target="_blank" rel="noopener" title="View" style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(34,197,94,0.1)', color: '#22c55e', cursor: 'pointer', display: 'flex', alignItems: 'center', textDecoration: 'none', border: 'none' }}>
                      <VisibilityIcon sx={{ fontSize: 14 }} />
                    </a>
                    <Link to={`/dashboard/editor/${blog.id}`} title="Edit" style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(79,142,255,0.1)', color: '#4f8eff', cursor: 'pointer', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                      <EditIcon sx={{ fontSize: 14 }} />
                    </Link>
                    <button onClick={() => togglePublish(blog)} title={blog.published ? 'Unpublish' : 'Publish'} style={{ padding: '4px 8px', borderRadius: '6px', background: blog.published ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)', color: blog.published ? '#f59e0b' : '#22c55e', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center' }}>
                      {blog.published ? <VisibilityOffIcon sx={{ fontSize: 14 }} /> : <PublishIcon sx={{ fontSize: 14 }} />}
                    </button>
                    <button onClick={() => setDeleteConfirm(blog)} title="Delete" style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center' }}>
                      <DeleteIcon sx={{ fontSize: 14 }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
