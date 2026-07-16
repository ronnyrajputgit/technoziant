import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Youtube from '@tiptap/extension-youtube'
import Blockquote from '@tiptap/extension-blockquote'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'
import { CardBlock, ColumnsBlock, ResizableImage, Callout, Spacer } from './CustomExtensions'
import { useState, useCallback, useEffect, useRef } from 'react'

function MediaModal({ open, onClose, onInsert, type }) {
  const [tab, setTab] = useState('url')
  const [url, setUrl] = useState('')
  const [alt, setAlt] = useState('')
  const fileRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  useEffect(() => { if (open) { setUrl(''); setAlt(''); setTab('url') } }, [open])

  if (!open) return null

  const handleFile = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      onInsert(type === 'video' ? { type: 'video', src: reader.result, alt: file.name } : { type: 'image', src: reader.result, alt: file.name })
      onClose()
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith(type === 'video' ? 'video/' : 'image/')) handleFile(file)
  }

  const handleInsert = () => {
    if (!url.trim()) return
    if (type === 'video') {
      const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/)
      const src = ytMatch ? `https://www.youtube.com/embed/${ytMatch[1]}` : url
      onInsert({ type: 'video', src, alt })
    } else {
      onInsert({ type: 'image', src: url.trim(), alt })
    }
    onClose()
  }

  const accept = type === 'video' ? 'video/*' : 'image/*'

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="liquid-glass" style={{ width: '100%', maxWidth: '480px', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600' }}>{type === 'video' ? 'Insert Video' : 'Insert Image'}</h3>
          <button onClick={onClose} style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px' }}>✕</button>
        </div>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)' }}>
          <button onClick={() => setTab('url')} style={{ flex: 1, padding: '10px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', border: 'none', borderBottom: tab === 'url' ? '2px solid #22c55e' : '2px solid transparent', background: 'transparent', color: tab === 'url' ? '#22c55e' : 'var(--text-muted)', fontFamily: "var(--font-code)" }}>URL</button>
          <button onClick={() => setTab('upload')} style={{ flex: 1, padding: '10px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', border: 'none', borderBottom: tab === 'upload' ? '2px solid #22c55e' : '2px solid transparent', background: 'transparent', color: tab === 'upload' ? '#22c55e' : 'var(--text-muted)', fontFamily: "var(--font-code)" }}>Upload</button>
        </div>
        <div style={{ padding: '20px' }}>
          {tab === 'url' ? (
            <div>
              <input type="text" value={url} onChange={e => setUrl(e.target.value)} autoFocus
                placeholder={type === 'video' ? 'YouTube URL or video URL...' : 'Image URL...'}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '13px', outline: 'none', boxSizing: 'border-box', marginBottom: '10px' }}
                onKeyDown={e => e.key === 'Enter' && handleInsert()} />
              <input type="text" value={alt} onChange={e => setAlt(e.target.value)} placeholder="Alt text / caption (optional)"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '13px', outline: 'none', boxSizing: 'border-box', marginBottom: '16px' }} />
              {url && type === 'video' && url.includes('youtube') && (
                <div style={{ marginBottom: '16px', borderRadius: '8px', overflow: 'hidden', aspectRatio: '16/9' }}>
                  <iframe src={url.includes('embed') ? url : `https://www.youtube.com/embed/${url.match(/v=([^&]+)/)?.[1] || ''}`}
                    style={{ width: '100%', height: '100%', border: 'none' }} allowFullScreen />
                </div>
              )}
              {url && type === 'image' && (
                <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                  <img src={url} alt={alt} style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} onError={e => e.target.style.display = 'none'} />
                </div>
              )}
              <button onClick={handleInsert} disabled={!url.trim()}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: url.trim() ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'var(--glass)', color: url.trim() ? '#fff' : 'var(--text-muted)', fontSize: '13px', fontWeight: '600', cursor: url.trim() ? 'pointer' : 'not-allowed', fontFamily: "var(--font-code)" }}>
                Insert
              </button>
            </div>
          ) : (
            <div onDragOver={e => { e.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              style={{ border: `2px dashed ${dragging ? '#22c55e' : 'var(--glass-border)'}`, borderRadius: '12px', padding: '40px 20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', background: dragging ? 'rgba(34,197,94,0.05)' : 'transparent' }}>
              <input ref={fileRef} type="file" accept={accept} onChange={e => handleFile(e.target.files?.[0])} style={{ display: 'none' }} />
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{type === 'video' ? '🎬' : '🖼'}</div>
              <p style={{ fontSize: '13px', color: 'var(--text)', marginBottom: '4px' }}>Click or drag {type === 'video' ? 'video' : 'image'} here</p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{accept}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function LinkModal({ open, onClose, onInsert }) {
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')

  useEffect(() => { if (open) { setUrl(''); setText('') } }, [open])

  if (!open) return null

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="liquid-glass" style={{ width: '100%', maxWidth: '400px', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600' }}>Insert Link</h3>
          <button onClick={onClose} style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px' }}>✕</button>
        </div>
        <div style={{ padding: '20px' }}>
          <input type="text" value={url} onChange={e => setUrl(e.target.value)} autoFocus placeholder="https://example.com"
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '13px', outline: 'none', boxSizing: 'border-box', marginBottom: '10px' }}
            onKeyDown={e => e.key === 'Enter' && handleInsert()} />
          <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Link text (optional)"
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '13px', outline: 'none', boxSizing: 'border-box', marginBottom: '16px' }} />
          <button onClick={() => { if (url.trim()) { onInsert(url.trim(), text); onClose() } }} disabled={!url.trim()}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: url.trim() ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'var(--glass)', color: url.trim() ? '#fff' : 'var(--text-muted)', fontSize: '13px', fontWeight: '600', cursor: url.trim() ? 'pointer' : 'not-allowed', fontFamily: "var(--font-code)" }}>
            Insert Link
          </button>
        </div>
      </div>
    </div>
  )
}

const ToolBar = ({ editor }) => {
  const [showInsert, setShowInsert] = useState(false)
  const [showColor, setShowColor] = useState(false)
  const [mediaModal, setMediaModal] = useState({ open: false, type: 'image' })
  const [linkModal, setLinkModal] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) { setShowInsert(false); setShowColor(false) } }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (!editor) return null

  const insertBlock = (type) => {
    switch (type) {
      case 'card': editor.chain().focus().insertContent({ type: 'cardBlock', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Card content...' }] }] }).run(); break
      case 'columns2': editor.chain().focus().insertContent({ type: 'columnsBlock', attrs: { cols: 2 }, content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Column 1' }] }, { type: 'paragraph', content: [{ type: 'text', text: 'Column 2' }] }] }).run(); break
      case 'columns3': editor.chain().focus().insertContent({ type: 'columnsBlock', attrs: { cols: 3 }, content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Col 1' }] }, { type: 'paragraph', content: [{ type: 'text', text: 'Col 2' }] }, { type: 'paragraph', content: [{ type: 'text', text: 'Col 3' }] }] }).run(); break
      case 'callout': editor.chain().focus().insertContent({ type: 'callout', attrs: { type: 'info' }, content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Important information...' }] }] }).run(); break
      case 'spacer': editor.chain().focus().insertContent({ type: 'spacer' }).run(); break
      case 'image': setMediaModal({ open: true, type: 'image' }); break
      case 'youtube': setMediaModal({ open: true, type: 'video' }); break
      case 'hr': editor.chain().focus().setHorizontalRule().run(); break
      case 'table': editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run(); break
      case 'codeblock': editor.chain().focus().toggleCodeBlock().run(); break
    }
    setShowInsert(false)
  }

  const handleMediaInsert = (data) => {
    if (data.type === 'video') {
      editor.commands.setYoutubeVideo({ src: data.src })
    } else {
      editor.chain().focus().insertContent({ type: 'resizableImage', attrs: { src: data.src, alt: data.alt } }).run()
    }
  }

  const btn = (active, onClick, label, title) => <ToolbarButton key={label} active={active} onClick={onClick} label={label} title={title} />

  return (
    <>
      <MediaModal open={mediaModal.open} onClose={() => setMediaModal({ ...mediaModal, open: false })} onInsert={handleMediaInsert} type={mediaModal.type} />
      <LinkModal open={linkModal} onClose={() => setLinkModal(false)} onInsert={(url, text) => {
        if (text) { editor.chain().focus().insertContent(text).setLink({ href: url }).run() }
        else { editor.chain().focus().setLink({ href: url }).run() }
      }} />
      <div ref={ref} style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--bg)', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1px', padding: '6px 10px', alignItems: 'center' }}>
          <select onChange={e => { const v = e.target.value; if (v === 'p') editor.chain().focus().setParagraph().run(); else editor.chain().focus().toggleHeading({ level: parseInt(v) }).run(); e.target.value = '' }}
            style={{ padding: '4px 6px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '10px', fontFamily: "var(--font-code)", cursor: 'pointer', marginRight: '4px' }}>
            <option value="">Format</option>
            <option value="p">Paragraph</option><option value="1">H1</option><option value="2">H2</option><option value="3">H3</option><option value="4">H4</option>
          </select>
          <select onChange={e => editor.chain().focus().setFontFamily(e.target.value).run()}
            style={{ padding: '4px 6px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '10px', fontFamily: "var(--font-code)", cursor: 'pointer' }}>
            <option value="">Font</option><option value="Inter">Inter</option><option value="Georgia">Georgia</option><option value="Courier New">Courier</option><option value="Arial">Arial</option>
          </select>
          <Divider />
          {btn(editor.isActive('bold'), () => editor.chain().focus().toggleBold().run(), 'B', 'Bold')}
          {btn(editor.isActive('italic'), () => editor.chain().focus().toggleItalic().run(), 'I', 'Italic')}
          {btn(editor.isActive('underline'), () => editor.chain().focus().toggleUnderline().run(), 'U', 'Underline')}
          {btn(editor.isActive('strike'), () => editor.chain().focus().toggleStrike().run(), 'S', 'Strikethrough')}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowColor(!showColor)} style={{ padding: '5px 6px', borderRadius: '4px', border: 'none', fontSize: '11px', cursor: 'pointer', background: showColor ? 'rgba(168,85,247,0.15)' : 'transparent', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>🎨</button>
            {showColor && (
              <div style={{ position: 'absolute', top: '100%', left: 0, background: 'var(--bg)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '4px', zIndex: 100, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                {['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#ffffff', '#94a3b8', '#64748b', '#000000'].map(c => (
                  <button key={c} onClick={() => { editor.chain().focus().setColor(c).run(); setShowColor(false) }}
                    style={{ width: '20px', height: '20px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: c, cursor: 'pointer' }} />
                ))}
              </div>
            )}
          </div>
          <Divider />
          {btn(editor.isActive({ textAlign: 'left' }), () => editor.chain().focus().setTextAlign('left').run(), '⫷', 'Left')}
          {btn(editor.isActive({ textAlign: 'center' }), () => editor.chain().focus().setTextAlign('center').run(), '☰', 'Center')}
          {btn(editor.isActive({ textAlign: 'right' }), () => editor.chain().focus().setTextAlign('right').run(), '⫸', 'Right')}
          {btn(editor.isActive({ textAlign: 'justify' }), () => editor.chain().focus().setTextAlign('justify').run(), '☰', 'Justify')}
          <Divider />
          {btn(editor.isActive('bulletList'), () => editor.chain().focus().toggleBulletList().run(), '•', 'Bullet List')}
          {btn(editor.isActive('orderedList'), () => editor.chain().focus().toggleOrderedList().run(), '1.', 'Numbered List')}
          {btn(editor.isActive('blockquote'), () => editor.chain().focus().toggleBlockquote().run(), '""', 'Quote')}
          <Divider />
          {btn(false, () => editor.chain().focus().undo().run(), '↩', 'Undo')}
          {btn(false, () => editor.chain().focus().redo().run(), '↪', 'Redo')}
        </div>
        <div style={{ display: 'flex', gap: '4px', padding: '4px 10px', borderTop: '1px solid var(--glass-border)', alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => setShowInsert(!showInsert)} style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: showInsert ? 'rgba(34,197,94,0.15)' : 'transparent', color: showInsert ? '#22c55e' : 'var(--text-muted)', fontSize: '10px', fontWeight: '600', cursor: 'pointer', fontFamily: "var(--font-code)" }}>+ Insert</button>
          {showInsert && (
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {[['🖼 Image', 'image'], ['📹 Video', 'youtube'], ['🃏 Card', 'card'], ['2️⃣ 2Col', 'columns2'], ['3️⃣ 3Col', 'columns3'], ['💡 Callout', 'callout'], ['📏 Spacer', 'spacer'], ['— Line', 'hr'], ['📊 Table', 'table'], ['</> Code', 'codeblock']].map(([label, type]) => (
                <button key={type} onClick={() => insertBlock(type)} style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '10px', cursor: 'pointer', fontFamily: "var(--font-code)" }}>{label}</button>
              ))}
            </div>
          )}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
            <button onClick={() => setLinkModal(true)} style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-muted)', fontSize: '10px', cursor: 'pointer', fontFamily: "var(--font-code)" }}>🔗 Link</button>
            <button onClick={() => setMediaModal({ open: true, type: 'image' })} style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-muted)', fontSize: '10px', cursor: 'pointer', fontFamily: "var(--font-code)" }}>🖼 Image</button>
          </div>
        </div>
      </div>
    </>
  )
}

export function BlogEditor({ initialContent = {}, onSave, saving }) {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [coverModal, setCoverModal] = useState(false)
  const coverFileRef = useRef(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4] } }),
      Image.configure({ inline: false, allowBase64: true }),
      Placeholder.configure({ placeholder: 'Start writing your story...' }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline, Highlight,
      Link.configure({ openOnClick: false }),
      Youtube, Blockquote, TextStyle, Color, FontFamily,
      Dropcursor.configure({ color: '#22c55e', width: 2 }),
      Gapcursor,
      CardBlock, ColumnsBlock, ResizableImage, Callout, Spacer
    ],
    content: initialContent.content || '',
    editorProps: { attributes: { style: 'min-height: 600px; padding: 32px; outline: none; font-size: 16px; line-height: 1.8;' } }
  })

  useEffect(() => {
    if (editor && initialContent.id) {
      setTitle(initialContent.title || '')
      setExcerpt(initialContent.excerpt || '')
      setCoverImage(initialContent.cover_image || '')
      setCategory(initialContent.category || '')
      setTags((initialContent.tags || []).join(', '))
      if (initialContent.content) editor.commands.setContent(initialContent.content)
    }
  }, [initialContent.id, initialContent.title, initialContent.excerpt, initialContent.cover_image, initialContent.tags, initialContent.content, initialContent.category, editor])

  const handleCoverUpload = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setCoverImage(reader.result)
    reader.readAsDataURL(file)
  }

  const handleSave = useCallback((published) => {
    if (!title.trim()) { alert('Title is required'); return }
    onSave({
      title: title.trim(),
      content: editor.getJSON(),
      excerpt: excerpt.trim(),
      cover_image: coverImage.trim(),
      category: category.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      published
    })
    setLastSaved(new Date())
  }, [title, editor, excerpt, coverImage, category, tags, onSave])

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <MediaModal open={coverModal} onClose={() => setCoverModal(false)} onInsert={(data) => { setCoverImage(data.src); setCoverModal(false) }} type="image" />
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Blog title..."
        style={{ width: '100%', padding: '16px 0', border: 'none', background: 'transparent', color: 'var(--text)', fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: '700', outline: 'none', fontFamily: 'var(--font-h)', marginBottom: '16px' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
        <div style={{ position: 'relative' }}>
          <input type="text" value={coverImage} onChange={e => setCoverImage(e.target.value)} placeholder="Cover image URL..."
            style={{ width: '100%', padding: '10px 40px 10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '12px', outline: 'none', fontFamily: "var(--font-code)", boxSizing: 'border-box' }} />
          <button onClick={() => setCoverModal(true)} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', padding: '4px', borderRadius: '4px', border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '14px' }} title="Upload cover">📁</button>
        </div>
        <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Category"
          style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '12px', outline: 'none', fontFamily: "var(--font-code)" }} />
      </div>
      <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (comma separated)"
        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '12px', outline: 'none', fontFamily: "var(--font-code)", marginBottom: '10px', boxSizing: 'border-box' }} />
      <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Excerpt / summary..." rows={2}
        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '12px', outline: 'none', resize: 'vertical', fontFamily: "var(--font-code)", marginBottom: '16px', boxSizing: 'border-box' }} />

      {coverImage && (
        <div style={{ marginBottom: '20px', borderRadius: '12px', overflow: 'hidden', maxHeight: '250px', position: 'relative' }}>
          <img src={coverImage} alt="Cover" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
          <button onClick={() => setCoverImage('')} style={{ position: 'absolute', top: '8px', right: '8px', padding: '4px 10px', borderRadius: '6px', border: 'none', background: 'rgba(239,68,68,0.8)', color: '#fff', cursor: 'pointer', fontSize: '11px' }}>✕ Remove</button>
        </div>
      )}

      <div className="liquid-glass" style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 12px', borderBottom: '1px solid var(--glass-border)' }}>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{editor?.getJSON()?.content?.length || 0} blocks</span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {lastSaved && <span style={{ fontSize: '9px', color: '#22c55e', fontFamily: "var(--font-code)" }}>Saved {lastSaved.toLocaleTimeString()}</span>}
            <button onClick={() => setShowPreview(!showPreview)} style={{ padding: '4px 10px', borderRadius: '4px', border: 'none', fontSize: '10px', cursor: 'pointer', background: showPreview ? 'rgba(34,197,94,0.15)' : 'transparent', color: showPreview ? '#22c55e' : 'var(--text-muted)', fontFamily: "var(--font-code)" }}>
              {showPreview ? 'Edit' : 'Preview'}
            </button>
          </div>
        </div>
        {showPreview ? (
          <div style={{ padding: '32px' }}>
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: editor?.getHTML() || '' }} />
          </div>
        ) : (
          <>
            <ToolBar editor={editor} />
            <EditorContent editor={editor} />
          </>
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingBottom: '60px', position: 'sticky', bottom: '20px' }}>
        <button onClick={() => handleSave(false)} disabled={saving} className="liquid-glass" style={{ padding: '12px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: '500', color: 'var(--text)', cursor: 'pointer', fontFamily: "var(--font-code)" }}>
          {saving ? 'Saving...' : 'Save Draft'}
        </button>
        <button onClick={() => handleSave(true)} disabled={saving} style={{ padding: '12px 28px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '600', color: '#fff', cursor: 'pointer', background: 'linear-gradient(135deg, #22c55e, #16a34a)', fontFamily: "var(--font-code)" }}>
          {saving ? 'Publishing...' : 'Publish →'}
        </button>
      </div>
    </div>
  )
}
