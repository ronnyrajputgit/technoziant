import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../utils/api'
import { Footer } from '../components/layout/Footer'

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
      <article style={{ maxWidth: '780px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 0)' }}>
        <div style={{ marginBottom: '8px' }}>
          {blog.category && <span className="liquid-glass" style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '100px', fontSize: '10px', fontWeight: '600', color: '#22c55e', fontFamily: "var(--font-code)", letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px' }}>{blog.category}</span>}
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: '800', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '16px', fontFamily: 'var(--font-h)' }}>{blog.title}</h1>
        {blog.excerpt && <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>{blog.excerpt}</p>}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--glass-border)' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #22c55e, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: '#fff' }}>
            {(blog.author_name || 'A')[0].toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '600' }}>{blog.author_name || 'Admin'}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
        </div>

        {blog.cover_image && (
          <div style={{ marginBottom: '40px', borderRadius: '16px', overflow: 'hidden' }}>
            <img src={blog.cover_image} alt={blog.title} style={{ width: '100%', maxHeight: '480px', objectFit: 'cover' }} />
          </div>
        )}

        <div className="blog-content" dangerouslySetInnerHTML={{ __html: renderContent(blog.content) }} />

        {blog.tags && blog.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--glass-border)' }}>
            {blog.tags.map(t => (
              <span key={t} className="liquid-glass" style={{ padding: '5px 14px', borderRadius: '100px', fontSize: '11px', fontWeight: '500', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>#{t}</span>
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

function renderContent(content) {
  if (!content) return ''
  if (typeof content === 'string') return content
  return tiptapToHtml(content)
}

function tiptapToHtml(json) {
  if (!json || !json.type) return ''
  if (json.type === 'text') {
    let text = escapeHtml(json.text || '')
    if (json.marks) {
      for (const mark of json.marks) {
        if (mark.type === 'bold') text = `<strong>${text}</strong>`
        if (mark.type === 'italic') text = `<em>${text}</em>`
        if (mark.type === 'underline') text = `<u>${text}</u>`
        if (mark.type === 'strike') text = `<s>${text}</s>`
        if (mark.type === 'code') text = `<code style="background:rgba(255,255,255,0.08);padding:2px 6px;border-radius:4px;font-size:0.9em">${text}</code>`
        if (mark.type === 'highlight') text = `<mark style="background:rgba(34,197,94,0.3);padding:1px 4px;border-radius:2px">${text}</mark>`
        if (mark.type === 'link') text = `<a href="${escapeHtml(mark.attrs?.href || '')}" target="_blank" rel="noopener" style="color:#22c55e;text-decoration:underline">${text}</a>`
        if (mark.type === 'textStyle') {
          const style = []
          if (mark.attrs?.color) style.push(`color:${mark.attrs.color}`)
          if (mark.attrs?.fontFamily) style.push(`font-family:${mark.attrs.fontFamily}`)
          if (style.length) text = `<span style="${style.join(';')}">${text}</span>`
        }
      }
    }
    return text
  }

  const children = (json.content || []).map(c => tiptapToHtml(c)).join('')
  const textAlign = json.attrs?.textAlign ? `text-align:${json.attrs?.textAlign};` : ''

  switch (json.type) {
    case 'doc': return `<div style="font-size:17px;line-height:1.85;color:var(--text)">${children}</div>`
    case 'paragraph': return `<p style="margin:0 0 1.2em;${textAlign}">${children || '<br>'}</p>`
    case 'heading': {
      const level = json.attrs?.level || 1
      const sizes = { 1: 'clamp(28px, 4vw, 40px)', 2: 'clamp(22px, 3vw, 30px)', 3: 'clamp(18px, 2.5vw, 24px)', 4: '18px' }
      const weights = { 1: '800', 2: '700', 3: '600', 4: '600' }
      return `<h${level} style="font-size:${sizes[level]};font-weight:${weights[level]};margin:2em 0 0.8em;letter-spacing:-0.02em;line-height:1.2;font-family:var(--font-h);${textAlign}">${children}</h${level}>`
    }
    case 'bulletList': return `<ul style="margin:0 0 1.2em;padding-left:1.5em">${children}</ul>`
    case 'orderedList': return `<ol style="margin:0 0 1.2em;padding-left:1.5em">${children}</ol>`
    case 'listItem': return `<li style="margin-bottom:0.4em">${children}</li>`
    case 'blockquote': return `<blockquote style="margin:1.5em 0;padding:16px 24px;border-left:3px solid #22c55e;background:rgba(34,197,94,0.05);border-radius:0 8px 8px 0;font-style:italic;color:var(--text-muted)">${children}</blockquote>`
    case 'codeBlock': {
      return `<pre style="margin:1.5em 0;padding:20px;border-radius:10px;background:rgba(0,0,0,0.3);overflow-x:auto;font-size:14px;line-height:1.6"><code>${children}</code></pre>`
    }
    case 'code': return `<code style="background:rgba(255,255,255,0.08);padding:2px 6px;border-radius:4px;font-size:0.9em">${children}</code>`
    case 'hardBreak': return '<br>'
    case 'horizontalRule': return '<hr style="border:none;border-top:1px solid var(--glass-border);margin:2em 0">'
    case 'image': {
      const src = json.attrs?.src || ''
      const alt = json.attrs?.alt || ''
      return `<figure style="margin:2em 0;text-align:center"><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" style="max-width:100%;border-radius:12px" /><figcaption style="font-size:12px;color:var(--text-muted);margin-top:8px;font-style:italic">${escapeHtml(alt)}</figcaption></figure>`
    }
    case 'youtube': {
      const src = json.attrs?.src || ''
      return `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:2em 0;border-radius:12px"><iframe src="${escapeHtml(src)}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;border-radius:12px" allowfullscreen></iframe></div>`
    }
    case 'table': return `<div style="overflow-x:auto;margin:1.5em 0"><table style="width:100%;border-collapse:collapse">${children}</table></div>`
    case 'tableRow': return `<tr>${children}</tr>`
    case 'tableCell': return `<td style="padding:10px 14px;border:1px solid var(--glass-border)">${children}</td>`
    case 'tableHeader': return `<th style="padding:10px 14px;border:1px solid var(--glass-border);font-weight:600;text-align:left;background:rgba(255,255,255,0.03)">${children}</th>`
    case 'cardBlock': {
      const bg = json.attrs?.bgColor || 'rgba(255,255,255,0.03)'
      const pad = json.attrs?.padding || '24px'
      const rad = json.attrs?.radius || '12px'
      return `<div style="margin:1.5em 0;padding:${pad};border-radius:${rad};background:${bg};border:1px solid var(--glass-border)">${children}</div>`
    }
    case 'columnsBlock': {
      const cols = json.attrs?.cols || 2
      return `<div style="margin:1.5em 0;display:grid;grid-template-columns:repeat(${cols},1fr);gap:12px">${children}</div>`
    }
    case 'resizableImage': {
      const src = json.attrs?.src || ''
      const alt = json.attrs?.alt || ''
      const w = json.attrs?.width || '100%'
      const align = json.attrs?.align || 'center'
      return `<div style="margin:1.5em 0;text-align:${align}"><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" style="width:${w};max-width:100%;border-radius:12px" />${alt ? `<div style="font-size:12px;color:var(--text-muted);margin-top:8px;font-style:italic;text-align:center">${escapeHtml(alt)}</div>` : ''}</div>`
    }
    case 'callout': {
      const calloutStyles = { info: { bg: 'rgba(59,130,246,0.08)', border: '#3b82f6', icon: '💡' }, warning: { bg: 'rgba(245,158,11,0.08)', border: '#f59e0b', icon: '⚠️' }, success: { bg: 'rgba(34,197,94,0.08)', border: '#22c55e', icon: '✅' }, danger: { bg: 'rgba(239,68,68,0.08)', border: '#ef4444', icon: '🚨' }, tip: { bg: 'rgba(168,85,247,0.08)', border: '#a855f7', icon: '🎯' } }
      const cs = calloutStyles[json.attrs?.type || 'info'] || calloutStyles.info
      return `<div style="margin:1.5em 0;padding:16px 20px;border-radius:12px;background:${cs.bg};border-left:3px solid ${cs.border}"><span style="margin-right:8px">${cs.icon}</span>${children}</div>`
    }
    case 'spacer': return `<div style="height:32px"></div>`
    default: return children
  }
}

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}
