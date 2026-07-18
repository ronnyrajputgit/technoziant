import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../utils/api'
import { Footer } from '../components/layout/Footer'
import { renderContent } from '../utils/renderContent'

export function BlogPost() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getBlog(slug).then(setBlog).catch(console.error).finally(() => setLoading(false))
  }, [slug])

  if (loading) return <main style={{ paddingTop: '110px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ fontFamily: "var(--font-code)", color: 'var(--text-muted)' }}>Loading...</p></main>
  if (!blog) return <main style={{ paddingTop: '110px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ textAlign: 'center' }}><h2>Blog not found</h2><Link to="/blog" style={{ color: 'var(--accent)', marginTop: '12px', display: 'inline-block' }}>← Back to Blog</Link></div></main>

  return (
    <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <article style={{ maxWidth: '780px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)' }}>
        <div style={{ marginBottom: '16px' }}>
          {blog.category && <span className="liquid-glass" style={{ display: 'inline-block', padding: '5px 14px', borderRadius: '100px', fontSize: '11px', fontWeight: '600', color: '#22c55e', fontFamily: "var(--font-code)", letterSpacing: '0.05em', textTransform: 'uppercase' }}>{blog.category}</span>}
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: '800', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '20px', fontFamily: 'var(--font-h)', color: 'var(--text)' }}>{blog.title}</h1>
        {blog.excerpt && <p style={{ fontSize: '17px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '28px' }}>{blog.excerpt}</p>}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px', paddingBottom: '24px', borderBottom: '1px solid var(--glass-border)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #22c55e, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: '700', color: '#fff' }}>
            {(blog.author_name || 'A')[0].toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text)' }}>{blog.author_name || 'Admin'}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
        </div>

        {blog.cover_image && (
          <div style={{ marginBottom: '40px', borderRadius: blog.cover_radius || '16px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
            <div style={{ height: `${blog.cover_height || 400}px`, overflow: 'hidden', position: 'relative' }}>
              <img src={blog.cover_image} alt={blog.title} style={{ width: (blog.cover_fit || 'cover') === 'contain' || (blog.cover_fit || 'cover') === 'none' || (blog.cover_fit || 'cover') === 'scale-down' ? 'auto' : '100%', height: (blog.cover_fit || 'cover') === 'contain' || (blog.cover_fit || 'cover') === 'none' || (blog.cover_fit || 'cover') === 'scale-down' ? 'auto' : '100%', maxWidth: '100%', maxHeight: '100%', objectFit: blog.cover_fit || 'cover', objectPosition: `${blog.cover_pos?.x || 50}% ${blog.cover_pos?.y || 50}%`, filter: `brightness(${blog.cover_filter?.brightness || 100}%) contrast(${blog.cover_filter?.contrast || 100}%) blur(${blog.cover_filter?.blur || 0}px) saturate(${blog.cover_filter?.saturate || 100}%)`, transform: `scale(${(blog.cover_zoom || 100) / 100})`, transformOrigin: `${blog.cover_pos?.x || 50}% ${blog.cover_pos?.y || 50}%`, display: 'block' }} />
            </div>
          </div>
        )}

        <div className="blog-content" dangerouslySetInnerHTML={{ __html: renderContent(blog.content) }} />

        {blog.tags && blog.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--glass-border)' }}>
            {blog.tags.map(t => (
              <span key={t} className="liquid-glass" style={{ padding: '6px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: '500', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>#{t}</span>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--glass-border)' }}>
          <Link to="/blog" className="liquid-glass" style={{ display: 'inline-block', padding: '12px 28px', borderRadius: '8px', fontSize: '13px', fontWeight: '500', color: 'var(--text)', textDecoration: 'none', fontFamily: "var(--font-code)" }}>← Back to Blog</Link>
        </div>
      </article>
      <Footer />
    </main>
  )
}
