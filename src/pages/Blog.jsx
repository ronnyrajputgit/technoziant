import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TextReveal } from '../components/ui/TextReveal'
import { WaterDropCard } from '../components/ui/Cards'
import { Footer } from '../components/layout/Footer'
import { api } from '../utils/api'

export function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    api.getPublishedBlogs().then(setPosts).catch(console.error).finally(() => setLoading(false))
  }, [])

  const categories = ['all', ...new Set(posts.map(p => p.category).filter(Boolean))]
  const filtered = selectedCategory === 'all' ? posts : posts.filter(p => p.category === selectedCategory)

  return (
    <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section style={{ padding: '0 clamp(16px, 4vw, 40px)', marginBottom: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>blog</div></TextReveal>
        <TextReveal delay={0.1}><h1 style={{ fontSize: 'clamp(40px, 8vw, 90px)', fontWeight: '700', lineHeight: 0.95, marginBottom: '12px' }}>Latest<br /><span className="text-gradient">Articles</span></h1></TextReveal>
        <TextReveal delay={0.2}><p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '420px', marginBottom: '24px' }}>Insights, tutorials, and stories from our team on building digital products.</p></TextReveal>
        {categories.length > 1 && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={selectedCategory === cat ? 'liquid-glass-strong' : 'liquid-glass'}
                style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '11px', fontWeight: '500', color: 'var(--text)', cursor: 'pointer', fontFamily: "var(--font-code)", textTransform: 'capitalize' }}>
                {cat}
              </button>
            ))}
          </div>
        )}
      </section>

      <section style={{ padding: '0 clamp(16px, 4vw, 40px)', maxWidth: '1400px', margin: '0 auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>Loading articles...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <p style={{ color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>No articles published yet.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '12px' }}>
            {filtered.map(post => (
              <Link to={`/blog/${post.slug}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <WaterDropCard color="#22c55e" style={{ padding: 0, height: '100%' }}>
                  {post.cover_image && (
                    <div style={{ height: '180px', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
                      <img src={post.cover_image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: `${post.cover_pos?.x || 50}% ${post.cover_pos?.y || 50}%` }} />
                    </div>
                  )}
                  <div style={{ padding: '20px' }}>
                    {post.category && <span style={{ fontSize: '9px', fontWeight: '600', color: '#22c55e', fontFamily: "var(--font-code)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>{post.category}</span>}
                    <h3 style={{ fontSize: '17px', fontWeight: '600', lineHeight: 1.3, marginTop: '6px', marginBottom: '8px' }}>{post.title}</h3>
                    {post.excerpt && <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '12px' }}>{post.excerpt}</p>}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>
                      <span>{post.author_name || 'Admin'}</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '10px' }}>
                        {post.tags.slice(0, 3).map(t => (
                          <span key={t} className="liquid-glass" style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '8px', fontWeight: '500', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>#{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </WaterDropCard>
              </Link>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  )
}
