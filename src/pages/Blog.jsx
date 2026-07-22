import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { TextReveal } from '../components/ui/TextReveal'
import { Footer } from '../components/layout/Footer'
import { api } from '../utils/api'
import { renderContent } from '../utils/renderContent'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { Skeleton } from '@mui/material'

export function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    api.getPublishedBlogs().then(setPosts).catch(console.error).finally(() => setLoading(false))
  }, [])

  const categories = useMemo(() => ['all', ...new Set(posts.map(p => p.category).filter(Boolean))], [posts])
  const years = useMemo(() => ['all', ...new Set(posts.map(p => new Date(p.created_at).getFullYear()).filter(Boolean))].sort((a, b) => b - a), [posts])

  const filtered = useMemo(() => {
    let result = posts
    if (selectedCategory !== 'all') result = result.filter(p => p.category === selectedCategory)
    if (selectedYear !== 'all') result = result.filter(p => new Date(p.created_at).getFullYear() === selectedYear)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p => p.title?.toLowerCase().includes(q) || p.excerpt?.toLowerCase().includes(q) || p.tags?.some(t => t.toLowerCase().includes(q)))
    }
    if (sortBy === 'newest') result = [...result].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    else if (sortBy === 'oldest') result = [...result].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    else if (sortBy === 'title') result = [...result].sort((a, b) => a.title.localeCompare(b.title))
    return result
  }, [posts, selectedCategory, selectedYear, sortBy, search])

  return (
    <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: '0 clamp(16px, 4vw, 40px)', marginBottom: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>blog</div></TextReveal>
        <TextReveal delay={0.1}><h1 style={{ fontSize: 'clamp(40px, 8vw, 90px)', fontWeight: '700', lineHeight: 0.95, marginBottom: '12px' }}>Latest<br /><span className="text-gradient">Articles</span></h1></TextReveal>
        <TextReveal delay={0.2}><p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '420px', marginBottom: '24px' }}>Insights, tutorials, and stories from our team on building digital products.</p></TextReveal>
      </section>

      {/* Filters & Search */}
      <section style={{ padding: '0 clamp(16px, 4vw, 40px)', maxWidth: '1400px', margin: '0 auto 20px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1 1 200px', maxWidth: '300px' }}>
            <SearchIcon sx={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: 'var(--text-muted)' }} />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..."
              style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '12px', outline: 'none', fontFamily: "var(--font-code)", boxSizing: 'border-box' }} />
          </div>

          {/* Category Filters */}
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                style={{ padding: '5px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '500', cursor: 'pointer', fontFamily: "var(--font-code)", textTransform: 'capitalize', border: '1px solid var(--glass-border)', background: selectedCategory === cat ? 'rgba(34,197,94,0.15)' : 'transparent', color: selectedCategory === cat ? '#22c55e' : 'var(--text-muted)', transition: 'all 0.15s' }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Year Filters */}
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {years.map(y => (
              <button key={y} onClick={() => setSelectedYear(y)}
                style={{ padding: '5px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '500', cursor: 'pointer', fontFamily: "var(--font-code)", border: '1px solid var(--glass-border)', background: selectedYear === y ? 'rgba(59,130,246,0.15)' : 'transparent', color: selectedYear === y ? '#3b82f6' : 'var(--text-muted)', transition: 'all 0.15s' }}>
                {y === 'all' ? 'All Years' : y}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '11px', fontFamily: "var(--font-code)", cursor: 'pointer', outline: 'none' }}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginTop: '8px' }}>
          {filtered.length} article{filtered.length !== 1 ? 's' : ''} found
        </div>
      </section>

      {/* Blog Grid */}
      <section style={{ padding: '0 clamp(16px, 4vw, 40px)', maxWidth: '1400px', margin: '0 auto' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="liquid-glass" style={{ borderRadius: '10px', overflow: 'hidden', padding: '12px', display: 'flex', gap: '12px' }}>
                <Skeleton variant="rounded" width={80} height={80} sx={{ borderRadius: 1, flexShrink: 0, bgcolor: 'rgba(255,255,255,0.06)' }} animation="wave" />
                <div style={{ flex: 1 }}>
                  <Skeleton variant="text" width="40%" height={10} sx={{ mb: 0.5, bgcolor: 'rgba(255,255,255,0.06)' }} animation="wave" />
                  <Skeleton variant="text" width="90%" height={14} sx={{ mb: 0.5, bgcolor: 'rgba(255,255,255,0.06)' }} animation="wave" />
                  <Skeleton variant="text" width="100%" height={10} sx={{ mb: 0.5, bgcolor: 'rgba(255,255,255,0.06)' }} animation="wave" />
                  <Skeleton variant="text" width="70%" height={10} sx={{ mb: 1, bgcolor: 'rgba(255,255,255,0.06)' }} animation="wave" />
                  <div style={{ display: 'flex', gap: 4 }}>
                    <Skeleton variant="rounded" width={40} height={14} sx={{ borderRadius: 0.5, bgcolor: 'rgba(255,255,255,0.06)' }} animation="wave" />
                    <Skeleton variant="rounded" width={50} height={14} sx={{ borderRadius: 0.5, bgcolor: 'rgba(255,255,255,0.06)' }} animation="wave" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <p style={{ color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>No articles found.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
            {filtered.map(post => (
              <div key={post.id} className="liquid-glass" style={{ borderRadius: '10px', overflow: 'hidden', transition: 'all 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                {/* Compact Card */}
                <div style={{ display: 'flex', gap: '12px', padding: '12px' }}>
                  {post.cover_image && (
                    <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={post.cover_image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: `${post.cover_pos?.x || 50}% ${post.cover_pos?.y || 50}%` }} />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '4px' }}>
                      {post.category && <span style={{ fontSize: '9px', fontWeight: '600', color: '#22c55e', fontFamily: "var(--font-code)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>{post.category}</span>}
                      <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <h3 style={{ fontSize: '13px', fontWeight: '600', lineHeight: 1.3, marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.title}</h3>
                    {post.excerpt && <p style={{ fontSize: '11px', lineHeight: 1.4, color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: expandedId === post.id ? 10 : 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '6px' }}>{post.excerpt}</p>}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '6px' }}>
                      <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap', maxWidth: '60%' }}>
                        {post.tags && post.tags.slice(0, 2).map(t => (
                          <span key={t} style={{ padding: '1px 5px', borderRadius: '3px', fontSize: '8px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontFamily: "var(--font-code)", whiteSpace: 'nowrap' }}>#{t}</span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '3px', alignItems: 'center', flexShrink: 0 }}>
                        <button onClick={(e) => { e.stopPropagation(); setExpandedId(expandedId === post.id ? null : post.id) }} title={expandedId === post.id ? 'Less' : 'More'}
                          style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '9px', display: 'flex', alignItems: 'center', gap: '2px', fontFamily: "var(--font-code)" }}>
                          {expandedId === post.id ? <ExpandLessIcon sx={{ fontSize: 10 }} /> : <ExpandMoreIcon sx={{ fontSize: 10 }} />}
                        </button>
                        <Link to={`/blog/${post.slug}`} title="Read" onClick={e => e.stopPropagation()}
                          style={{ padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.1)', color: '#22c55e', fontSize: '9px', cursor: 'pointer', fontFamily: "var(--font-code)", textDecoration: 'none', whiteSpace: 'nowrap' }}>
                          Read →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedId === post.id && (
                  <div style={{ padding: '0 12px 12px', borderTop: '1px solid var(--glass-border)' }}>
                    <div className="blog-content" style={{ fontSize: '13px', lineHeight: 1.6, maxHeight: '200px', overflow: 'auto', padding: '8px 0' }}
                      dangerouslySetInnerHTML={{ __html: renderContent(post.content) }} />
                    <div style={{ textAlign: 'center', marginTop: '8px' }}>
                      <Link to={`/blog/${post.slug}`} style={{ padding: '6px 16px', borderRadius: '6px', border: 'none', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: "var(--font-code)", textDecoration: 'none', display: 'inline-block' }}>
                        Read Full Article →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  )
}
