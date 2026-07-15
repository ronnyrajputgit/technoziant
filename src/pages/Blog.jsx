import { useState } from 'react'
import { motion } from 'framer-motion'
import { TextReveal } from '../components/ui/TextReveal'
import { WaterDropCard } from '../components/ui/Cards'
import { Footer } from '../components/layout/Footer'

const blogPosts = [
  { id: 1, title: 'Building Scalable Web Applications with Next.js', excerpt: 'Learn how we build high-performance web applications using Next.js, React, and modern deployment strategies.', date: '2026-01-15', tag: 'Web Development', color: '#22c55e', readTime: '5 min' },
  { id: 2, title: 'Mobile App Development: React Native vs Flutter', excerpt: 'A comprehensive comparison of React Native and Flutter for cross-platform mobile development.', date: '2026-01-10', tag: 'Mobile', color: '#3b82f6', readTime: '8 min' },
  { id: 3, title: 'Cloud DevOps Best Practices for 2026', excerpt: 'Essential DevOps practices including CI/CD, containerization, and infrastructure as code.', date: '2026-01-05', tag: 'DevOps', color: '#a855f7', readTime: '6 min' },
  { id: 4, title: 'AI Integration in Modern Web Applications', excerpt: 'How to integrate AI and machine learning capabilities into your web applications.', date: '2025-12-28', tag: 'AI/ML', color: '#f59e0b', readTime: '7 min' },
  { id: 5, title: 'UI/UX Design Trends for Digital Products', excerpt: 'Latest design trends and best practices for creating intuitive user experiences.', date: '2025-12-20', tag: 'Design', color: '#f472b6', readTime: '4 min' },
  { id: 6, title: 'Startup MVP Development Guide', excerpt: 'Step-by-step guide to building your minimum viable product from concept to launch.', date: '2025-12-15', tag: 'Startups', color: '#06d6a0', readTime: '10 min' }
]

export function Blog() {
  const [selectedPost, setSelectedPost] = useState(null)
  const [editorContent, setEditorContent] = useState('')

  return (
    <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section className="container" style={{ marginBottom: '24px' }}>
        <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>blog</div></TextReveal>
        <TextReveal delay={0.1}><h1 style={{ fontSize: 'clamp(36px, 7vw, 80px)', fontWeight: '700', lineHeight: 0.95, marginBottom: '12px' }}>Insights & <span className="text-gradient">Updates</span></h1></TextReveal>
        <TextReveal delay={0.2}><p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '420px' }}>Latest thoughts on technology, design, and digital innovation.</p></TextReveal>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px' }}>
            {blogPosts.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}>
                <WaterDropCard color={post.color} style={{ padding: 0, cursor: 'pointer' }}
                  onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}>
                  <div style={{ padding: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '9px', padding: '3px 8px', borderRadius: '4px', background: `${post.color}15`, color: post.color, fontFamily: "var(--font-code)" }}>{post.tag}</span>
                      <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{post.readTime}</span>
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '6px', lineHeight: 1.3 }}>{post.title}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '8px' }}>{post.excerpt}</p>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{post.date}</div>
                  </div>
                </WaterDropCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Editor */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <TextReveal><div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: "var(--font-code)" }}>write</div></TextReveal>
            <TextReveal delay={0.1}><h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: '700', lineHeight: 1 }}>Start <span className="text-gradient">Writing</span></h2></TextReveal>
          </div>

          <div className="liquid-glass" style={{ borderRadius: '10px', overflow: 'hidden', maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 14px', borderBottom: '1px solid var(--glass-border)', background: 'var(--surface)' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#28c840' }} />
              <span style={{ marginLeft: '8px', fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>editor.md</span>
            </div>
            <div style={{ padding: '16px' }}>
              <textarea
                value={editorContent}
                onChange={e => setEditorContent(e.target.value)}
                placeholder="Start writing your blog post..."
                style={{
                  width: '100%', minHeight: '200px', background: 'transparent', border: 'none',
                  color: 'var(--text)', fontSize: '13px', lineHeight: '22px', outline: 'none',
                  fontFamily: "var(--font-code)", resize: 'vertical'
                }}
              />
            </div>
            <div style={{ padding: '10px 16px', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{editorContent.length} characters</span>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                style={{ padding: '8px 16px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', color: '#fff', background: 'linear-gradient(135deg, #22c55e, #16a34a)', fontFamily: "var(--font-code)" }}>
                {'>'} publish
              </motion.button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
