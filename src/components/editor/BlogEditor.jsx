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

function ToolbarButton({ active, onClick, label, title, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} title={title}
      style={{ padding: '5px 8px', borderRadius: '4px', border: 'none', fontSize: '11px', fontWeight: active ? '700' : '400', cursor: disabled ? 'not-allowed' : 'pointer', background: active ? 'rgba(34,197,94,0.15)' : 'transparent', color: active ? '#22c55e' : 'var(--text-muted)', fontFamily: "var(--font-code)", opacity: disabled ? 0.3 : 1, whiteSpace: 'nowrap', lineHeight: 1.2 }}>
      {label}
    </button>
  )
}

function Divider() { return <div style={{ width: '1px', background: 'var(--glass-border)', margin: '0 3px', alignSelf: 'stretch' }} /> }

const ToolBar = ({ editor }) => {
  const [showInsert, setShowInsert] = useState(false)
  const [showColor, setShowColor] = useState(false)
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
      case 'image': { const url = prompt('Image URL:'); if (url) editor.chain().focus().insertContent({ type: 'resizableImage', attrs: { src: url } }).run(); break }
      case 'youtube': { const yt = prompt('YouTube URL:'); if (yt) editor.commands.setYoutubeVideo({ src: yt }); break }
      case 'hr': editor.chain().focus().setHorizontalRule().run(); break
      case 'table': editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run(); break
      case 'codeblock': editor.chain().focus().toggleCodeBlock().run(); break
    }
    setShowInsert(false)
  }

  const btn = (active, onClick, label, title) => <ToolbarButton key={label} active={active} onClick={onClick} label={label} title={title} />

  return (
    <div ref={ref} style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg)', borderBottom: '1px solid var(--glass-border)' }}>
      {/* Row 1: Text formatting */}
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

      {/* Row 2: Insert blocks */}
      <div style={{ display: 'flex', gap: '4px', padding: '4px 10px', borderTop: '1px solid var(--glass-border)', alignItems: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => setShowInsert(!showInsert)} style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: showInsert ? 'rgba(34,197,94,0.15)' : 'transparent', color: showInsert ? '#22c55e' : 'var(--text-muted)', fontSize: '10px', fontWeight: '600', cursor: 'pointer', fontFamily: "var(--font-code)" }}>+ Insert</button>
        {showInsert && (
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {[
              ['🖼 Image', 'image'], ['📹 YouTube', 'youtube'], ['🃏 Card', 'card'],
              ['2️⃣ 2 Columns', 'columns2'], ['3️⃣ 3 Columns', 'columns3'],
              ['💡 Callout', 'callout'], ['📏 Spacer', 'spacer'], ['— Line', 'hr'],
              ['📊 Table', 'table'], ['</> Code Block', 'codeblock']
            ].map(([label, type]) => (
              <button key={type} onClick={() => insertBlock(type)} style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '10px', cursor: 'pointer', fontFamily: "var(--font-code)" }}>{label}</button>
            ))}
          </div>
        )}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
          <button onClick={() => { const url = prompt('Link URL:'); if (url) editor.chain().focus().setLink({ href: url }).run() }} style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-muted)', fontSize: '10px', cursor: 'pointer', fontFamily: "var(--font-code)" }}>🔗 Link</button>
          <button onClick={() => { const url = prompt('Image URL:'); if (url) editor.chain().focus().insertContent({ type: 'resizableImage', attrs: { src: url } }).run() }} style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-muted)', fontSize: '10px', cursor: 'pointer', fontFamily: "var(--font-code)" }}>🖼 Image</button>
        </div>
      </div>
    </div>
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
      <div style={{ marginBottom: '20px' }}>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Blog title..."
          style={{ width: '100%', padding: '16px 0', border: 'none', background: 'transparent', color: 'var(--text)', fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: '700', outline: 'none', fontFamily: 'var(--font-h)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        <input type="text" value={coverImage} onChange={e => setCoverImage(e.target.value)} placeholder="Cover image URL..."
          style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '12px', outline: 'none', fontFamily: "var(--font-code)" }} />
        <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Category"
          style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '12px', outline: 'none', fontFamily: "var(--font-code)" }} />
      </div>
      <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (comma separated)"
        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '12px', outline: 'none', fontFamily: "var(--font-code)", marginBottom: '12px' }} />
      <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Excerpt / summary..." rows={2}
        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '12px', outline: 'none', resize: 'vertical', fontFamily: "var(--font-code)", marginBottom: '16px' }} />

      {coverImage && (
        <div style={{ marginBottom: '20px', borderRadius: '12px', overflow: 'hidden', maxHeight: '250px' }}>
          <img src={coverImage} alt="Cover" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
        </div>
      )}

      <div className="liquid-glass" style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 12px', borderBottom: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{editor?.storage?.characterCount?.characters?.() || 0} chars</span>
            {lastSaved && <span style={{ fontSize: '9px', color: '#22c55e', fontFamily: "var(--font-code)" }}>Saved {lastSaved.toLocaleTimeString()}</span>}
          </div>
          <button onClick={() => setShowPreview(!showPreview)} style={{ padding: '4px 10px', borderRadius: '4px', border: 'none', fontSize: '10px', cursor: 'pointer', background: showPreview ? 'rgba(34,197,94,0.15)' : 'transparent', color: showPreview ? '#22c55e' : 'var(--text-muted)', fontFamily: "var(--font-code)" }}>
            {showPreview ? 'Edit' : 'Preview'}
          </button>
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
